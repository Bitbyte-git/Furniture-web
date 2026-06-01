import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data.product)).catch(() => {});
  }, [id]);

  const handleAdd = async () => {
    try {
      await addToCart(product._id, qty);
      toast.success('Added to cart');
    } catch {
      toast.error('Could not add to cart');
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.error('Please login to save wishlist');
      return;
    }
    try {
      await api.post(`/wishlist/${product._id}`);
      toast.success('Added to wishlist');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Wishlist error');
    }
  };

  if (!product) {
    return <div className="flex min-h-[50vh] items-center justify-center">Loading...</div>;
  }

  const image = product.mainImage || product.images?.[0];

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img src={image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-xs tracking-widest text-sage">{product.category}</p>
          <h1 className="section-heading mt-2">{product.name}</h1>
          <p className="mt-4 text-2xl font-medium">{formatPrice(product.sellingPrice)}</p>
          {product.mrp > product.sellingPrice && (
            <p className="text-sm text-charcoal/50 line-through">{formatPrice(product.mrp)}</p>
          )}
          <p className="mt-6 leading-relaxed text-charcoal/70">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.material?.map((m) => (
              <span key={m} className="border border-charcoal/20 px-3 py-1 text-xs">{m}</span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <label className="text-sm">Qty</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-16 border px-3 py-2"
            />
            <span className="text-sm text-charcoal/50">{product.stock} in stock</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button type="button" onClick={handleAdd} className="btn-primary" disabled={product.stock < 1}>
              ADD TO CART
            </button>
            <button type="button" onClick={handleWishlist} className="btn-sage">
              WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
