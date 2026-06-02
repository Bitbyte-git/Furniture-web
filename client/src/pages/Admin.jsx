import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const { user, loading } = useAuth();
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [editingProduct, setEditingProduct] = useState(null); // null, 'new', or product object

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Living Room',
    mrp: '',
    sellingPrice: '',
    stock: '',
    minStockAlert: 5,
    mainImage: '',
    material: '',
    colours: '',
  });

  const fetchDashboardStats = () => {
    api.get('/admin/dashboard').then((res) => setData(res.data)).catch(() => {});
  };

  const fetchOrders = () => {
    api.get('/orders').then((res) => setOrders(res.data.orders || [])).catch(() => {});
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products?limit=100');
      setProducts(res.data.products || []);
    } catch {
      toast.error('Failed to load products');
    }
  };

  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchDashboardStats();
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'Admin' && activeTab === 'products') {
      fetchProducts();
    }
  }, [user, activeTab]);

  if (loading) return null;
  if (!user || user.role !== 'Admin') return <Navigate to="/login" />;

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      fetchOrders();
      toast.success('Order status updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order');
    }
  };

  const handleAddProductClick = () => {
    setEditingProduct('new');
    setFormData({
      name: '',
      description: '',
      category: 'Living Room',
      mrp: '',
      sellingPrice: '',
      stock: '',
      minStockAlert: 5,
      mainImage: '',
      material: '',
      colours: '',
    });
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || 'Living Room',
      mrp: product.mrp || '',
      sellingPrice: product.sellingPrice || '',
      stock: product.stock || 0,
      minStockAlert: product.minStockAlert || 5,
      mainImage: product.mainImage || '',
      material: product.material?.join(', ') || '',
      colours: product.colours?.join(', ') || '',
    });
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
        fetchDashboardStats();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      mrp: Number(formData.mrp),
      sellingPrice: Number(formData.sellingPrice),
      stock: Number(formData.stock),
      minStockAlert: Number(formData.minStockAlert),
      material: formData.material ? formData.material.split(',').map((s) => s.trim()) : [],
      colours: formData.colours ? formData.colours.split(',').map((s) => s.trim()) : [],
      images: formData.mainImage ? [formData.mainImage] : [],
    };

    try {
      if (editingProduct === 'new') {
        await api.post('/products', payload);
        toast.success('Product created successfully');
      } else {
        await api.put(`/products/${editingProduct._id}`, payload);
        toast.success('Product updated successfully');
      }
      setEditingProduct(null);
      fetchProducts();
      fetchDashboardStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h1 className="section-heading mb-10">Admin Dashboard</h1>

        {data && (
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: 'Total Orders', value: data.stats.totalOrders },
              { label: 'Products', value: data.stats.totalProducts },
              { label: 'Customers', value: data.stats.totalCustomers },
              { label: 'Revenue', value: formatPrice(data.stats.revenue) },
            ].map((s) => (
              <div key={s.label} className="bg-white p-6 shadow-sm border border-beige-dark/40">
                <p className="text-xs tracking-widest text-charcoal/50 uppercase">{s.label}</p>
                <p className="mt-2 font-serif text-3xl">{s.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8 border-b border-charcoal/10 flex gap-8">
          <button
            type="button"
            onClick={() => { setActiveTab('orders'); setEditingProduct(null); }}
            className={`pb-4 text-sm font-semibold tracking-widest uppercase transition-all ${
              activeTab === 'orders' ? 'border-b-2 border-sage text-sage' : 'text-charcoal/50 hover:text-charcoal'
            }`}
          >
            ORDER QUEUE
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('products'); setEditingProduct(null); }}
            className={`pb-4 text-sm font-semibold tracking-widest uppercase transition-all ${
              activeTab === 'products' ? 'border-b-2 border-sage text-sage' : 'text-charcoal/50 hover:text-charcoal'
            }`}
          >
            PRODUCT CATALOG
          </button>
        </div>

        {activeTab === 'orders' && (
          <>
            <h2 className="mb-4 text-sm font-bold tracking-widest uppercase text-charcoal/80">ORDER QUEUE</h2>
            <div className="overflow-x-auto bg-white shadow-sm border border-beige-dark/30">
              <table className="w-full text-sm">
                <thead className="border-b bg-beige">
                  <tr>
                    <th className="p-4 text-left">Order ID</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Total</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id} className="border-b hover:bg-cream/10">
                      <td className="p-4 font-mono font-semibold">{o.orderId}</td>
                      <td className="p-4">{o.customerName}</td>
                      <td className="p-4 font-medium">{formatPrice(o.grandTotal)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          o.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : o.status === 'Cancelled' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={o.status}
                          onChange={(e) => updateStatus(o._id, e.target.value)}
                          className="border px-2 py-1 text-xs bg-white border-beige-dark text-charcoal outline-none focus:border-sage"
                        >
                          {['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-charcoal/50">No orders in queue.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div>
            {editingProduct !== null ? (
              <div className="bg-white p-8 shadow-sm border border-beige-dark/30 max-w-2xl mx-auto">
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <h3 className="text-xl font-serif font-semibold text-charcoal">
                    {editingProduct === 'new' ? 'Add New Product' : `Edit Product`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="text-xs font-semibold tracking-widest text-charcoal/50 hover:text-charcoal uppercase transition-colors"
                  >
                    ← Back to Catalog
                  </button>
                </div>

                <form onSubmit={handleProductSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Product Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border border-beige-dark bg-white px-4 py-2.5 text-sm focus:border-sage outline-none"
                      >
                        {['Living Room', 'Bedroom', 'Dining', 'Office', 'Outdoor', 'Storage', 'Decor'].map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Selling Price *</label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={formData.sellingPrice}
                        onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                        className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">MRP *</label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={formData.mrp}
                        onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                        className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Stock *</label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Min Alert Stock *</label>
                      <input
                        type="number"
                        required
                        min={0}
                        value={formData.minStockAlert}
                        onChange={(e) => setFormData({ ...formData, minStockAlert: e.target.value })}
                        className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Main Image URL</label>
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          value={formData.mainImage}
                          onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                          className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                        />
                        <p className="text-[10px] text-charcoal/50 mt-1">Provide a working image URL, or leave blank to use the standard fallback.</p>
                      </div>
                      <div className="h-16 w-16 bg-beige border overflow-hidden flex items-center justify-center flex-shrink-0">
                        {formData.mainImage ? (
                          <img
                            src={formData.mainImage}
                            alt="Preview"
                            className="h-full w-full object-cover"
                            onError={(e) => { e.target.src = '/background-fur.png'; }}
                          />
                        ) : (
                          <span className="text-[9px] text-charcoal/40 uppercase">No Image</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Materials (comma separated)</label>
                      <input
                        type="text"
                        placeholder="Fabric, Wood, Metal"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-wider text-charcoal/60 mb-2 uppercase">Colours (comma separated)</label>
                      <input
                        type="text"
                        placeholder="Sage, Natural, Walnut"
                        value={formData.colours}
                        onChange={(e) => setFormData({ ...formData, colours: e.target.value })}
                        className="w-full border border-beige-dark bg-cream/30 px-4 py-2.5 text-sm focus:border-sage outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-6 py-2 border border-beige-dark text-xs font-semibold tracking-wider text-charcoal/60 uppercase hover:bg-beige transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-sage"
                    >
                      {editingProduct === 'new' ? 'CREATE PRODUCT' : 'SAVE CHANGES'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal/80">PRODUCT CATALOG ({products.length})</h2>
                  <button
                    type="button"
                    onClick={handleAddProductClick}
                    className="btn-sage !py-2 !px-6"
                  >
                    + ADD PRODUCT
                  </button>
                </div>

                <div className="overflow-x-auto bg-white shadow-sm border border-beige-dark/30">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-beige">
                      <tr>
                        <th className="p-4 text-left w-20">Image</th>
                        <th className="p-4 text-left">Product Details</th>
                        <th className="p-4 text-left">Category</th>
                        <th className="p-4 text-left">Price (Selling/MRP)</th>
                        <th className="p-4 text-left">Stock</th>
                        <th className="p-4 text-center w-36">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => {
                        const img = p.mainImage || p.images?.[0] || '/background-fur.png';
                        return (
                          <tr key={p._id} className="border-b hover:bg-cream/10">
                            <td className="p-4">
                              <div className="h-14 w-14 bg-beige border overflow-hidden">
                                <img
                                  src={img}
                                  alt={p.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => { e.target.src = '/background-fur.png'; }}
                                />
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="font-semibold text-charcoal">{p.name}</p>
                              <p className="text-xs text-charcoal/50">SKU: {p.sku} | ID: {p.productId}</p>
                            </td>
                            <td className="p-4">{p.category}</td>
                            <td className="p-4">
                              <span className="text-charcoal font-semibold">{formatPrice(p.sellingPrice)}</span>
                              {p.mrp > p.sellingPrice && (
                                <span className="text-xs text-charcoal/40 line-through block">{formatPrice(p.mrp)}</span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                                p.stock <= p.minStockAlert 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {p.stock} units
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex gap-4 justify-center">
                                <button
                                  type="button"
                                  onClick={() => handleEditProductClick(p)}
                                  className="text-xs text-sage font-bold uppercase hover:underline"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteProduct(p._id)}
                                  className="text-xs text-red-600 font-bold uppercase hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {products.length === 0 && (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-charcoal/50">No products found in catalog.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {data?.lowStock?.length > 0 && activeTab === 'orders' && (
          <>
            <h2 className="mb-4 mt-12 text-sm font-bold tracking-widest text-red-700 uppercase">LOW STOCK ALERTS</h2>
            <ul className="space-y-2 bg-white p-6 border border-red-200">
              {data.lowStock.map((p) => (
                <li key={p._id} className="text-sm font-medium text-charcoal/80">
                  {p.name} — <span className="text-red-700 font-bold">{p.stock} units remaining</span> (reorder alert at {p.minStockAlert})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
