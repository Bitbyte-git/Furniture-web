import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
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
    <div className="flex min-h-[70vh] items-center justify-center bg-beige py-16">
      <div className="w-full max-w-md bg-white p-8 shadow-sm">
        <h1 className="text-center font-serif text-3xl">Login</h1>
        <p className="mt-2 text-center text-sm text-charcoal/60">Welcome back to NESTORA</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full border px-4 py-3" />
          <input {...register('password', { required: true })} type="password" placeholder="Password" className="w-full border px-4 py-3" />
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          No account? <Link to="/register" className="text-sage hover:underline">Register</Link>
        </p>
        <p className="mt-4 text-center text-xs text-charcoal/40">
          Demo: customer@nestora.com / Customer@123
        </p>
      </div>
    </div>
  );
}
