/**
 * Integration smoke test for NESTORA API
 */
const BASE = 'http://localhost:5000/api';

async function request(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json', 'x-session-id': 'test-session-smoke' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

let passed = 0;
let failed = 0;

function ok(name, cond, detail = '') {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name}${detail ? `: ${detail}` : ''}`);
  }
}

async function run() {
  console.log('\nNESTORA API Smoke Test\n');

  const health = await request('GET', '/health');
  ok('Health', health.status === 200 && health.data.brand === 'NESTORA');

  const featured = await request('GET', '/products/featured');
  ok('Featured products', featured.status === 200 && featured.data.products?.length > 0);

  const categories = await request('GET', '/products/categories');
  ok('Categories', categories.status === 200 && categories.data.categories?.length >= 5);

  const login = await request('POST', '/auth/login', {
    email: 'customer@nestora.com',
    password: 'Customer@123',
  });
  ok('Customer login', login.status === 200 && login.data.token);
  const token = login.data.token;

  const adminLogin = await request('POST', '/auth/login', {
    email: 'admin@nestora.com',
    password: 'Admin@123',
  });
  ok('Admin login', adminLogin.status === 200 && adminLogin.data.user?.role === 'Admin');

  const productId = featured.data.products[0]._id;
  const addCart = await request('POST', '/cart/add', { productId, quantity: 1 }, token);
  ok('Add to cart', addCart.status === 200 && addCart.data.cart?.items?.length > 0);

  const getCart = await request('GET', '/cart', null, token);
  const populated = getCart.data.cart?.items?.[0]?.productId?.mainImage || getCart.data.cart?.items?.[0]?.productId?.name;
  ok('Cart populated', getCart.status === 200 && getCart.data.cart.items.length > 0);
  ok('Cart has product details', !!populated, JSON.stringify(getCart.data.cart.items[0]?.productId)?.slice(0, 80));

  const updateCart = await request('PUT', '/cart/update', { productId, quantity: 2 }, token);
  const updatePopulated = updateCart.data.cart?.items?.[0]?.productId?.mainImage;
  ok('Cart update', updateCart.status === 200 && updateCart.data.cart.items[0].quantity === 2);
  ok('Cart update populated', !!updatePopulated);

  const checkout = await request(
    'POST',
    '/orders/checkout',
    {
      deliveryAddress: {
        fullName: 'Demo Customer',
        phone: '9876543211',
        street: '42 Green Park',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001',
      },
      paymentMode: 'UPI',
    },
    token
  );
  ok('Checkout', checkout.status === 201 && checkout.data.order?.orderId);
  const orderId = checkout.data.order?.orderId;

  const track = await request('GET', `/orders/track/${orderId}`, null, token);
  ok('Order track', track.status === 200 && track.data.order?.orderId === orderId);

  const dash = await request('GET', '/admin/dashboard', null, adminLogin.data.token);
  ok('Admin dashboard', dash.status === 200 && dash.data.stats != null);

  const newsletter = await request('POST', '/newsletter/subscribe', { email: 'test@nestora.com' });
  ok('Newsletter', newsletter.status === 200);

  const banners = await request('GET', '/banners');
  ok('Banners', banners.status === 200 && banners.data.banners?.length > 0);

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((e) => {
  console.error('Test runner error:', e.message);
  process.exit(1);
});
