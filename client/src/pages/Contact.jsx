import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

const contactInfo = [
  {
    icon: <FiPhone size={22} />,
    label: 'Phone',
    value: '+91 98765 43210',
    sub: 'Mon–Sat, 9 AM – 6 PM IST',
  },
  {
    icon: <FiMail size={22} />,
    label: 'Email',
    value: 'hello@lhfurniture.in',
    sub: 'We reply within 24 hours',
  },
  {
    icon: <FiMapPin size={22} />,
    label: 'Showroom',
    value: 'Bandra West, Mumbai',
    sub: 'Maharashtra – 400 050',
  },
  {
    icon: <FiClock size={22} />,
    label: 'Store Hours',
    value: 'Mon–Sat: 10 AM – 8 PM',
    sub: 'Sunday: 11 AM – 6 PM',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Message sent! We will contact you soon.');
    reset();
  };

  return (
    <div className="bg-cream">
      {/* Hero */}
      <div className="relative h-[38vh] w-full overflow-hidden bg-charcoal flex items-center justify-center text-center px-4">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-sage font-semibold mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif font-semibold text-white"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-3 text-white/60 text-sm max-w-md mx-auto"
          >
            Have a question about a product, an order, or want to visit our showroom? We're here to help.
          </motion.p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white p-6 border border-beige-dark/50 hover:shadow-md transition-shadow group"
            >
              <div className="text-sage mb-4 group-hover:scale-110 transition-transform origin-left">
                {info.icon}
              </div>
              <p className="text-xs uppercase tracking-widest text-charcoal/40 font-semibold mb-1">
                {info.label}
              </p>
              <p className="font-medium text-charcoal text-sm">{info.value}</p>
              <p className="text-xs text-charcoal/50 mt-1">{info.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Form + Map Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-3xl font-semibold text-charcoal mb-2">
              Send Us a Message
            </h2>
            <p className="text-sm text-charcoal/60 mb-8">
              Fill out the form below and our team will get back to you within one business day.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Arjun Sharma"
                    className="w-full border border-beige-dark bg-cream/40 px-4 py-3 text-sm focus:border-sage focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    placeholder="+91 98765 43210"
                    className="w-full border border-beige-dark bg-cream/40 px-4 py-3 text-sm focus:border-sage focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-beige-dark bg-cream/40 px-4 py-3 text-sm focus:border-sage focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                  Subject
                </label>
                <select
                  {...register('subject')}
                  className="w-full border border-beige-dark bg-cream/40 px-4 py-3 text-sm focus:border-sage focus:outline-none transition-colors text-charcoal/70"
                >
                  <option>Product Enquiry</option>
                  <option>Order Support</option>
                  <option>Warranty Claim</option>
                  <option>Showroom Visit</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  {...register('message', { required: true })}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full border border-beige-dark bg-cream/40 px-4 py-3 text-sm focus:border-sage focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-3 w-full justify-center bg-charcoal hover:bg-sage text-white text-xs font-semibold tracking-widest uppercase px-8 py-4 transition-colors duration-300"
              >
                <FiSend size={16} />
                SEND MESSAGE
              </button>
            </form>
          </motion.div>

          {/* Map / Showroom */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="overflow-hidden h-72 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80"
                alt="Our Showroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white p-8 border border-beige-dark/50">
              <h3 className="font-serif text-xl font-semibold mb-4">Visit Our Showroom</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                Experience our furniture in person at our flagship showroom in Bandra West, Mumbai.
                Our design consultants are available to help you find the perfect pieces for your home.
              </p>
              <ul className="space-y-2 text-sm text-charcoal/60">
                <li className="flex items-center gap-2"><FiMapPin className="text-sage flex-shrink-0" /> Shop No. 12, Linking Road, Bandra West, Mumbai – 400 050</li>
                <li className="flex items-center gap-2"><FiClock className="text-sage flex-shrink-0" /> Mon–Sat: 10 AM – 8 PM · Sunday: 11 AM – 6 PM</li>
                <li className="flex items-center gap-2"><FiPhone className="text-sage flex-shrink-0" /> +91 98765 43210</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
