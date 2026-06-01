import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

const getCartQuery = (req) => {
  if (req.user) return { customerId: req.user._id };
  const sessionId = req.headers['x-session-id'] || req.body.sessionId;
  return { sessionId };
};

const recalcCart = async (cart) => {
  let total = 0;
  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      item.unitPrice = product.sellingPrice;
      item.lineTotal = item.quantity * product.sellingPrice;
      item.productName = product.name;
      item.sku = product.sku;
      total += item.lineTotal;
    }
  }
  cart.cartTotal = total - (cart.couponDiscount || 0);
  cart.updatedAt = new Date();
  await cart.save();
  return cart;
};

router.get('/', optionalAuth, async (req, res) => {
  const query = getCartQuery(req);
  if (!query.customerId && !query.sessionId) {
    return res.json({ cart: { items: [], cartTotal: 0 } });
  }
  let cart = await Cart.findOne(query).populate('items.productId');
  if (!cart) {
    return res.json({ cart: { items: [], cartTotal: 0 } });
  }
  res.json({ cart });
});

router.post('/add', optionalAuth, async (req, res) => {
  const { productId, quantity = 1, colour, material, sessionId } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

  const query = req.user
    ? { customerId: req.user._id }
    : { sessionId: sessionId || req.headers['x-session-id'] };

  if (!query.customerId && !query.sessionId) {
    return res.status(400).json({ message: 'Session ID required for guest cart' });
  }

  let cart = await Cart.findOne(query);
  if (!cart) {
    cart = await Cart.create({
      ...query,
      items: [],
      expiresAt: req.user
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  }

  const existing = cart.items.find((i) => i.productId.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      productName: product.name,
      sku: product.sku,
      colour,
      material,
      quantity,
      unitPrice: product.sellingPrice,
      lineTotal: product.sellingPrice * quantity,
    });
  }
  await recalcCart(cart);
  const populated = await Cart.findById(cart._id).populate('items.productId');
  res.json({ cart: populated });
});

router.put('/update', optionalAuth, async (req, res) => {
  const { productId, quantity } = req.body;
  const query = getCartQuery(req);
  const cart = await Cart.findOne(query);
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find((i) => i.productId.toString() === productId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });
  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
  } else {
    const product = await Product.findById(productId);
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });
    item.quantity = quantity;
  }
  await recalcCart(cart);
  const populated = await Cart.findById(cart._id).populate('items.productId');
  res.json({ cart: populated });
});

router.delete('/remove/:productId', optionalAuth, async (req, res) => {
  const query = getCartQuery(req);
  const cart = await Cart.findOne(query);
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  cart.items = cart.items.filter((i) => i.productId.toString() !== req.params.productId);
  await recalcCart(cart);
  const populated = await Cart.findById(cart._id).populate('items.productId');
  res.json({ cart: populated || { items: [], cartTotal: 0 } });
});

router.delete('/clear', optionalAuth, async (req, res) => {
  const query = getCartQuery(req);
  await Cart.findOneAndDelete(query);
  res.json({ message: 'Cart cleared' });
});

export default router;
