import express from 'express';
import Product from '../models/Product.js';
import { protect, authorize } from '../middleware/auth.js';
import { generateId } from '../utils/generateId.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { category, search, featured, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
  const filter = { status: { $in: ['Active', 'Out of Stock'] } };
  if (category) filter.category = category;
  if (featured === 'true') filter.featured = true;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }
  if (minPrice || maxPrice) {
    filter.sellingPrice = {};
    if (minPrice) filter.sellingPrice.$gte = Number(minPrice);
    if (maxPrice) filter.sellingPrice.$lte = Number(maxPrice);
  }
  let sortOpt = { createdAt: -1 };
  if (sort === 'price-asc') sortOpt = { sellingPrice: 1 };
  if (sort === 'price-desc') sortOpt = { sellingPrice: -1 };
  if (sort === 'name') sortOpt = { name: 1 };

  const skip = (Number(page) - 1) * Number(limit);
  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortOpt).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter),
  ]);
  res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

router.get('/categories', (_req, res) => {
  res.json({
    categories: [
      { name: 'Living Room', tagline: 'Discover comfort', slug: 'Living Room' },
      { name: 'Bedroom', tagline: 'Rest in style', slug: 'Bedroom' },
      { name: 'Dining', tagline: 'Gather together', slug: 'Dining' },
      { name: 'Storage', tagline: 'Organize beautifully', slug: 'Storage' },
      { name: 'Decor', tagline: 'Add the finishing touch', slug: 'Decor' },
      { name: 'Office', tagline: 'Work in comfort', slug: 'Office' },
      { name: 'Outdoor', tagline: 'Enjoy the outdoors', slug: 'Outdoor' },
    ],
  });
});

router.get('/featured', async (_req, res) => {
  const products = await Product.find({ featured: true, status: 'Active' }).limit(10);
  res.json({ products });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({
    $or: [{ _id: req.params.id }, { productId: req.params.id }, { sku: req.params.id }],
  });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.views += 1;
  await product.save();
  res.json({ product });
});

router.post('/', protect, authorize('Admin'), async (req, res) => {
  const productId = await generateId(Product, 'FURN-PRD', 'productId');
  const sku = `FURN-SKU-${String(await Product.countDocuments() + 1).padStart(4, '0')}`;
  const product = await Product.create({
    ...req.body,
    productId,
    sku,
    createdBy: req.user.name,
  });
  res.status(201).json({ product });
});

router.put('/:id', protect, authorize('Admin'), async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
});

router.delete('/:id', protect, authorize('Admin'), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

export default router;
