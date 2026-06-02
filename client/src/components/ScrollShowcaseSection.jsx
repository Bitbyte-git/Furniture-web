import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ContainerScroll } from './ContainerScroll';
import { AnimatedTabs } from './AnimatedTabs';

export default function ScrollShowcaseSection() {
  return (
    <div className="bg-cream overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-6 md:mb-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-xs tracking-[0.4em] uppercase text-sage font-semibold mb-4"
            >
              Crafted For Indian Homes
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-semibold text-charcoal leading-tight"
            >
              Where Craftsmanship <br />
              <span className="text-sage">Meets Modern Living</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-charcoal/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            >
              Every piece is thoughtfully designed, sustainably sourced, and built to last — so your home feels exactly like it should.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex justify-center gap-4 flex-wrap"
            >
              <Link
                to="/collections/living-room"
                className="inline-block bg-charcoal text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-sage transition-colors duration-300"
              >
                Explore Living Room
              </Link>
              <Link
                to="/shop"
                className="inline-block border border-charcoal text-charcoal text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-charcoal hover:text-white transition-colors duration-300"
              >
                Shop All
              </Link>
            </motion.div>
          </div>
        }
      >
        {/* Tablet: full-bleed room image with overlay stats */}
        <div className="relative w-full h-full">
          <img
            src="/shop-backgr.png"
            alt="Luxury Living Room Showcase"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-2xl" />

          {/* AnimatedTabs — overlaid top-left on blank wall area */}
          <div className="absolute top-4 left-4 w-[56%] max-w-sm">
            <AnimatedTabs className="w-full max-w-none" />  
          </div>

          {/* Floating stat pills — bottom left */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 items-end justify-between">
            <div className="flex gap-3 flex-wrap">
              {[
                { label: '500+', sub: 'Products' },
                { label: '15k+', sub: 'Pin Codes' },
                { label: '1-Year', sub: 'Warranty' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white text-center min-w-[80px]"
                >
                  <p className="text-lg font-bold leading-none">{stat.label}</p>
                  <p className="text-xs text-white/70 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
            <Link
              to="/collections/living-room"
              className="bg-sage hover:bg-sage/90 text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
