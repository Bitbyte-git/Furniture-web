import mongoose from 'mongoose';

const invoiceLineSchema = new mongoose.Schema({
  itemNo: Number,
  hsnCode: String,
  description: String,
  quantity: Number,
  unit: { type: String, default: 'Nos' },
  rate: Number,
  amount: Number,
  discount: Number,
  taxableAmount: Number,
  gstType: String,
  cgstRate: Number,
  cgstAmount: Number,
  sgstRate: Number,
  sgstAmount: Number,
  igstRate: Number,
  igstAmount: Number,
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: { type: String, unique: true, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: String,
    billingAddress: String,
    placeOfSupply: String,
    lineItems: [invoiceLineSchema],
    subTotal: Number,
    totalDiscount: Number,
    deliveryCharge: Number,
    totalGST: Number,
    roundOff: Number,
    grandTotal: Number,
    amountInWords: String,
    paymentStatus: { type: String, default: 'Unpaid' },
    paymentMode: String,
    transactionId: String,
    paymentDate: Date,
    amountPaid: Number,
    balanceDue: Number,
    pdfUrl: String,
    sentToCustomer: { type: Boolean, default: false },
    dueDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Invoice', invoiceSchema);
