import { motion } from 'framer-motion';

const items = [
  '✦ PAN India Delivery',
  '✦ Free Assembly',
  '✦ 1-Year Warranty',
  '✦ Solid Hardwood',
  '✦ Sustainably Sourced',
  '✦ 25,000+ Happy Homes',
  '✦ Easy Returns',
  '✦ EMI Available',
  '✦ Expert Craftsmanship',
];

export default function MarqueeTicker() {
  return (
    <div className="bg-sage py-3.5 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-xs font-semibold uppercase tracking-[0.3em] text-white/90 flex-shrink-0">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
