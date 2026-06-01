import { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      toast.success('Welcome to NESTORA newsletter!');
      setEmail('');
    } catch {
      toast.error('Subscription failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-y border-charcoal/10 bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 md:flex-row md:justify-between md:px-8">
        <div className="flex items-start gap-4">
          <FiMail className="mt-1 text-2xl text-sage" />
          <div>
            <h3 className="font-medium">Join our newsletter</h3>
            <p className="text-sm text-charcoal/60">Get updated on new arrivals and exclusive offers.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 border border-charcoal/20 px-4 py-3 text-sm outline-none focus:border-sage"
          />
          <button type="submit" disabled={loading} className="btn-sage whitespace-nowrap px-6">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}
