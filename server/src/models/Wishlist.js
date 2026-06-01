import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    wishlistId: { type: String, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: String,
    productPrice: Number,
    inStock: { type: Boolean, default: true },
    sharedLink: String,
  },
  { timestamps: true }
);

wishlistSchema.index({ customerId: 1, productId: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);
