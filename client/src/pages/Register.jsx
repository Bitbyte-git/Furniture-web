import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const perks = [
  'Exclusive member discounts & early access to sales',
  'Track orders and manage returns effortlessly',
  'Save your favourite pieces to a wishlist',
  'Free assembly on all orders over ₹15,000',
];

export default function Register() {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signup({ name: data.name, email: data.email, password: data.password, phone: data.phone });
      toast.success('Account created! Welcome to LH Furniture.');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full border pl-11 pr-4 py-3.5 text-sm bg-white focus:outline-none focus:border-sage transition-colors ${hasError ? 'border-red-400' : 'border-beige-dark'}`;

  return (
    <div className="min-h-[90vh] grid md:grid-cols-2">
      {/* Left – Decorative */}
      <div className="hidden md:flex relative overflow-hidden bg-charcoal flex-col items-center justify-center p-12 text-white">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80"
          alt="LH Furniture"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10">
          <h2 className="font-serif text-4xl font-semibold leading-tight mb-4">
            Join the LH<br />Furniture Family
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-10">
            Create a free account and unlock a world of beautiful furniture, exclusive deals, and personalised service.
          </p>
          <ul className="space-y-4">
            {perks.map((perk, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center">
                  <FiCheck size={11} className="text-sage" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
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

          <h1 className="font-serif text-4xl font-semibold text-charcoal mb-2">Create Account</h1>
          <p className="text-sm text-charcoal/50 mb-10">
            Already have an account?{' '}
            <Link to="/login" className="text-sage font-semibold hover:underline">Sign in</Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
                <input {...register('name', { required: true })} placeholder="Arjun Sharma"
                  className={inputClass(errors.name)} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
                <input {...register('email', { required: true })} type="email" placeholder="you@example.com"
                  className={inputClass(errors.email)} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">Mobile Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
                <input {...register('phone', { required: true, pattern: /^\d{10}$/ })} placeholder="10-digit mobile number"
                  className={inputClass(errors.phone)} />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">Please enter a valid 10-digit number</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
                <input {...register('password', { required: true, minLength: 8 })} type="password" placeholder="Min 8 chars, 1 uppercase, 1 number"
                  className={inputClass(errors.password)} />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">Password must be at least 8 characters</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
                <input {...register('confirmPassword', { required: true })} type="password" placeholder="Re-enter password"
                  className={inputClass(errors.confirmPassword)} />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-charcoal hover:bg-sage text-white text-xs font-semibold tracking-widest uppercase py-4 transition-colors duration-300 disabled:opacity-60">
              {loading ? 'CREATING ACCOUNT...' : (<>CREATE ACCOUNT <FiArrowRight size={14} /></>)}
            </button>

            <p className="text-center text-xs text-charcoal/40">
              By creating an account you agree to our{' '}
              <Link to="/terms" className="text-sage hover:underline">Terms & Conditions</Link> and{' '}
              <Link to="/privacy" className="text-sage hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
