import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await login(data.email, data.password);
      toast.success(`Welcome back, ${user.name}!`);
      navigate(user.role === 'Admin' ? '/admin' : '/');
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] grid md:grid-cols-2">
      {/* Left – Decorative Panel */}
      <div className="hidden md:flex relative overflow-hidden bg-charcoal flex-col items-center justify-center p-12 text-white">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80"
          alt="LH Furniture"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 text-center">
          <h2 className="font-serif text-4xl font-semibold leading-tight mb-4">
            Welcome Back to<br />LH Furniture
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
            Sign in to track your orders, manage your wishlist, and access exclusive member offers.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-center">
            {[['500+', 'Products'], ['25k+', 'Happy Homes'], ['1-Year', 'Warranty'], ['Free', 'Assembly']].map(([val, lbl]) => (
              <div key={lbl} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                <p className="text-lg font-bold">{val}</p>
                <p className="text-xs text-white/50 mt-0.5">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form */}
      <div className="flex items-center justify-center bg-cream px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="text-xs tracking-[0.3em] uppercase text-sage font-semibold mb-8 block">
            ← LH Furniture
          </Link>

          <h1 className="font-serif text-4xl font-semibold text-charcoal mb-2">Sign In</h1>
          <p className="text-sm text-charcoal/50 mb-10">
            Don't have an account?{' '}
            <Link to="/register" className="text-sage font-semibold hover:underline">
              Create one free
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full border pl-11 pr-4 py-3.5 text-sm bg-white focus:outline-none focus:border-sage transition-colors ${errors.email ? 'border-red-400' : 'border-beige-dark'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
                <input
                  {...register('password', { required: true })}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full border pl-11 pr-4 py-3.5 text-sm bg-white focus:outline-none focus:border-sage transition-colors ${errors.password ? 'border-red-400' : 'border-beige-dark'}`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-charcoal hover:bg-sage text-white text-xs font-semibold tracking-widest uppercase py-4 transition-colors duration-300 disabled:opacity-60"
            >
              {loading ? 'SIGNING IN...' : (<>SIGN IN <FiArrowRight size={14} /></>)}
            </button>
          </form>

          <div className="mt-8 p-4 bg-white border border-beige-dark/50 rounded-lg">
            <p className="text-xs text-charcoal/40 uppercase tracking-widest font-semibold mb-2">Demo Credentials</p>
            <p className="text-xs text-charcoal/60">customer@nestora.com / Customer@123</p>
            <p className="text-xs text-charcoal/60">admin@nestora.com / Admin@123</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
