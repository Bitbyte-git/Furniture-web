import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPriceDisplay } from '../utils/formatPrice';

export default function ProductCard({ product }) {
  const image = product.mainImage || product.images?.[0] || '/background-fur.png';
  const price = formatPriceDisplay(product.sellingPrice);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link to={`/product/${product._id}`} className="group block relative">
        <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-x-0 bottom-0 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-t from-black/60 to-transparent p-6 flex justify-center">
            <span className="text-white text-xs font-semibold tracking-widest uppercase border-b border-white/40 pb-1">Quick View</span>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-sm font-medium tracking-wide group-hover:text-sage transition-colors">{product.name}</h3>
          <p className="mt-2 text-sm text-charcoal/60">{price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
