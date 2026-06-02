import React from 'react';
import { Link } from 'react-router-dom';
import { FiHelpCircle, FiTruck, FiRefreshCcw, FiShield, FiMessageCircle, FiPhoneCall } from 'react-icons/fi';

export default function HelpCenter() {
  const cards = [
    { title: 'Track Order', desc: 'Check the live status of your shipment', icon: <FiTruck size={28} />, link: '/track-order' },
    { title: 'Returns & Exchanges', desc: 'Learn about our 7-day return policy', icon: <FiRefreshCcw size={28} />, link: '/returns' },
    { title: 'Warranty', desc: 'Details on our 1-year comprehensive coverage', icon: <FiShield size={28} />, link: '/warranty' },
    { title: 'FAQs', desc: 'Answers to our most common questions', icon: <FiHelpCircle size={28} />, link: '/faq' },
    { title: 'Shipping Policy', desc: 'Delivery timelines and PAN India shipping', icon: <FiTruck size={28} />, link: '/shipping' },
    { title: 'Contact Support', desc: 'Get in touch with our support team', icon: <FiMessageCircle size={28} />, link: '/contact' },
  ];

  return (
    <div className="bg-cream py-16 min-h-[70vh]">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h1 className="section-heading mb-4 text-center">Help Center</h1>
        <p className="text-center text-sm text-charcoal/60 max-w-2xl mx-auto mb-16">
          How can we help you today? Select an option below to find information or get in touch with our support team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map((card, idx) => (
            <Link key={idx} to={card.link} className="group block bg-white p-8 border border-beige-dark/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="text-sage mb-4 group-hover:scale-110 transition-transform origin-left">{card.icon}</div>
              <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-sage transition-colors">{card.title}</h3>
              <p className="text-sm text-charcoal/60">{card.desc}</p>
            </Link>
          ))}
        </div>

        <div className="bg-charcoal text-white p-8 md:p-12 text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h3 className="font-serif text-2xl font-semibold mb-2">Need immediate assistance?</h3>
            <p className="text-sm text-white/70">Our customer care team is available Monday to Saturday, 9 AM to 6 PM IST.</p>
          </div>
          <a href="tel:+918000000000" className="bg-sage hover:bg-sage/90 text-white px-8 py-3 font-semibold tracking-widest text-sm uppercase flex items-center gap-2 transition-colors whitespace-nowrap">
            <FiPhoneCall size={18} />
            CALL US
          </a>
        </div>
      </div>
    </div>
  );
}
