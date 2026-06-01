import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

export default function PromoSection() {
  return (
    <ParallaxSection
      image="https://i.pinimg.com/1200x/aa/73/82/aa738246a9d663c7b7a677d4ae40a0f9.jpg"
      height="min-h-[70vh]"
      overlay="bg-black/40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl text-white"
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-white/80">NEW COLLECTION</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">
            Naturally Beautiful. Uniquely Yours.
          </h2>
          <p className="mt-4 text-lg text-white/85">Inspired by nature. Designed for living.</p>
          <Link to="/shop?new=true" className="btn-sage mt-8">
            DISCOVER NOW →
          </Link>
        </motion.div>
      </div>
    </ParallaxSection>
  );
}
