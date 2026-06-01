import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  addressId: { type: String, required: true },
  addressType: { type: String, enum: ['Home', 'Office', 'Other'], default: 'Home' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  landmark: String,
  city: { type: String, required: true },
  district: String,
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, required: true },
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['Customer', 'Admin', 'Delivery'], default: 'Customer' },
    phone: { type: String, required: true },
    profilePhoto: String,
    addresses: [addressSchema],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    loyaltyPoints: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    lastLogin: Date,
    dateOfBirth: Date,
    gender: String,
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.statics.hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

export default mongoose.model('User', userSchema);
