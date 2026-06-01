import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  itemNo: Number,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: String,
  sku: String,
  colour: String,
  material: String,
  quantity: Number,
  unitPrice: Number,
  amount: Number,
  discount: { type: Number, default: 0 },
  taxableAmount: Number,
  gstRate: Number,
  gstAmount: Number,
  lineTotal: Number,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    items: [orderItemSchema],
    deliveryAddress: {
      fullName: String,
      phone: String,
      street: String,
      landmark: String,
      city: String,
      state: String,
      pinCode: String,
    },
    orderType: { type: String, default: 'Online' },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Paid', 'Partially Paid', 'Refunded'],
      default: 'Unpaid',
    },
    paymentMode: String,
    transactionId: String,
    orderNotes: String,
    subTotal: Number,
    totalDiscount: { type: Number, default: 0 },
    deliveryCharge: Number,
    totalGST: Number,
    roundOff: { type: Number, default: 0 },
    grandTotal: Number,
    couponCode: String,
    couponDiscount: { type: Number, default: 0 },
    adminRemarks: String,
    cancellationReason: String,
    auditLog: [{
      action: String,
      actionBy: String,
      actionAt: { type: Date, default: Date.now },
    }],
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
