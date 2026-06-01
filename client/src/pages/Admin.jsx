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

  useEffect(() => {
    if (user?.role === 'Admin') {
      api.get('/admin/dashboard').then((res) => setData(res.data));
      api.get('/orders').then((res) => setOrders(res.data.orders || []));
    }
  }, [user]);

  if (loading) return null;
  if (!user || user.role !== 'Admin') return <Navigate to="/login" />;

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      const { data: res } = await api.get('/orders');
      setOrders(res.orders);
      toast.success('Order updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order');
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
              <div key={s.label} className="bg-white p-6 shadow-sm">
                <p className="text-xs tracking-widest text-charcoal/50">{s.label}</p>
                <p className="mt-2 font-serif text-3xl">{s.value}</p>
              </div>
            ))}
          </div>
        )}

        <h2 className="mb-4 text-lg font-semibold tracking-widest">ORDER QUEUE</h2>
        <div className="overflow-x-auto bg-white shadow-sm">
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
                <tr key={o._id} className="border-b">
                  <td className="p-4">{o.orderId}</td>
                  <td className="p-4">{o.customerName}</td>
                  <td className="p-4">{formatPrice(o.grandTotal)}</td>
                  <td className="p-4">{o.status}</td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      className="border px-2 py-1 text-xs"
                    >
                      {['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.lowStock?.length > 0 && (
          <>
            <h2 className="mb-4 mt-12 text-lg font-semibold tracking-widest text-red-700">LOW STOCK ALERTS</h2>
            <ul className="space-y-2 bg-white p-6">
              {data.lowStock.map((p) => (
                <li key={p._id} className="text-sm">{p.name} — {p.stock} units (reorder at {p.minStockAlert})</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
