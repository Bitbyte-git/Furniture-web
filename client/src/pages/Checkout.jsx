import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const defaultAddr = user?.addresses?.find((a) => a.isDefault);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: defaultAddr?.fullName || user?.name,
      phone: defaultAddr?.phone || user?.phone,
      street: defaultAddr?.street || '',
      landmark: defaultAddr?.landmark || '',
      city: defaultAddr?.city || '',
      state: defaultAddr?.state || '',
      pinCode: defaultAddr?.pinCode || '',
    },
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <p>Please login to checkout</p>
        <button type="button" onClick={() => navigate('/login')} className="btn-sage mt-4">LOGIN</button>
      </div>
    );
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post('/orders/checkout', {
        deliveryAddress: {
          fullName: data.fullName || user.name,
          phone: data.phone || user.phone,
          street: data.street,
          landmark: data.landmark,
          city: data.city,
          state: data.state,
          pinCode: data.pinCode,
        },
        paymentMode: data.paymentMode || 'UPI',
        orderNotes: data.orderNotes,
      });
      await fetchCart();
      toast.success(`Order ${res.order.orderId} placed!`);
      navigate(`/orders/${res.order.orderId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <h1 className="section-heading mb-8">Checkout</h1>
        <p className="mb-6 text-lg">Order Total: <strong>{formatPrice(cart.cartTotal)}</strong></p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('fullName', { required: true })} placeholder="Full Name" className="w-full border px-4 py-3" />
          <input {...register('phone', { required: true, pattern: /^\d{10}$/ })} placeholder="Phone (10 digits)" className="w-full border px-4 py-3" />
          <input {...register('street', { required: true })} placeholder="Street Address" className="w-full border px-4 py-3" />
          <input {...register('landmark')} placeholder="Landmark" className="w-full border px-4 py-3" />
          <div className="grid grid-cols-2 gap-4">
            <input {...register('city', { required: true })} placeholder="City" className="border px-4 py-3" />
            <input {...register('state', { required: true })} placeholder="State" className="border px-4 py-3" />
          </div>
          <input {...register('pinCode', { required: true, pattern: /^\d{6}$/ })} placeholder="Pin Code" className="w-full border px-4 py-3" />
          <select {...register('paymentMode')} className="w-full border px-4 py-3">
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
            <option value="COD">Cash on Delivery</option>
          </select>
          <textarea {...register('orderNotes')} placeholder="Order notes (optional)" className="w-full border px-4 py-3" rows={3} />
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
          </button>
        </form>
      </div>
    </div>
  );
}
