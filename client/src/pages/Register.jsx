import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.[0]?.msg
        || 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-beige py-16">
      <div className="w-full max-w-md bg-white p-8 shadow-sm">
        <h1 className="text-center font-serif text-3xl">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <input {...register('name', { required: true })} placeholder="Full Name" className="w-full border px-4 py-3" />
          <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full border px-4 py-3" />
          <input {...register('phone', { required: true, pattern: /^\d{10}$/ })} placeholder="Phone (10 digits)" className="w-full border px-4 py-3" />
          <input {...register('password', { required: true, minLength: 8 })} type="password" placeholder="Password (min 8, 1 upper, 1 number, 1 special)" className="w-full border px-4 py-3" />
          <input {...register('confirmPassword', { required: true })} type="password" placeholder="Confirm Password" className="w-full border px-4 py-3" />
          <button type="submit" disabled={loading} className="btn-sage w-full justify-center">
            {loading ? 'CREATING...' : 'REGISTER'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Have an account? <Link to="/login" className="text-sage hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
