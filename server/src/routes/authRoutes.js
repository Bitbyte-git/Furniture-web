import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { generateId } from '../utils/generateId.js';

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });

const formatUser = (user) => ({
  _id: user._id,
  userId: user.userId,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  addresses: user.addresses,
  loyaltyPoints: user.loyaltyPoints,
  totalOrders: user.totalOrders,
  totalSpent: user.totalSpent,
});

router.post(
  '/register',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/),
    body('phone').matches(/^\d{10}$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, phone } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const userId = await generateId(User, 'FURN-USR', 'userId');
    const passwordHash = await User.hashPassword(password);
    const user = await User.create({
      userId,
      name,
      email,
      passwordHash,
      phone,
      role: 'Customer',
    });
    const token = signToken(user._id);
    res.status(201).json({ token, user: formatUser(user) });
  }
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    user.lastLogin = new Date();
    await user.save();
    res.json({ token: signToken(user._id), user: formatUser(user) });
  }
);

router.get('/me', protect, async (req, res) => {
  res.json({ user: formatUser(req.user) });
});

router.put('/profile', protect, async (req, res) => {
  const { name, phone, dateOfBirth, gender } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone, dateOfBirth, gender },
    { new: true }
  ).select('-passwordHash');
  res.json({ user: formatUser(user) });
});

router.post('/addresses', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const addressId = `ADDR-${String(user.addresses.length + 1).padStart(4, '0')}`;
  const address = { ...req.body, addressId };
  if (address.isDefault) {
    user.addresses.forEach((a) => { a.isDefault = false; });
  }
  user.addresses.push(address);
  await user.save();
  res.json({ addresses: user.addresses });
});

router.put('/addresses/:addressId', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const addr = user.addresses.id(req.params.addressId) ||
    user.addresses.find((a) => a.addressId === req.params.addressId);
  if (!addr) return res.status(404).json({ message: 'Address not found' });
  Object.assign(addr, req.body);
  if (req.body.isDefault) {
    user.addresses.forEach((a) => { a.isDefault = false; });
    addr.isDefault = true;
  }
  await user.save();
  res.json({ addresses: user.addresses });
});

export default router;
