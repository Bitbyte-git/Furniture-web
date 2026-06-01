import express from 'express';
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  const items = await Wishlist.find({ customerId: req.user._id }).populate('productId');
  res.json({ wishlist: items });
});

router.post('/:productId', async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const existing = await Wishlist.findOne({
    customerId: req.user._id,
    productId: product._id,
  });
  if (existing) return res.status(400).json({ message: 'Already in wishlist' });

  const count = await Wishlist.countDocuments();
  const item = await Wishlist.create({
    wishlistId: `FURN-WL-${String(count + 1).padStart(4, '0')}`,
    customerId: req.user._id,
    productId: product._id,
    productName: product.name,
    productPrice: product.sellingPrice,
    inStock: product.stock > 0,
  });
  res.status(201).json({ item });
});

router.delete('/:productId', async (req, res) => {
  await Wishlist.findOneAndDelete({
    customerId: req.user._id,
    productId: req.params.productId,
  });
  res.json({ message: 'Removed from wishlist' });
});

export default router;
