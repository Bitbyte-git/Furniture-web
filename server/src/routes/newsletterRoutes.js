import express from 'express';

const router = express.Router();
const subscribers = new Set();

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Valid email required' });
  }
  subscribers.add(email.toLowerCase());
  res.json({ message: 'Subscribed successfully! Welcome to NESTORA newsletter.' });
});

export default router;
