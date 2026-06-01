import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import MegaMenu from './MegaMenu';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/shop', label: 'SHOP', key: 'SHOP' },
  { to: '/shop?featured=true', label: 'COLLECTIONS', key: 'COLLECTIONS' },
  { to: '/about', label: 'ABOUT', key: 'ABOUT' },
  { to: '/journal', label: 'JOURNAL', key: 'JOURNAL' },
  { to: '/contact', label: 'CONTACT', key: 'CONTACT' },
];

export default function Header() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent border-0 shadow-none backdrop-blur-none'
          : isHome
            ? 'bg-black/35 backdrop-blur-md border-b border-white/10'
            : 'bg-charcoal/95 backdrop-blur-md border-b border-white/10 shadow-lg'
      }`}
      style={{ fontFamily: '"Playfair Display", serif' }}
    >
      <div className="mx-auto flex max-w-7xl min-h-[72px] items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold tracking-[0.16em] text-white/95">
          LH Furniture
        </Link>

        <nav className="hidden items-center gap-10 lg:flex relative">
          {links.map((l, idx) => (
            <div key={l.to} className="group relative" onMouseEnter={() => setOpen(idx)} onMouseLeave={() => setOpen(null)}>
              <NavLink to={l.to} className={({ isActive }) => `text-sm font-semibold tracking-[0.28em] uppercase transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                {l.label}
              </NavLink>
              {open === idx && (
                <div className="absolute left-0 top-full z-40 w-screen">
                  <div className="mt-2 flex justify-center">
                    <div className="w-full max-w-7xl px-4">
                      <MegaMenu keyLabel={l.key} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/shop" className="text-white/70 hover:text-white transition-colors duration-200" aria-label="Search">
            <FiSearch size={20} />
          </Link>
          <Link to={user ? '/account' : '/login'} className="text-white/70 hover:text-white transition-colors duration-200" aria-label="Account">
            <FiUser size={20} />
          </Link>
          <Link to="/cart" className="relative text-white/70 hover:text-white transition-colors duration-200" aria-label="Cart">
            <FiShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sage text-[10px] font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button type="button" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className={`border-t border-white/10 px-4 py-4 lg:hidden ${isTransparent ? 'bg-black/50 backdrop-blur-md' : 'bg-black/80 backdrop-blur-md'}`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block py-3 text-sm font-semibold tracking-[0.24em] uppercase text-white/90 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
