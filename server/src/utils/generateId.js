export const generateId = async (Model, prefix, field = 'productId') => {
  const count = await Model.countDocuments();
  const num = String(count + 1).padStart(4, '0');
  return `${prefix}-${num}`;
};

export const generateOrderId = async () => {
  const year = new Date().getFullYear();
  const Order = (await import('../models/Order.js')).default;
  const count = await Order.countDocuments();
  return `FURN-ORD-${year}-${String(count + 1).padStart(4, '0')}`;
};

export const generateInvoiceId = async () => {
  const year = new Date().getFullYear();
  const Invoice = (await import('../models/Invoice.js')).default;
  const count = await Invoice.countDocuments();
  return `FURN-INV-${year}-${String(count + 1).padStart(4, '0')}`;
};

export const generateShipmentId = async () => {
  const year = new Date().getFullYear();
  const Shipment = (await import('../models/Shipment.js')).default;
  const count = await Shipment.countDocuments();
  return `FURN-SHP-${year}-${String(count + 1).padStart(4, '0')}`;
};
