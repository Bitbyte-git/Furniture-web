import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Message sent! We will contact you soon.');
    reset();
  };

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-xl px-4 md:px-8">
        <h1 className="section-heading mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 shadow-sm">
          <input {...register('name', { required: true })} placeholder="Name" className="w-full border px-4 py-3" />
          <input {...register('email', { required: true })} type="email" placeholder="Email" className="w-full border px-4 py-3" />
          <textarea {...register('message', { required: true })} placeholder="Message" rows={5} className="w-full border px-4 py-3" />
          <button type="submit" className="btn-sage w-full justify-center">SEND MESSAGE</button>
        </form>
        <div className="mt-8 text-sm text-charcoal/60">
          <p>Email: hello@nestora.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Mumbai, Maharashtra, India</p>
        </div>
      </div>
    </div>
  );
}
