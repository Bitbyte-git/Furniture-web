import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatPrice';

export default function Account() {
  const { user, loading, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) api.get('/orders/my-orders').then((res) => setOrders(res.data.orders || []));
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <h1 className="section-heading">My Account</h1>
        <div className="mt-6 bg-white p-6 shadow-sm">
          <p><strong>{user.name}</strong></p>
          <p className="text-sm text-charcoal/60">{user.email} | {user.phone}</p>
          <p className="mt-2 text-sm">Loyalty Points: {user.loyaltyPoints || 0}</p>
          <button type="button" onClick={logout} className="mt-4 text-sm text-red-600 hover:underline">Logout</button>
        </div>

        <h2 className="mt-10 mb-4 text-lg font-semibold tracking-widest">ORDER HISTORY</h2>
        {orders.length === 0 ? (
          <p className="text-charcoal/50">No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((o) => (
              <li key={o._id} className="flex items-center justify-between bg-white p-4 shadow-sm">
                <div>
                  <p className="font-medium">{o.orderId}</p>
                  <p className="text-sm text-charcoal/60">{o.status} — {formatPrice(o.grandTotal)}</p>
                </div>
                <Link to={`/orders/${o.orderId}`} className="text-xs tracking-widest text-sage hover:underline">
                  TRACK →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
