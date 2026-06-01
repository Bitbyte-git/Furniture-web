import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiMoon, FiUsers, FiArchive, FiSun } from 'react-icons/fi';

const icons = {
  'Living Room': FiHome,
  Bedroom: FiMoon,
  Dining: FiUsers,
  Storage: FiArchive,
  Decor: FiSun,
  Office: FiArchive,
  Outdoor: FiSun,
};

const defaults = [
  { name: 'LIVING ROOM', slug: 'Living Room', tagline: 'Discover comfort' },
  { name: 'BEDROOM', slug: 'Bedroom', tagline: 'Rest in style' },
  { name: 'DINING ROOM', slug: 'Dining', tagline: 'Gather together' },
  { name: 'STORAGE', slug: 'Storage', tagline: 'Organize beautifully' },
  { name: 'DECOR', slug: 'Decor', tagline: 'Add the finishing touch' },
];

export default function CategoryBar({ categories }) {
  const items = categories?.length
    ? categories.slice(0, 5).map((c) => ({
        name: c.name.toUpperCase().replace('DINING', 'DINING ROOM'),
        slug: c.slug,
        tagline: c.tagline,
      }))
    : defaults;

  return (
    <section className="bg-beige py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-5 md:gap-0 md:px-8">
        {items.map((cat, i) => {
          const Icon = icons[cat.slug] || FiHome;
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col items-center border-r border-charcoal/5 px-4 py-6 text-center last:border-0 hover:bg-beige-dark/50 transition-colors"
              >
                <Icon className="mb-4 text-2xl text-sage transition-transform group-hover:scale-110" strokeWidth={1} />
                <span className="text-xs font-bold tracking-widest">{cat.name}</span>
                <span className="mt-1 text-xs text-charcoal/50">{cat.tagline}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
