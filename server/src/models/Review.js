import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: String,
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
