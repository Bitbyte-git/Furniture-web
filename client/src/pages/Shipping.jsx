import React from 'react';
import { FiTruck, FiBox, FiClock, FiMapPin } from 'react-icons/fi';

export default function Shipping() {
  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <h1 className="section-heading mb-6 text-center">Shipping & Delivery</h1>
        <p className="text-center text-sm text-charcoal/60 max-w-2xl mx-auto mb-16">
          We partner with leading logistics providers across India to ensure your furniture reaches you safely and on time.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 border border-beige-dark/50">
            <FiTruck className="text-sage mb-4" size={32} />
            <h3 className="font-serif text-xl font-semibold mb-3">PAN India Delivery</h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              We deliver to over 15,000+ pin codes across India. Deliveries in metro cities (Bengaluru, Mumbai, Delhi-NCR, Chennai, Hyderabad, Pune, Kolkata) typically take 5-7 business days. Non-metro deliveries take 7-14 business days.
            </p>
          </div>
          <div className="bg-white p-8 border border-beige-dark/50">
            <FiBox className="text-sage mb-4" size={32} />
            <h3 className="font-serif text-xl font-semibold mb-3">Free Shipping</h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Enjoy free shipping on all orders above ₹10,000. For orders below this amount, a nominal shipping fee is calculated at checkout based on your delivery pin code and volumetric weight of the product.
            </p>
          </div>
          <div className="bg-white p-8 border border-beige-dark/50">
            <FiClock className="text-sage mb-4" size={32} />
            <h3 className="font-serif text-xl font-semibold mb-3">White Glove Assembly</h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              For products requiring assembly (beds, wardrobes, dining sets), our expert carpenters will visit your home within 48-72 hours of product delivery to assemble your furniture free of cost.
            </p>
          </div>
          <div className="bg-white p-8 border border-beige-dark/50">
            <FiMapPin className="text-sage mb-4" size={32} />
            <h3 className="font-serif text-xl font-semibold mb-3">Track Your Order</h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Once your order is dispatched, you will receive an SMS and Email with the AWB (Tracking Number). You can easily track the live status of your shipment via our <a href="/track-order" className="text-sage font-semibold underline">Tracking Portal</a>.
            </p>
          </div>
        </div>

        <div className="bg-beige p-8">
          <h3 className="font-serif text-xl font-semibold mb-4">Important Delivery Guidelines</h3>
          <ul className="list-disc list-inside space-y-3 text-sm text-charcoal/70">
            <li>Ensure that the delivery address and contact number are accurate to avoid delays.</li>
            <li>For high-rise apartments, please check if your society allows service elevators for large furniture items.</li>
            <li>In case of delivery failure due to customer unavailability, redelivery charges may apply.</li>
            <li>At the time of delivery, please inspect the packaging. If you notice any external damage, mention it on the Proof of Delivery (POD) before signing.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
