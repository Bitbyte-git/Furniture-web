import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

const CATEGORIES = ['Living Room', 'Bedroom', 'Dining', 'Storage', 'Decor', 'Office'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState(CATEGORIES);
  const [sort, setSort] = useState('newest');
  const [filterOpen, setFilterOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const featured = searchParams.get('featured') || '';

  useEffect(() => {
    api.get('/products/categories')
      .then((res) => {
        if (res.data.categories?.length) {
          setAllCategories(res.data.categories.map((c) => c.name || c));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (featured) params.set('featured', 'true');
    api.get(`/products?${params}`)
      .then((res) => {
        let fetched = res.data.products || [];
        if (sort === 'price_asc') fetched = [...fetched].sort((a, b) => a.sellingPrice - b.sellingPrice);
        if (sort === 'price_desc') fetched = [...fetched].sort((a, b) => b.sellingPrice - a.sellingPrice);
        setProducts(fetched);
      })
      .finally(() => setLoading(false));
  }, [category, search, featured, sort]);

  const setCategory = (cat) => {
    const next = new URLSearchParams(searchParams);
    if (cat) next.set('category', cat); else next.delete('category');
    next.delete('search');
    next.delete('featured');
    setSearchParams(next);
    setFilterOpen(false);
  };

  const clearAll = () => setSearchParams({});

  const pageTitle = search
    ? `Results for "${search}"`
    : featured
    ? 'Featured Collections'
    : category
    ? category
    : 'All Products';

  return (
    <div className="bg-cream min-h-screen">
      {/* Banner */}
      <div className="relative h-[32vh] bg-charcoal flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80"
          alt="Shop"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.4em] uppercase text-sage font-semibold mb-3">
            {category || featured ? 'Collections' : 'Browse All'}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-semibold text-white">
            {pageTitle}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-2 text-white/50 text-sm">
            {loading ? '...' : `${products.length} products`}
          </motion.p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-beige-dark/50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex items-center gap-4 flex-wrap">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap flex-1">
            <button
              onClick={() => setCategory('')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${!category && !featured ? 'bg-charcoal text-white' : 'bg-beige text-charcoal/70 hover:bg-beige-dark/50'}`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${category === cat ? 'bg-charcoal text-white' : 'bg-beige text-charcoal/70 hover:bg-beige-dark/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-beige border border-beige-dark text-xs font-semibold uppercase tracking-widest text-charcoal/70 px-4 py-2 pr-8 focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" size={14} />
          </div>

          {/* Clear */}
          {(category || search || featured) && (
            <button onClick={clearAll} className="flex items-center gap-1 text-xs text-charcoal/50 hover:text-sage transition-colors">
              <FiX size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        {loading ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24 bg-white border border-beige-dark/50">
            <p className="font-serif text-2xl font-semibold text-charcoal mb-2">No products found</p>
            <p className="text-sm text-charcoal/50 mb-6">Try a different category or clear your filters.</p>
            <button onClick={clearAll} className="inline-block bg-charcoal text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-sage transition-colors">
              Browse All Products
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8"
          >
            {products.map((p) => (
              <motion.div key={p._id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
