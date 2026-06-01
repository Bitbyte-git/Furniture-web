import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiPackage, FiHeart } from 'react-icons/fi';

const stats = [
  { icon: FiAward, value: '12+', label: 'Years of Experience' },
  { icon: FiPackage, value: '850+', label: 'Unique Products' },
  { icon: FiHeart, value: '25K+', label: 'Happy Customers' },
];

export default function AboutSection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
            alt="NESTORA sideboard"
            className="h-[500px] w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-sage">ABOUT NESTORA</p>
          <h2 className="section-heading mt-4">
            Simplicity is the Ultimate{' '}
            <em className="font-serif italic text-sage">Sophistication.</em>
          </h2>
          <p className="mt-6 leading-relaxed text-charcoal/70">
            At NESTORA, we believe beautiful living starts with thoughtful design. Our Japandi-inspired
            collections blend Japanese minimalism with Scandinavian warmth — creating furniture that
            elevates your space while standing the test of everyday life.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto text-2xl text-sage" strokeWidth={1.5} />
                <p className="mt-2 font-serif text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-charcoal/60">{s.label}</p>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn-sage mt-10">
            LEARN MORE →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
