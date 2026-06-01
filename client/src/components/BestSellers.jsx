import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../api/axios';
import ProductCard from './ProductCard';

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    api.get('/products/featured').then((res) => setProducts(res.data.products || [])).catch(() => {});
  }, []);

  const scroll = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-[0.2em]">BEST SELLERS</h2>
          <Link to="/shop" className="text-xs font-medium tracking-widest text-charcoal/70 hover:text-sage">
            VIEW ALL PRODUCTS →
          </Link>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {products.map((p) => (
              <div key={p._id} className="min-w-[220px] flex-shrink-0 snap-start md:min-w-[240px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={scroll}
            className="absolute -right-2 top-1/3 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 bg-white shadow hover:bg-beige"
            aria-label="Next products"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
