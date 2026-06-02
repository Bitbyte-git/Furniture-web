import React from 'react';
import { FiRefreshCcw, FiCamera, FiCheckCircle } from 'react-icons/fi';

export default function Returns() {
  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <h1 className="section-heading mb-6 text-center">Returns & Exchanges</h1>
        <p className="text-center text-sm text-charcoal/60 max-w-2xl mx-auto mb-16">
          We stand behind the quality of our products. Our hassle-free return policy ensures a smooth experience.
        </p>

        <div className="bg-white p-8 border border-beige-dark/50 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="font-serif text-2xl font-semibold mb-4">7-Day Easy Returns</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                We accept returns within 7 days of delivery under the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-charcoal/70">
                <li>The product arrived damaged during transit.</li>
                <li>You received an incorrect product or a product with missing parts.</li>
                <li>The product has a significant manufacturing defect.</li>
              </ul>
              <p className="text-sm text-charcoal/70 leading-relaxed mt-4 italic">
                * Note: We do not offer returns for "change of mind" or sizing issues. Please check product dimensions carefully before placing an order.
              </p>
            </div>
            <div className="md:w-1/3 bg-beige/50 p-6 flex flex-col items-center text-center">
              <FiRefreshCcw size={48} className="text-sage mb-4" />
              <p className="font-bold tracking-widest text-sm uppercase">7 Days</p>
              <p className="text-xs text-charcoal/60 mt-1">To report an issue</p>
            </div>
          </div>
        </div>

        <h3 className="font-serif text-xl font-semibold mb-6 text-center">How to Initiate a Return</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 border border-beige-dark/50 text-center">
            <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCamera className="text-sage" size={20} />
            </div>
            <h4 className="font-bold text-sm mb-2 uppercase tracking-wide">1. Take Photos</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Capture clear images of the damaged product and the original packaging.
            </p>
          </div>
          <div className="bg-white p-6 border border-beige-dark/50 text-center">
            <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-serif font-bold text-sage">@</span>
            </div>
            <h4 className="font-bold text-sm mb-2 uppercase tracking-wide">2. Email Us</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Send the images along with your Order ID to support@nestora.com within 7 days.
            </p>
          </div>
          <div className="bg-white p-6 border border-beige-dark/50 text-center">
            <div className="w-12 h-12 bg-beige rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="text-sage" size={20} />
            </div>
            <h4 className="font-bold text-sm mb-2 uppercase tracking-wide">3. Resolution</h4>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Our team will review your request within 48 hours and arrange for a replacement or repair.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-sm tracking-wide uppercase mb-2">Refund Policy</h4>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              In cases where a replacement cannot be provided, a full refund will be initiated to your original payment method. Refunds typically take 5-7 business days to reflect in your bank account or credit card statement.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide uppercase mb-2">Cancellation Policy</h4>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Orders can be cancelled free of charge before they are dispatched from our warehouse. Once dispatched, a 10% restocking fee along with two-way shipping charges will be deducted from the refund amount. Custom or made-to-order furniture cannot be cancelled once production has begun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
