import { Link } from 'react-router-dom';
// Background image located in public folder, referenced directly in style
import { motion } from 'framer-motion';
import { FiHome, FiMoon, FiUsers, FiArchive, FiSun } from 'react-icons/fi';

const categories = [
  {
    name: 'Living Room',
    tagline: 'Discover comfort',
    slug: 'living-room',
    icon: FiHome,
    img: '/sofa.png',
    color: 'from-stone-800/80',
  },
  {
    name: 'Bedroom',
    tagline: 'Rest in style',
    slug: 'bedroom',
    icon: FiMoon,
    img: '/bed.png',
    color: 'from-slate-900/80',
  },
  {
    name: 'Dining Room',
    tagline: 'Gather together',
    slug: 'dining',
    icon: FiUsers,
    img: '/dinning.png',
    color: 'from-zinc-800/80',
  },
  {
    name: 'Storage',
    tagline: 'Organize beautifully',
    slug: 'storage',
    icon: FiArchive,
    img: '/storage.png',
    color: 'from-neutral-900/80',
  },
  {
    name: 'Decor',
    tagline: 'Finishing touches',
    slug: 'decor',
    icon: FiSun,
    img: '/decors.png',
    color: 'from-amber-900/70',
  },
];

export default function CategoryBar() {
  return (
    <section className="relative min-h-[340px] py-16 overflow-hidden" style={{backgroundImage: "url('/shop-backgr.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-sage font-semibold mb-2">Explore</p>
            <h2 className="font-serif text-3xl font-semibold text-white">Shop by Room</h2>
          </div>
          <Link to="/shop" className="text-xs text-white/50 hover:text-sage tracking-widest uppercase transition-colors">
            View All →
          </Link>
        </motion.div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  to={`/collections/${cat.slug}`}
                  className="group relative block h-64 overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm"
                >
                  {/* Image */}
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent`} />
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-black/30 backdrop-blur-sm rounded-b-xl">
                    <Icon className="text-white/80 mb-2" size={20} strokeWidth={1.5} />
                    <p className="text-white font-semibold text-sm tracking-wide">{cat.name}</p>
                    <p className="text-white/60 text-xs mt-0.5 group-hover:text-white/90 transition-colors">{cat.tagline}</p>
                  </div>
                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20 transition-all duration-500" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
