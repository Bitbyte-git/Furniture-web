import * as React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMoon, FiSun, FiArchive, FiGrid, FiLayers } from 'react-icons/fi';

const furnitureCollections = [
  {
    id: 'living-room',
    title: 'Living Room',
    description:
      'Curated sofas, coffee tables & media units designed for the modern Indian living space. Comfort meets craftsmanship.',
    imgSrc:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80',
    icon: <FiHome size={24} />,
    linkHref: '/collections/living-room',
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description:
      'Transform your bedroom into a restful retreat with solid wood beds, elegant wardrobes and ergonomic storage.',
    imgSrc:
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&q=80',
    icon: <FiMoon size={24} />,
    linkHref: '/collections/bedroom',
  },
  {
    id: 'dining',
    title: 'Dining Room',
    description:
      'Gather around beautifully crafted dining sets and sideboards — perfect for family meals and entertaining guests in style.',
    imgSrc:
      'https://images.unsplash.com/photo-1617806118233-18e1c12e4bf8?w=1200&q=80',
    icon: <FiGrid size={24} />,
    linkHref: '/collections/dining',
  },
  {
    id: 'storage',
    title: 'Storage',
    description:
      'Organise your home beautifully with our range of contemporary wardrobes, sideboards and built-in shelving units.',
    imgSrc:
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1200&q=80',
    icon: <FiArchive size={24} />,
    linkHref: '/collections/storage',
  },
  {
    id: 'decor',
    title: 'Decor & Accents',
    description:
      'Add the finishing touches with our curated selection of lighting, decorative pieces, rugs and statement accessories.',
    imgSrc:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80',
    icon: <FiSun size={24} />,
    linkHref: '/collections/decor',
  },
  {
    id: 'office',
    title: 'Study & Office',
    description:
      'Work from home in style. Ergonomic desks, bookshelves and storage solutions designed for focused productivity.',
    imgSrc:
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
    icon: <FiLayers size={24} />,
    linkHref: '/collections/office',
  },
];

export const ExpandingCards = React.forwardRef(
  ({ className = '', items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth >= 768);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const gridStyle = React.useMemo(() => {
      if (activeIndex === null) return {};
      if (isDesktop) {
        const columns = items
          .map((_, index) => (index === activeIndex ? '5fr' : '1fr'))
          .join(' ');
        return { gridTemplateColumns: columns };
      } else {
        const rows = items
          .map((_, index) => (index === activeIndex ? '5fr' : '1fr'))
          .join(' ');
        return { gridTemplateRows: rows };
      }
    }, [activeIndex, items.length, isDesktop]);

    return (
      <ul
        className={`w-full max-w-6xl gap-2 grid h-[600px] md:h-[520px] transition-[grid-template-columns,grid-template-rows] duration-500 ease-out ${className}`}
        style={{
          ...gridStyle,
          ...(isDesktop ? { gridTemplateRows: '1fr' } : { gridTemplateColumns: '1fr' }),
        }}
        ref={ref}
        {...props}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-md border border-white/10 md:min-w-[80px] min-h-0 min-w-0 ${activeIndex === index ? '' : ''}`}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            tabIndex={0}
            data-active={activeIndex === index}
          >
            {/* Background image */}
            <img
              src={item.imgSrc}
              alt={item.title}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
                activeIndex === index ? 'scale-100 grayscale-0' : 'scale-110 grayscale-[40%]'
              }`}
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Collapsed label — visible only when NOT active, rotated on desktop */}
            <div
              className={`absolute inset-0 flex items-end justify-center pb-6 md:items-center md:pb-0 transition-opacity duration-300 ${
                activeIndex === index ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80 md:rotate-90 md:whitespace-nowrap">
                {item.title}
              </span>
            </div>

            {/* Expanded content */}
            <article className="absolute inset-0 flex flex-col justify-end gap-3 p-6">
              <div
                className={`text-white/90 transition-all duration-300 delay-75 ${
                  activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {item.icon}
              </div>

              <h3
                className={`text-2xl font-serif font-semibold text-white transition-all duration-300 delay-100 ${
                  activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {item.title}
              </h3>

              <p
                className={`w-full max-w-xs text-sm text-white/80 leading-relaxed transition-all duration-300 delay-150 ${
                  activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {item.description}
              </p>

              <Link
                to={item.linkHref}
                className={`inline-block w-fit mt-2 bg-white/10 hover:bg-sage backdrop-blur-sm border border-white/20 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full transition-all duration-300 delay-200 ${
                  activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Explore →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    );
  }
);
ExpandingCards.displayName = 'ExpandingCards';

export default function ExpandingCollections() {
  return (
    <section className="bg-cream py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-sage font-semibold mb-4">
            Our Collections
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal leading-tight mb-4">
            Shop by Room
          </h2>
          <p className="text-charcoal/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Hover over a collection to discover beautifully designed furniture
            tailored for every corner of your home.
          </p>
        </div>

        {/* Expanding Cards */}
        <div className="flex justify-center">
          <ExpandingCards items={furnitureCollections} defaultActiveIndex={0} />
        </div>
      </div>
    </section>
  );
}
