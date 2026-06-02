import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock } from 'react-icons/fi';

const posts = [
  {
    id: 1,
    title: 'Japandi Style: Where East Meets North',
    excerpt:
      'Discover the serene harmony of Japanese minimalism blended with Scandinavian functionality — and how to bring it into your Indian home.',
    category: 'Trends',
    date: 'May 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Caring for Solid Wood Furniture in Indian Climates',
    excerpt:
      'India\'s humidity and heat can warp and crack untreated wood. Here\'s your complete seasonal care guide for solid wood furniture.',
    category: 'Care Guide',
    date: 'April 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
    featured: false,
  },
  {
    id: 3,
    title: '5 Smart Storage Ideas for Small Space Living',
    excerpt:
      'Maximize every square foot of your compact home with these clever dual-purpose furniture picks and vertical storage strategies.',
    category: 'Tips',
    date: 'March 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=900&q=80',
    featured: false,
  },
  {
    id: 4,
    title: 'The Art of Layering Textures in Your Living Room',
    excerpt:
      'Mixing wood, linen, jute and metal creates depth and warmth. Our designers share their top tips for a cohesive, luxurious look.',
    category: 'Design',
    date: 'February 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80',
    featured: false,
  },
  {
    id: 5,
    title: 'How to Choose the Right Dining Table for Your Family',
    excerpt:
      'Six-seater or extendable? Solid teak or engineered wood? We break down every variable to help you make the perfect choice.',
    category: 'Buying Guide',
    date: 'January 2026',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1617806118233-18e1c12e4bf8?w=900&q=80',
    featured: false,
  },
];

const categoryColors = {
  Trends: 'bg-sage/10 text-sage',
  'Care Guide': 'bg-amber-50 text-amber-700',
  Tips: 'bg-blue-50 text-blue-600',
  Design: 'bg-rose-50 text-rose-600',
  'Buying Guide': 'bg-purple-50 text-purple-600',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Journal() {
  const featured = posts.find((p) => p.featured);
  const grid = posts.filter((p) => !p.featured);

  return (
    <div className="bg-cream">
      {/* Hero */}
      <div className="relative h-[38vh] w-full overflow-hidden bg-charcoal flex items-center justify-center text-center px-4">
        <img
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80"
          alt="Journal"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-sage font-semibold mb-3"
          >
            Stories & Inspiration
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif font-semibold text-white"
          >
            The LH Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-3 text-white/60 text-sm max-w-md mx-auto"
          >
            Design ideas, furniture care tips, and style inspiration for the modern Indian home.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">

        {/* Featured Post */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="group grid md:grid-cols-2 gap-0 mb-16 bg-white border border-beige-dark/50 overflow-hidden hover:shadow-xl transition-shadow duration-500"
          >
            <div className="overflow-hidden h-64 md:h-auto">
              <img
                src={featured.img} alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${categoryColors[featured.category] || 'bg-gray-100 text-gray-500'}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-charcoal/40 uppercase tracking-widest">Featured</span>
              </div>
              <h2 className="font-serif text-3xl font-semibold text-charcoal mb-4 leading-snug group-hover:text-sage transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm text-charcoal/60 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-charcoal/40">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><FiClock size={12} /> {featured.readTime}</span>
                </div>
                <span className="flex items-center gap-2 text-xs font-semibold text-sage uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read More <FiArrowRight />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section Label */}
        <div className="flex items-center gap-4 mb-10">
          <h2 className="font-serif text-2xl font-semibold text-charcoal">Latest Articles</h2>
          <div className="flex-1 h-px bg-charcoal/10" />
        </div>

        {/* Grid Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {grid.map((post, i) => (
            <motion.article
              key={post.id}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group flex flex-col bg-white border border-beige-dark/50 overflow-hidden hover:shadow-lg transition-shadow duration-500 cursor-pointer"
            >
              <div className="overflow-hidden h-56">
                <img
                  src={post.img} alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${categoryColors[post.category] || 'bg-gray-100 text-gray-500'}`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3 leading-snug group-hover:text-sage transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed flex-1 mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between border-t border-beige-dark/40 pt-4">
                  <div className="flex items-center gap-3 text-xs text-charcoal/40">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><FiClock size={11} /> {post.readTime}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-sage uppercase tracking-widest group-hover:gap-3 transition-all">
                    Read <FiArrowRight size={13} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mt-16 bg-charcoal text-white p-12 text-center"
        >
          <h3 className="font-serif text-3xl font-semibold mb-3">Never Miss an Article</h3>
          <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
            Get our latest design guides, care tips and exclusive offers delivered to your inbox every month.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/10 border border-white/20 px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-sage transition-colors"
            />
            <button className="bg-sage hover:bg-sage/80 text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 transition-colors whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
