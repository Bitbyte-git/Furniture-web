import User from './models/User.js';
import Product from './models/Product.js';
import Banner from './models/Banner.js';

const IMG = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export async function seedIfEmpty() {
  if (await Product.countDocuments() > 0) return;

  const products = [
    { productId: 'FURN-PRD-0001', name: 'Luna Lounge Chair', sku: 'FURN-SKU-0001', description: 'Elegant lounge chair with curved arms and premium fabric upholstery.', category: 'Living Room', material: ['Fabric', 'Metal'], colours: ['Sage'], dimensions: { length: 75, width: 80, height: 85, weight: 12 }, mrp: 64999, sellingPrice: 45499, gstRate: 18, stock: 25, featured: true, mainImage: IMG('1586024893658-f030cf97637d'), images: [IMG('1586024893658-f030cf97637d')] },
    { productId: 'FURN-PRD-0002', name: 'Hazel 2-Seater Sofa', sku: 'FURN-SKU-0002', description: 'Minimalist two-seater sofa in soft neutral tones.', category: 'Living Room', material: ['Fabric', 'Teak'], colours: ['Beige'], dimensions: { length: 180, width: 90, height: 82, weight: 45 }, mrp: 89999, sellingPrice: 71999, gstRate: 18, stock: 15, featured: true, mainImage: IMG('1555041469-a586c61ea9bc'), images: [IMG('1555041469-a586c61ea9bc')] },
    { productId: 'FURN-PRD-0003', name: 'Orion Coffee Table', sku: 'FURN-SKU-0003', description: 'Round solid wood coffee table with natural grain finish.', category: 'Living Room', material: ['Teak'], colours: ['Natural'], dimensions: { length: 90, width: 90, height: 42, weight: 18 }, mrp: 24999, sellingPrice: 19999, gstRate: 18, stock: 40, featured: true, mainImage: IMG('1532373289002-bd7d28c41241'), images: [IMG('1532373289002-bd7d28c41241')] },
    { productId: 'FURN-PRD-0004', name: 'Calm Sideboard', sku: 'FURN-SKU-0004', description: 'Mid-century sideboard with ample storage.', category: 'Storage', material: ['Sheesham'], colours: ['Walnut'], dimensions: { length: 160, width: 45, height: 80, weight: 55 }, mrp: 54999, sellingPrice: 43999, gstRate: 18, stock: 12, featured: true, mainImage: IMG('1616486338812-3dadae4b4ace'), images: [IMG('1616486338812-3dadae4b4ace')] },
    { productId: 'FURN-PRD-0005', name: 'Nova Bed Frame', sku: 'FURN-SKU-0005', description: 'Platform bed frame in warm oak.', category: 'Bedroom', material: ['Teak'], colours: ['Natural'], dimensions: { length: 210, width: 165, height: 110, weight: 65 }, mrp: 79999, sellingPrice: 63999, gstRate: 18, stock: 8, featured: true, newArrival: true, mainImage: IMG('1505693416388-ac5ce068b846'), images: [IMG('1505693416388-ac5ce068b846')] },
    { productId: 'FURN-PRD-0006', name: 'Meadow Dining Set', sku: 'FURN-SKU-0006', description: 'Six-seater dining table with matching chairs.', category: 'Dining', material: ['Teak'], colours: ['Natural'], dimensions: { length: 200, width: 100, height: 76, weight: 80 }, mrp: 129999, sellingPrice: 104999, gstRate: 18, stock: 6, mainImage: IMG('1617806118013-18d1e4d2f9a0'), images: [IMG('1617806118013-18d1e4d2f9a0')] },
    { productId: 'FURN-PRD-0007', name: 'Zen Floor Lamp', sku: 'FURN-SKU-0007', description: 'Minimal floor lamp with linen shade.', category: 'Decor', material: ['Metal'], colours: ['Black'], dimensions: { length: 40, width: 40, height: 165, weight: 5 }, mrp: 8999, sellingPrice: 6999, gstRate: 18, stock: 50, mainImage: IMG('1507473889642-ef7f1f7e1b3f'), images: [IMG('1507473889642-ef7f1f7e1b3f')] },
    { productId: 'FURN-PRD-0008', name: 'Woven Lounge Chair', sku: 'FURN-SKU-0008', description: 'Handwoven rattan lounge chair.', category: 'Outdoor', material: ['Fabric'], colours: ['Natural'], dimensions: { length: 70, width: 75, height: 90, weight: 8 }, mrp: 18999, sellingPrice: 14999, gstRate: 18, stock: 20, featured: true, newArrival: true, mainImage: IMG('1567538096620-19d2a1b3ca5e'), images: [IMG('1567538096620-19d2a1b3ca5e')] },
  ];

  const adminHash = await User.hashPassword('Admin@123');
  const customerHash = await User.hashPassword('Customer@123');

  await User.create([
    { userId: 'FURN-USR-0001', name: 'Admin User', email: 'admin@nestora.com', passwordHash: adminHash, role: 'Admin', phone: '9876543210' },
    { userId: 'FURN-USR-0002', name: 'Demo Customer', email: 'customer@nestora.com', passwordHash: customerHash, role: 'Customer', phone: '9876543211', addresses: [{ addressId: 'ADDR-0001', addressType: 'Home', fullName: 'Demo Customer', phone: '9876543211', street: '42 Green Park Society', city: 'Mumbai', state: 'Maharashtra', pinCode: '400001', isDefault: true }] },
  ]);

  await Product.insertMany(products.map((p) => ({ ...p, status: 'Active', createdBy: 'Admin', minStockAlert: 5 })));

  await Banner.insertMany([
    { bannerId: 'BNR-001', image: IMG('1618220179428-9af46b1a213d', 1920), title: 'Design that Inspires. Comfort that Lasts.', subtitle: 'Thoughtfully crafted furniture for beautiful spaces and everyday living.', ctaText: 'EXPLORE COLLECTION', ctaLink: '/shop', order: 1 },
    { bannerId: 'BNR-002', image: IMG('1616486338812-3dadae4b4ace', 1920), title: 'Naturally Beautiful. Uniquely Yours.', subtitle: 'Inspired by nature. Designed for living.', ctaText: 'DISCOVER NOW', ctaLink: '/shop', order: 2 },
    { bannerId: 'BNR-003', image: IMG('1567538096620-19d2a1b3ca5e', 1920), title: 'New Collection 2026', subtitle: 'Handcrafted pieces for modern homes.', ctaText: 'SHOP NOW', ctaLink: '/shop', order: 3 },
  ]);

  console.log('Auto-seeded database (demo users & products)');
}
