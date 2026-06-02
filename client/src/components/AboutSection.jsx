import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiPackage, FiHeart, FiTruck } from 'react-icons/fi';

const stats = [
  { icon: FiAward, value: '12+', label: 'Years Crafting' },
  { icon: FiPackage, value: '850+', label: 'Unique Products' },
  { icon: FiHeart, value: '25K+', label: 'Happy Homes' },
  { icon: FiTruck, value: '15K+', label: 'Pin Codes Served' },
];

const highlights = [
  {
    img: '/all-fur.png',
    caption: 'Solid Wood Joinery',
  },
  {
    img: '/chairs.png',
    caption: 'Premium Upholstery',
  },
];

export default function AboutSection() {
  return (
    <section className="bg-cream overflow-hidden">
      {/* Top Strip – Stats */}
      <div className="bg-sage/10 border-y border-sage/20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <s.icon className="text-sage mb-2" size={22} strokeWidth={1.5} />
              <p className="font-serif text-3xl font-bold text-charcoal">{s.value}</p>
              <p className="text-xs text-charcoal/50 uppercase tracking-widest mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left – Stacked Images */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative z-10 overflow-hidden">
            <img
              src={highlights[0].img}
              alt={highlights[0].caption}
              className="w-full h-[460px] object-cover"
            />
          </div>
          {/* Floating second image */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="absolute -bottom-10 -right-6 w-56 h-44 overflow-hidden border-4 border-cream shadow-xl z-20 hidden md:block"
          >
            <img src={highlights[1].img} alt={highlights[1].caption} className="w-full h-full object-cover" />
          </motion.div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -top-5 -left-5 w-24 h-24 bg-sage rounded-full flex flex-col items-center justify-center text-white shadow-lg z-20 hidden md:flex"
          >
            <p className="text-2xl font-bold leading-none">12+</p>
            <p className="text-[10px] text-center leading-tight mt-1 px-2">Years of Craft</p>
          </motion.div>
        </motion.div>

        {/* Right – Copy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold tracking-[0.35em] text-sage uppercase mb-4">About LH Furniture</p>
          <h2 className="font-serif text-5xl font-semibold text-charcoal leading-tight mb-6">
            Simplicity is the Ultimate{' '}
            <em className="font-serif italic text-sage not-italic">Sophistication.</em>
          </h2>
          <p className="text-charcoal/65 leading-relaxed mb-4 text-base">
            At LH Furniture, we believe beautiful living starts with thoughtful design. Our collections blend timeless Indian craftsmanship with contemporary aesthetics — creating furniture that elevates your space while standing the test of everyday life.
          </p>
          <p className="text-charcoal/65 leading-relaxed mb-10 text-base">
            Every piece is responsibly sourced, rigorously quality-tested, and backed by our comprehensive 1-year warranty — because you deserve nothing less.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {['Solid Hardwood', 'Free Assembly', '1-Year Warranty', 'PAN India Delivery'].map((tag) => (
              <span key={tag} className="text-xs font-semibold uppercase tracking-wider bg-beige border border-beige-dark text-charcoal/70 px-4 py-2 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap">
            <Link to="/about" className="inline-block bg-charcoal hover:bg-sage text-white text-xs font-semibold tracking-widest uppercase px-8 py-4 transition-colors duration-300">
              OUR STORY
            </Link>
            <Link to="/shop" className="inline-block border border-charcoal text-charcoal hover:bg-charcoal hover:text-white text-xs font-semibold tracking-widest uppercase px-8 py-4 transition-colors duration-300">
              SHOP NOW
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
