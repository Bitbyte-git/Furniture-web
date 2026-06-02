import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      { q: 'How long will it take to receive my order?', a: 'Standard delivery to major metro cities takes 5-7 business days. Non-metro deliveries take 7-14 business days. Custom-made items may take up to 21 days.' },
      { q: 'Do you offer free shipping?', a: 'Yes! We offer free shipping across India for all orders above ₹10,000. A nominal shipping fee applies for orders below this amount.' },
      { q: 'Can I track my order?', a: 'Absolutely. Once dispatched, you will receive an AWB tracking number via email and SMS. You can use our Track Order page to check live status.' }
    ]
  },
  {
    category: 'Returns & Warranty',
    questions: [
      { q: 'What is your return policy?', a: 'We offer a 7-day easy return policy for products that arrive damaged, defective, or incorrect. We do not accept returns for change of mind.' },
      { q: 'Does your furniture come with a warranty?', a: 'Yes, all Nestora furniture is covered by a 1-Year Comprehensive Warranty against manufacturing defects and hardware failure.' }
    ]
  },
  {
    category: 'Products & Materials',
    questions: [
      { q: 'Do you offer custom furniture?', a: 'Currently, we do not offer bespoke customization, but we do offer multiple fabric and color options for our seating and upholstery ranges.' },
      { q: 'Is assembly required?', a: 'Many of our items come pre-assembled. For items requiring assembly (like beds and large tables), we provide free carpenter assembly at the time of delivery or within 48 hours.' },
      { q: 'How should I care for my solid wood furniture?', a: 'Dust regularly with a dry, soft cloth. Avoid direct sunlight and extreme temperatures. Use coasters for hot or wet items. Clean spills immediately with a damp cloth.' }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <h1 className="section-heading mb-6 text-center">Frequently Asked Questions</h1>
        <p className="text-center text-sm text-charcoal/60 max-w-xl mx-auto mb-16">
          Find answers to common questions about our products, shipping, returns, and more. If you can't find what you're looking for, feel free to contact us.
        </p>

        <div className="space-y-12">
          {faqs.map((section, secIdx) => (
            <div key={secIdx}>
              <h3 className="font-serif text-2xl font-semibold mb-6 border-b border-charcoal/10 pb-2">{section.category}</h3>
              <div className="space-y-4">
                {section.questions.map((faq, qIdx) => {
                  const globalIdx = `${secIdx}-${qIdx}`;
                  const isOpen = openIndex === globalIdx;
                  return (
                    <div key={qIdx} className="bg-white border border-beige-dark/50 overflow-hidden transition-all duration-300">
                      <button
                        className="w-full text-left px-6 py-4 flex justify-between items-center bg-white hover:bg-beige/30 transition-colors"
                        onClick={() => toggle(globalIdx)}
                      >
                        <span className="font-medium text-charcoal text-sm">{faq.q}</span>
                        {isOpen ? <FiMinus className="text-sage flex-shrink-0" /> : <FiPlus className="text-charcoal/40 flex-shrink-0" />}
                      </button>
                      <div className={`px-6 text-sm text-charcoal/70 leading-relaxed transition-all duration-300 ${isOpen ? 'py-4 border-t border-beige-dark/50 opacity-100' : 'max-h-0 opacity-0 overflow-hidden py-0'}`}>
                        {faq.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-charcoal/60 mb-4">Still have questions?</p>
          <a href="/contact" className="inline-block border border-charcoal text-charcoal px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-charcoal hover:text-white transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
