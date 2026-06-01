import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({
  image,
  children,
  height = 'min-h-[85vh]',
  overlay = 'bg-black/35',
  className = '',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${height} ${className}`}>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -top-[15%] h-[130%] w-full"
      >
        <img src={image} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10 flex h-full min-h-[inherit] items-center">{children}</div>
    </section>
  );
}
