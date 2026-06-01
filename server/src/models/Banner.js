import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    bannerId: String,
    image: String,
    title: String,
    subtitle: String,
    ctaText: String,
    ctaLink: String,
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model('Banner', bannerSchema);
