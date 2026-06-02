import { Link } from 'react-router-dom';
import { FaInstagram, FaPinterest, FaFacebook, FaTiktok } from 'react-icons/fa';
import MapEmbed from './MapEmbed';

const shopLinks = ['All Products', 'Living Room', 'Bedroom', 'Dining Room', 'Storage', 'Decor'];
const companyLinks = ['About Us', 'Our Craftsmanship', 'Sustainability', 'Careers', 'Journal', 'Contact'];
const careLinks = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping & Delivery', to: '/shipping' },
  { label: 'Returns & Exchanges', to: '/returns' },
  { label: 'Warranty', to: '/warranty' },
  { label: 'Track Order', to: '/track-order' },
  { label: 'Help Center', to: '/help' }
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="rounded-[2rem] bg-black/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)] ring-1 ring-white/5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-sage/80">LH Furniture</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[0.18em]">Home for beautiful furniture.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
              Explore crafted furniture that brings warmth, calm, and a sophisticated edge to Indian homes. Designed to feel modern, lived-in, and wholly you.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.32em] text-white/50">Showroom</p>
                <p className="mt-2 text-sm text-white/80">Visit our Chandigarh studio for curated collections.</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.32em] text-white/50">Design Help</p>
                <p className="mt-2 text-sm text-white/80">Get styling advice for your next room refresh.</p>
              </div>
            </div>
            <div className="mt-6">
              <MapEmbed query="lakshmihayagreevar.com" height={220} />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-[0.35em] text-sage/80">Shop</p>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {shopLinks.map((l) => (
                  <li key={l}><Link to="/shop" className="hover:text-sage transition-colors duration-200">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-[0.35em] text-sage/80">Company</p>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {companyLinks.map((l) => (
                  <li key={l}><Link to="/about" className="hover:text-sage transition-colors duration-200">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-[0.35em] text-sage/80">Customer Care</p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              {careLinks.map((link) => (
                <li key={link.label}><Link to={link.to} className="hover:text-sage transition-colors duration-200">{link.label}</Link></li>
              ))}
            </ul>
            <div className="mt-8 rounded-3xl bg-black/60 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Need help?</p>
              <p className="mt-3 text-sm leading-6 text-white/75">Reach us by email or phone anytime. We’re here to help you find the right piece.</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
                <a href="mailto:hello@lhfurniture.com" className="hover:text-sage">hello@lhfurniture.com</a>
                <span className="text-white/40">|</span>
                <a href="tel:+919876543210" className="hover:text-sage">+91 98765 43210</a>
              </div>
            </div>
          </div>
        </div>

       
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} LH Furniture. Designed for serene living.</p>
          <div className="flex flex-wrap items-center gap-3 text-white/60">
            <Link to="/privacy" className="hover:text-sage transition-colors">Privacy Policy</Link>
            <span className="text-white/30">|</span>
            <Link to="/terms" className="hover:text-sage transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
