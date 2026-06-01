import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { formatPrice } from '../utils/formatPrice';

export default function OrderTrack() {
  const { orderId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/orders/track/${orderId}`).then((res) => setData(res.data)).catch(() => {});
  }, [orderId]);

  if (!data) {
    return <div className="flex min-h-[50vh] items-center justify-center">Loading order...</div>;
  }

  const { order, shipment } = data;

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <h1 className="section-heading mb-2">Order {order.orderId}</h1>
        <p className="text-charcoal/60 mb-8">Status: <strong>{order.status}</strong> | Payment: {order.paymentStatus}</p>

        <div className="bg-white p-6 shadow-sm space-y-4">
          <p>Total: {formatPrice(order.grandTotal)}</p>
          {shipment && (
            <>
              <p>Shipment: {shipment.shipmentId}</p>
              <p>Tracking: {shipment.trackingNumber || 'Pending'}</p>
              <p>Delivery: {shipment.deliveryStatus}</p>
              <p>Est. Delivery: {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
            </>
          )}
          <ul className="border-t pt-4">
            {order.items?.map((item) => (
              <li key={item.itemNo} className="flex justify-between py-2 text-sm">
                <span>{item.productName} × {item.quantity}</span>
                <span>{formatPrice(item.lineTotal)}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/account" className="btn-sage mt-8 inline-flex">MY ORDERS</Link>
      </div>
    </div>
  );
}
