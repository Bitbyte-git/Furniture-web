import express from 'express';
import Banner from '../models/Banner.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const banners = await Banner.find({ status: 'Active' }).sort({ order: 1 });
  res.json({ banners });
});

export default router;
