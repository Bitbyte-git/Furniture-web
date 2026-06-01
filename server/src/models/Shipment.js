import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: { type: String, unique: true, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    customerName: String,
    deliveryAddress: Object,
    pincode: String,
    deliveryZone: String,
    deliveryPartner: { type: String, default: 'Own Fleet' },
    trackingNumber: String,
    trackingUrl: String,
    estimatedDelivery: Date,
    actualDelivery: Date,
    deliverySlot: String,
    assemblyRequired: { type: Boolean, default: false },
    deliveryCharge: Number,
    deliveryStatus: {
      type: String,
      enum: ['Pending', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Failed', 'Returned'],
      default: 'Pending',
    },
    deliveryNotes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Shipment', shipmentSchema);
