import React from 'react';
import { FiShield, FiAlertTriangle, FiTool } from 'react-icons/fi';

export default function Warranty() {
  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <h1 className="section-heading mb-6 text-center">Warranty Information</h1>
        <p className="text-center text-sm text-charcoal/60 max-w-2xl mx-auto mb-16">
          We pride ourselves on the craftsmanship of our furniture. Rest easy knowing your purchase is protected by the Nestora Comprehensive Warranty.
        </p>

        <div className="bg-white p-8 border border-beige-dark/50 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <FiShield size={160} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <FiShield size={32} className="text-sage" />
              <h2 className="font-serif text-3xl font-semibold">1-Year Comprehensive Warranty</h2>
            </div>
            <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
              All Nestora furniture comes with a standard 1-year warranty from the date of delivery. This covers manufacturing defects that occur under normal, residential use.
            </p>
            
            <h4 className="font-bold text-sm tracking-wide uppercase mb-3 text-sage">What is Covered?</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-charcoal/70 mb-6">
              <li>Structural defects in solid wood and engineered wood frames.</li>
              <li>Failure of hardware components (hinges, drawer glides, mechanisms) under normal use.</li>
              <li>Significant splitting or cracking of wood not caused by environmental factors.</li>
              <li>Defects in foam, springs, or webbing within seating furniture.</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-beige p-8">
            <div className="flex items-center gap-3 mb-4">
              <FiAlertTriangle className="text-charcoal" size={24} />
              <h3 className="font-serif text-xl font-semibold">What is NOT Covered?</h3>
            </div>
            <ul className="list-none space-y-3 text-sm text-charcoal/70">
              <li className="flex items-start gap-2">
                <span className="text-charcoal/40 mt-1">•</span>
                <span>Normal wear and tear, including natural fading of fabrics, leather, and wood finishes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-charcoal/40 mt-1">•</span>
                <span>Damage caused by improper cleaning, moisture, extreme heat, or direct sunlight.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-charcoal/40 mt-1">•</span>
                <span>Accidental damage such as spills, burns, cuts, scratches, or pet damage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-charcoal/40 mt-1">•</span>
                <span>Pilling of fabrics (which is a normal characteristic of many textiles) or shrinking due to improper washing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-charcoal/40 mt-1">•</span>
                <span>Furniture used in commercial or institutional settings.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 border border-beige-dark/50">
            <div className="flex items-center gap-3 mb-4">
              <FiTool className="text-charcoal" size={24} />
              <h3 className="font-serif text-xl font-semibold">Claiming Warranty</h3>
            </div>
            <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
              To raise a warranty claim, please email our support team at <strong className="text-charcoal">support@nestora.com</strong> with:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-charcoal/70 mb-4">
              <li>Your Order ID or Invoice Number.</li>
              <li>Clear photographs or videos of the defect.</li>
              <li>A brief description of the issue.</li>
            </ol>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              If the defect is covered under warranty, Nestora will, at its sole discretion, either repair the defective part, replace it, or issue a prorated store credit if the item has been discontinued.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-charcoal/50">
          The Nestora warranty is valid only for the original purchaser and is non-transferable.
        </p>
      </div>
    </div>
  );
}
