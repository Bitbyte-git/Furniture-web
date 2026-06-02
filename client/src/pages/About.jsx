import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiPackage, FiUsers } from 'react-icons/fi';
import AboutSection from '../components/AboutSection';
import { Link } from 'react-router-dom';

const stats = [
  { icon: <FiAward size={28} />, value: '10+', label: 'Years of Craftsmanship' },
  { icon: <FiPackage size={28} />, value: '500+', label: 'Furniture Pieces' },
  { icon: <FiUsers size={28} />, value: '25,000+', label: 'Happy Homes' },
  { icon: <FiHeart size={28} />, value: '15,000+', label: 'Pin Codes Served' },
];

const values = [
  {
    title: 'Sustainably Sourced',
    desc: 'We partner with certified mills and forests across India to ensure every plank of wood is responsibly harvested.',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  },
  {
    title: 'Master Craftsmanship',
    desc: 'Our furniture is handcrafted by artisans with decades of experience, blending traditional joinery with modern design.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    title: 'Designed for India',
    desc: 'Every piece is engineered for Indian climate conditions — humidity-resistant finishes, solid core joints, and timeless aesthetics.',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
  },
];

const team = [
  { name: 'Arjun Sharma', role: 'Founder & Head of Design', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Priya Nair', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Rahul Verma', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6 } }),
};

export default function About() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <div className="relative h-[50vh] w-full overflow-hidden bg-charcoal flex items-center justify-center text-center px-4">
        <img
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80"
          alt="About LH Furniture"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-sage font-semibold mb-4">
            Our Story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl md:text-7xl font-serif font-semibold text-white leading-tight">
            About LH Furniture
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Crafting beautiful homes across India since 2014 — one thoughtful piece at a time.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-beige-dark/50">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex justify-center text-sage mb-3">{s.icon}</div>
              <p className="font-serif text-3xl font-bold text-charcoal">{s.value}</p>
              <p className="text-xs tracking-widest uppercase text-charcoal/50 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="text-xs tracking-[0.4em] uppercase text-sage font-semibold">Our Mission</span>
          <h2 className="font-serif text-4xl font-semibold text-charcoal mt-4 mb-6 leading-snug">
            Furniture that feels like home — from day one.
          </h2>
          <p className="text-charcoal/70 text-sm leading-relaxed mb-4">
            At LH Furniture, we believe your home should be a reflection of who you are. Each piece we design is thoughtfully crafted to blend seamlessly with the warmth and vibrancy of Indian living spaces — from compact Mumbai apartments to sprawling Bengaluru villas.
          </p>
          <p className="text-charcoal/70 text-sm leading-relaxed">
            We source sustainably, build durably, and design for real Indian life. Our furniture doesn't just look beautiful — it works harder and lasts longer.
          </p>
          <Link to="/shop" className="inline-block mt-8 bg-charcoal text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-sage transition-colors">
            Explore Collections
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80"
            alt="LH Furniture Craftsmanship"
            className="w-full h-[420px] object-cover"
          />
        </motion.div>
      </div>

      {/* Values */}
      <div className="bg-beige py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.4em] uppercase text-sage font-semibold">Why Choose Us</span>
            <h2 className="font-serif text-4xl font-semibold text-charcoal mt-4">Our Commitments</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-white overflow-hidden group">
                <div className="overflow-hidden h-52">
                  <img src={v.img} alt={v.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20 mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.4em] uppercase text-sage font-semibold">The People Behind</span>
          <h2 className="font-serif text-4xl font-semibold text-charcoal mt-4">Meet Our Team</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {team.map((t, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center group">
              <div className="w-36 h-36 mx-auto mb-4 overflow-hidden rounded-full border-4 border-beige-dark">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="font-serif text-lg font-semibold">{t.name}</h3>
              <p className="text-xs text-charcoal/50 uppercase tracking-widest mt-1">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AboutSection />
    </div>
  );
}
