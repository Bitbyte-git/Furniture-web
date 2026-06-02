import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPackage } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function TrackOrderForm() {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error('Please enter a valid Order ID');
      return;
    }
    navigate(`/orders/${orderId.trim()}`);
  };

  return (
    <div className="bg-cream py-16 min-h-[70vh] flex items-center">
      <div className="mx-auto max-w-xl w-full px-4 md:px-8">
        <div className="bg-white p-10 border border-beige-dark/50 text-center shadow-sm">
          <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-6">
            <FiPackage className="text-sage" size={32} />
          </div>
          
          <h1 className="font-serif text-3xl font-semibold mb-4 text-charcoal">Track Your Order</h1>
          <p className="text-sm text-charcoal/60 mb-8 max-w-md mx-auto">
            Enter the Order ID provided in your confirmation email or SMS to check the live status of your shipment.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-sm mx-auto">
            <input
              type="text"
              placeholder="e.g. ORD-12345678"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full border border-beige-dark bg-cream/30 px-5 py-4 text-sm focus:border-sage outline-none pl-12"
              required
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={20} />
            
            <button
              type="submit"
              className="w-full mt-6 bg-charcoal hover:bg-sage text-white px-6 py-4 font-semibold tracking-widest text-sm uppercase transition-colors"
            >
              TRACK NOW
            </button>
          </form>

          <p className="mt-8 text-xs text-charcoal/50">
            Can't find your Order ID? <a href="/contact" className="text-sage underline hover:text-charcoal">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
