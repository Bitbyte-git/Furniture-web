import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (featured) params.set('featured', 'true');
    api.get(`/products?${params}`)
      .then((res) => setProducts(res.data.products || []))
      .finally(() => setLoading(false));
  }, [category, search, featured]);

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h1 className="section-heading mb-2">Shop</h1>
        <p className="mb-10 text-charcoal/60">
          {category ? `${category} Collection` : 'Explore our thoughtfully crafted furniture'}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-charcoal/50 py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
