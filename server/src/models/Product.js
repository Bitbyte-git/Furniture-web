import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true, required: true },
    name: { type: String, required: true, maxlength: 200 },
    sku: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor', 'Storage', 'Decor'],
      required: true,
    },
    subCategory: String,
    brand: String,
    material: [String],
    colours: [String],
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      weight: Number,
    },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    gstRate: { type: Number, default: 18 },
    stock: { type: Number, default: 0 },
    minStockAlert: { type: Number, default: 5 },
    leadTimeDays: Number,
    images: [String],
    mainImage: String,
    status: { type: String, enum: ['Active', 'Inactive', 'Out of Stock'], default: 'Active' },
    featured: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    seoTitle: String,
    seoDescription: String,
    createdBy: String,
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (this.mrp > 0) {
    this.discount = Math.round(((this.mrp - this.sellingPrice) / this.mrp) * 100);
  }
  if (this.stock <= 0) this.status = 'Out of Stock';
  next();
});

export default mongoose.model('Product', productSchema);
