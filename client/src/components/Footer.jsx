import { Link } from 'react-router-dom';
import { FaInstagram, FaPinterest, FaFacebook, FaTiktok } from 'react-icons/fa';

const shopLinks = ['All Products', 'Living Room', 'Bedroom', 'Dining Room', 'Storage', 'Decor'];
const companyLinks = ['About Us', 'Our Craftsmanship', 'Sustainability', 'Careers', 'Journal', 'Contact'];
const careLinks = ['FAQ', 'Shipping & Delivery', 'Returns & Exchanges', 'Warranty', 'Track Order', 'Help Center'];

export default function Footer() {
  return (
    <footer className="bg-beige border-t border-beige-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className="text-lg font-semibold tracking-[0.3em]">NESTORA</h3>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
              Thoughtfully crafted furniture for beautiful spaces and everyday living. Japandi-inspired design for modern homes.
            </p>
            <div className="mt-6 flex gap-4 text-charcoal/60">
              <a href="#" aria-label="Instagram"><FaInstagram size={18} /></a>
              <a href="#" aria-label="Pinterest"><FaPinterest size={18} /></a>
              <a href="#" aria-label="Facebook"><FaFacebook size={18} /></a>
              <a href="#" aria-label="TikTok"><FaTiktok size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest">SHOP</h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
              {shopLinks.map((l) => (
                <li key={l}><Link to="/shop" className="hover:text-sage">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest">COMPANY</h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
              {companyLinks.map((l) => (
                <li key={l}><Link to="/about" className="hover:text-sage">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest">CUSTOMER CARE</h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
              {careLinks.map((l) => (
                <li key={l}><Link to="/contact" className="hover:text-sage">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="hidden items-end justify-end lg:flex">
            <svg viewBox="0 0 120 80" className="h-24 w-32 text-sage/30" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M60 10 Q80 30 70 50 Q50 70 30 55 Q10 40 25 20 Q40 5 60 10" />
              <path d="M45 25 Q55 35 50 45" />
              <path d="M75 30 Q85 45 75 60" />
            </svg>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-charcoal/10 pt-8 text-xs text-charcoal/50 md:flex-row">
          <p>© {new Date().getFullYear()} NESTORA Furniture. All rights reserved.</p>
          <p>
            <Link to="/privacy" className="hover:text-sage">Privacy Policy</Link>
            {' | '}
            <Link to="/terms" className="hover:text-sage">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
