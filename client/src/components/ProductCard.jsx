import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPriceDisplay } from '../utils/formatPrice';

export default function ProductCard({ product }) {
  const image = product.mainImage || product.images?.[0];
  const price = formatPriceDisplay(product.sellingPrice);

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Link to={`/product/${product._id}`} className="group block">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <h3 className="mt-4 text-sm font-medium tracking-wide">{product.name}</h3>
        <p className="mt-1 text-sm text-charcoal/60">{price}</p>
      </Link>
    </motion.div>
  );
}
