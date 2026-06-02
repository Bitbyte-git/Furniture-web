import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { GlowCard } from '../components/GlowCard';
import { FiChevronRight, FiGrid, FiArrowRight } from 'react-icons/fi';

/* ─── Banner data for every slug ──────────────────────────────────────── */
const categoryBanners = {
  'living-room':    { title: 'Living Room',         desc: 'Curated comfort for your everyday spaces. Premium sofas, tables, and media units for modern Indian homes.',       img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=80' },
  'bedroom':        { title: 'Bedroom Sanctuary',    desc: 'Transform your bedroom into a restful retreat. Beds, mattresses, wardrobes and more.',                           img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1600&q=80' },
  'dining':         { title: 'Dining Room',           desc: 'Gather around beautifully crafted dining sets perfect for family meals and entertaining.',                        img: 'https://images.unsplash.com/photo-1617806118233-18e1c12e4bf8?w=1600&q=80' },
  'storage':        { title: 'Smart Storage',         desc: 'Organise your life beautifully with contemporary wardrobes, sideboards, and shelving units.',                    img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1600&q=80' },
  'decor':          { title: 'Home Decor',             desc: 'Add the finishing touches with our curated selection of lighting, rugs, and decorative accents.',                img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&q=80' },
  // Living Room subs
  'sofas':          { title: 'Sofas & Sectionals',    desc: 'Sink into pure comfort. Premium upholstery for lasting everyday luxury.',                                        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80' },
  'chairs':         { title: 'Chairs & Armchairs',    desc: 'Accent chairs and lounge seating that elevate every corner of your living room.',                                img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1600&q=80' },
  'tables':         { title: 'Tables',                desc: 'Coffee tables, side tables and console tables crafted from solid hardwood and premium materials.',               img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1600&q=80' },
  'tv-units':       { title: 'TV Units & Media Consoles', desc: 'Stylish and functional media storage to keep your living room clutter-free.',                               img: 'https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=1600&q=80' },
  'shelves':        { title: 'Shelves & Bookcases',   desc: 'Display your books, plants, and decor beautifully on our premium shelving units.',                              img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80' },
  'lighting':       { title: 'Lighting',              desc: 'Set the mood with our curated collection of floor lamps, pendants, and table lights.',                          img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80' },
  'rugs':           { title: 'Rugs & Carpets',        desc: 'Ground your space in warmth and texture with our collection of handcrafted rugs and carpets.',                  img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80' },
  // Bedroom subs
  'beds':           { title: 'Beds & Bed Frames',     desc: 'Solid hardwood and upholstered bed frames built for long-term comfort and elegance.',                           img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1600&q=80' },
  'mattresses':     { title: 'Mattresses',            desc: 'Orthopaedic to memory foam — the perfect mattress for the perfect night\'s sleep.',                             img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80' },
  'wardrobes':      { title: 'Wardrobes & Almirahs',  desc: 'Spacious, organised, and elegant — wardrobes that feel like a boutique dressing room.',                         img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1600&q=80' },
  'bedside-tables': { title: 'Bedside Tables',        desc: 'The perfect companion to your bed. Stylish nightstands to keep essentials close.',                              img: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1600&q=80' },
  // Dining subs
  'dining-tables':  { title: 'Dining Tables',         desc: 'Masterfully crafted dining tables built to last for generations.',                                               img: 'https://images.unsplash.com/photo-1617806118233-18e1c12e4bf8?w=1600&q=80' },
  'dining-chairs':  { title: 'Dining Chairs',         desc: 'Comfortable and beautifully designed chairs that complement every dining table.',                                img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1600&q=80' },
  'sideboards':     { title: 'Sideboards & Buffets',  desc: 'Functional elegance for your dining space with our handcrafted sideboards.',                                    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80' },
  // Storage subs
  'dressers':       { title: 'Dressers & Drawers',    desc: 'Smooth-gliding drawers and premium finishes for a luxury bedroom feel.',                                        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80' },
  'shelving':       { title: 'Shelves & Bookcases',   desc: 'Our shelving units display your books, plants, and decor beautifully.',                                         img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80' },
};

/* ─── Sub-category cards for each room page ──────────────────────────── */
const roomSubCategories = {
  'living-room': [
    { slug: 'sofas',    label: 'Sofas',     img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
    { slug: 'chairs',   label: 'Chairs',    img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80' },
    { slug: 'tables',   label: 'Tables',    img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80' },
    { slug: 'tv-units', label: 'TV Units',  img: 'https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=600&q=80' },
    { slug: 'shelves',  label: 'Shelves',   img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80' },
    { slug: 'lighting', label: 'Lighting',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
    { slug: 'rugs',     label: 'Rugs',      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  ],
  'bedroom': [
    { slug: 'beds',           label: 'Beds',           img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80' },
    { slug: 'mattresses',     label: 'Mattresses',     img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' },
    { slug: 'wardrobes',      label: 'Wardrobes',      img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&q=80' },
    { slug: 'bedside-tables', label: 'Bedside Tables', img: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=600&q=80' },
    { slug: 'lighting',       label: 'Lighting',       img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
    { slug: 'rugs',           label: 'Rugs',           img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  ],
  'dining': [
    { slug: 'dining-tables', label: 'Dining Tables', img: 'https://images.unsplash.com/photo-1617806118233-18e1c12e4bf8?w=600&q=80' },
    { slug: 'dining-chairs', label: 'Dining Chairs', img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80' },
    { slug: 'sideboards',    label: 'Sideboards',    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
    { slug: 'lighting',      label: 'Lighting',      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
    { slug: 'rugs',          label: 'Rugs',          img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  ],
  'storage': [
    { slug: 'wardrobes', label: 'Wardrobes', img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600&q=80' },
    { slug: 'dressers',  label: 'Dressers',  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { slug: 'shelving',  label: 'Shelving',  img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80' },
    { slug: 'shelves',   label: 'Shelves',   img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80' },
  ],
  'decor': [
    { slug: 'lighting', label: 'Lighting', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
    { slug: 'rugs',     label: 'Rugs',     img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  ],
};

/* ─── Slug → backend category name ───────────────────────────────────── */
const categoryNameMap = {
  'living-room':    'Living Room',
  'bedroom':        'Bedroom',
  'dining':         'Dining',
  'storage':        'Storage',
  'decor':          'Decor',
  'sofas':          'Sofas',
  'chairs':         'Chairs',
  'tables':         'Tables',
  'tv-units':       'TV Units',
  'shelves':        'Shelves',
  'lighting':       'Lighting',
  'rugs':           'Rugs',
  'beds':           'Beds',
  'mattresses':     'Mattresses',
  'wardrobes':      'Wardrobes',
  'bedside-tables': 'Bedside Tables',
  'dining-tables':  'Dining Tables',
  'dining-chairs':  'Dining Chairs',
  'sideboards':     'Sideboards',
  'dressers':       'Dressers',
  'shelving':       'Shelving',
};

/* ─── Sub-Category Card using GlowCard ──────────────────────────────── */
function SubCategoryCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/collections/${item.slug}`} className="block group">
        <GlowCard className="w-full h-64 md:h-72 lg:h-80 cursor-pointer">
          {/* Full-bleed image */}
          <img
            src={item.img}
            alt={item.label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ zIndex: 0 }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" style={{ zIndex: 1 }} />
          {/* Bottom label */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between" style={{ zIndex: 2 }}>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-0.5">Explore</p>
              <h3 className="text-white font-serif text-xl md:text-2xl font-semibold leading-tight">{item.label}</h3>
            </div>
            <span className="flex-shrink-0 bg-sage text-white rounded-full p-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <FiArrowRight size={16} />
            </span>
          </div>
        </GlowCard>
      </Link>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function CategoryLanding() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryCategory = categoryNameMap[slug] || slug;
  const bannerData = categoryBanners[slug] || {
    title: queryCategory,
    desc: 'Explore our curated collection of thoughtfully designed pieces.',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80',
  };
  const subCategories = roomSubCategories[slug] || null;

  useEffect(() => {
    setLoading(true);
    api.get(`/products?category=${encodeURIComponent(queryCategory)}`)
      .then(res => setProducts(res.data.products || []))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [queryCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-cream min-h-screen"
    >
      {/* ── Hero Banner ── */}
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden bg-charcoal">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={bannerData.img}
          alt={bannerData.title}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-sage font-semibold mb-3"
          >
            LH Furniture
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif font-semibold text-white mb-4"
          >
            {bannerData.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/75 max-w-xl text-sm md:text-base leading-relaxed"
          >
            {bannerData.desc}
          </motion.p>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="border-b border-beige-dark/50 bg-white sticky top-[72px] z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-2 text-xs text-charcoal/60 uppercase tracking-widest font-semibold">
            <Link to="/" className="hover:text-sage transition-colors">Home</Link>
            <FiChevronRight />
            <Link to="/shop" className="hover:text-sage transition-colors">Collections</Link>
            <FiChevronRight />
            <span className="text-charcoal">{bannerData.title}</span>
          </div>
          <div className="flex items-center gap-2 text-charcoal/60 text-sm">
            <FiGrid />
            <span>{products.length} Products</span>
          </div>
        </div>
      </div>

      {/* ── Sub-Category Cards (only for room-level slugs) ── */}
      {subCategories && (
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-xs tracking-[0.35em] uppercase text-sage font-semibold mb-1">Browse by Category</p>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal">Shop the Collection</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {subCategories.map((item, i) => (
              <SubCategoryCard key={item.slug} item={item} index={i} />
            ))}
          </div>
          <div className="mt-10 border-t border-charcoal/10" />
        </div>
      )}

      {/* ── Product Grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {subCategories && products.length === 0 && !loading ? null : (
          <>
            {subCategories && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="text-xs tracking-[0.35em] uppercase text-sage font-semibold mb-1">All Products</p>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal">Featured Pieces</h2>
              </motion.div>
            )}

            {loading ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] animate-pulse bg-gray-200 rounded-xl" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white border border-beige-dark/50 rounded-2xl"
              >
                <h3 className="font-serif text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-charcoal/60 text-sm mb-6">We couldn't find any products in this collection.</p>
                <Link to="/shop" className="inline-block bg-sage text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-sage/90 transition-colors">Browse All Furniture</Link>
              </motion.div>
            ) : (
              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8"
              >
                {products.map(p => (
                  <motion.div
                    key={p._id}
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } } }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
