import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Invoice from '../models/Invoice.js';
import Shipment from '../models/Shipment.js';
import { protect, authorize } from '../middleware/auth.js';
import { generateOrderId, generateInvoiceId, generateShipmentId } from '../utils/generateId.js';
import { calculateGST, calculateDeliveryCharge } from '../utils/gst.js';

const router = express.Router();

const buildOrderFromCart = async (cart, user, deliveryAddress, paymentMode) => {
  const companyState = process.env.COMPANY_STATE || 'Maharashtra';
  let subTotal = 0;
  let totalGST = 0;
  const items = [];

  for (let i = 0; i < cart.items.length; i++) {
    const cartItem = cart.items[i];
    const product = await Product.findById(cartItem.productId);
    if (!product || product.stock < cartItem.quantity) {
      throw new Error(`Insufficient stock for ${product?.name || 'product'}`);
    }
    const amount = cartItem.quantity * product.sellingPrice;
    const taxableAmount = amount;
    const gst = calculateGST(taxableAmount, product.gstRate, deliveryAddress.state, companyState);
    subTotal += amount;
    totalGST += gst.totalGST;
    items.push({
      itemNo: i + 1,
      productId: product._id,
      productName: product.name,
      sku: product.sku,
      colour: cartItem.colour,
      material: cartItem.material,
      quantity: cartItem.quantity,
      unitPrice: product.sellingPrice,
      amount,
      taxableAmount,
      gstRate: product.gstRate,
      gstAmount: gst.totalGST,
      lineTotal: taxableAmount + gst.totalGST,
    });
    product.stock -= cartItem.quantity;
    await product.save();
  }

  const deliveryCharge = calculateDeliveryCharge(
    deliveryAddress.pinCode,
    subTotal
  );
  const grandTotal = subTotal + totalGST + deliveryCharge;
  const roundOff = Math.round(grandTotal) - grandTotal;

  return {
    items,
    subTotal,
    totalGST,
    deliveryCharge,
    roundOff,
    grandTotal: Math.round(grandTotal),
    paymentMode,
  };
};

router.post('/checkout', protect, async (req, res) => {
  try {
    const { deliveryAddress, paymentMode = 'UPI', orderNotes } = req.body;
    const cart = await Cart.findOne({ customerId: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderData = await buildOrderFromCart(cart, req.user, deliveryAddress, paymentMode);
    const orderId = await generateOrderId();

    const order = await Order.create({
      orderId,
      customerId: req.user._id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      customerPhone: req.user.phone,
      deliveryAddress,
      orderNotes,
      ...orderData,
      status: paymentMode === 'COD' ? 'Pending' : 'Confirmed',
      paymentStatus: paymentMode === 'COD' ? 'Unpaid' : 'Paid',
      auditLog: [{ action: 'Placed', actionBy: req.user.name }],
    });

    const invoiceId = await generateInvoiceId();
    await Invoice.create({
      invoiceId,
      orderId: order._id,
      customerId: req.user._id,
      customerName: req.user.name,
      billingAddress: `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pinCode}`,
      placeOfSupply: deliveryAddress.state,
      subTotal: order.subTotal,
      totalGST: order.totalGST,
      deliveryCharge: order.deliveryCharge,
      grandTotal: order.grandTotal,
      balanceDue: paymentMode === 'COD' ? order.grandTotal : 0,
      paymentStatus: order.paymentStatus,
      paymentMode,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const shipmentId = await generateShipmentId();
    await Shipment.create({
      shipmentId,
      orderId: order._id,
      customerName: req.user.name,
      deliveryAddress,
      pincode: deliveryAddress.pinCode,
      deliveryZone: deliveryAddress.pinCode?.startsWith('40') ? 'Local' : 'Regional',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      deliveryCharge: order.deliveryCharge,
    });

    await Cart.findOneAndDelete({ customerId: req.user._id });
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalOrders: 1, totalSpent: order.grandTotal, loyaltyPoints: Math.floor(order.grandTotal / 100) },
    });

    res.status(201).json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/my-orders', protect, async (req, res) => {
  const orders = await Order.find({ customerId: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
});

router.get('/track/:orderId', protect, async (req, res) => {
  const order = await Order.findOne({
    orderId: req.params.orderId,
    customerId: req.user._id,
  });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  const shipment = await Shipment.findOne({ orderId: order._id });
  res.json({ order, shipment });
});

router.get('/', protect, authorize('Admin', 'Delivery'), async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 }).populate('customerId', 'name email');
  res.json({ orders });
});

router.put('/:id/status', protect, authorize('Admin'), async (req, res) => {
  const { status, adminRemarks, deliveryPartner, trackingNumber } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = status;
  if (adminRemarks) order.adminRemarks = adminRemarks;
  order.auditLog.push({ action: status, actionBy: req.user.name });

  if (status === 'Shipped' || status === 'Out for Delivery' || status === 'Delivered') {
    const shipment = await Shipment.findOne({ orderId: order._id });
    if (shipment) {
      shipment.deliveryStatus = status === 'Delivered' ? 'Delivered' : 'In Transit';
      if (deliveryPartner) shipment.deliveryPartner = deliveryPartner;
      if (trackingNumber) shipment.trackingNumber = trackingNumber;
      if (status === 'Delivered') shipment.actualDelivery = new Date();
      await shipment.save();
    }
  }
  await order.save();
  res.json({ order });
});

export default router;
