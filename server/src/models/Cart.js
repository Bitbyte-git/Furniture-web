import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: String,
  sku: String,
  colour: String,
  material: String,
  quantity: { type: Number, min: 1, default: 1 },
  unitPrice: Number,
  lineTotal: Number,
});

const cartSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: String,
    items: [cartItemSchema],
    couponCode: String,
    couponDiscount: { type: Number, default: 0 },
    cartTotal: { type: Number, default: 0 },
    expiresAt: Date,
  },
  { timestamps: true }
);

cartSchema.index({ customerId: 1 });
cartSchema.index({ sessionId: 1 });

export default mongoose.model('Cart', cartSchema);
