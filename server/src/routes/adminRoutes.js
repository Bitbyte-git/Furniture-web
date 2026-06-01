import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Invoice from '../models/Invoice.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
router.use(protect, authorize('Admin'));

router.get('/dashboard', async (_req, res) => {
  const [totalOrders, totalProducts, totalCustomers, revenue] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    User.countDocuments({ role: 'Customer' }),
    Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$grandTotal' } } },
    ]),
  ]);

  const lowStock = await Product.find({
    $expr: { $lte: ['$stock', '$minStockAlert'] },
    status: 'Active',
  }).limit(10);

  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

  res.json({
    stats: {
      totalOrders,
      totalProducts,
      totalCustomers,
      revenue: revenue[0]?.total || 0,
      yearsExperience: 12,
      uniqueProducts: totalProducts,
      happyCustomers: 25000,
    },
    lowStock,
    recentOrders,
  });
});

router.get('/reports/sales', async (req, res) => {
  const { from, to } = req.query;
  const match = { paymentStatus: { $in: ['Paid', 'Unpaid'] } };
  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = new Date(from);
    if (to) match.createdAt.$lte = new Date(to);
  }
  const orders = await Order.find(match).sort({ createdAt: -1 });
  res.json({ orders });
});

router.get('/inventory', async (_req, res) => {
  const products = await Product.find().select('productId name sku stock minStockAlert status category');
  res.json({ products });
});

router.put('/inventory/:id', async (req, res) => {
  const { stock, updateType, quantity, reason } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (updateType === 'Add') product.stock += quantity;
  else if (updateType === 'Remove') product.stock = Math.max(0, product.stock - quantity);
  else product.stock = stock;

  if (product.stock > 0 && product.status === 'Out of Stock') product.status = 'Active';
  await product.save();
  res.json({ product, reason, updatedBy: req.user.name });
});

export default router;
