import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, itemCount } = useCart();
  const items = cart.items || [];

  if (itemCount === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center bg-cream py-20">
        <p className="text-charcoal/60">Your cart is empty</p>
        <Link to="/shop" className="btn-sage mt-6">CONTINUE SHOPPING</Link>
      </div>
    );
  }

  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <h1 className="section-heading mb-10">Shopping Cart</h1>
        <div className="space-y-6">
          {items.map((item) => {
            const img = item.productId?.mainImage || item.productId?.images?.[0];
            const pid = item.productId?._id || item.productId;
            return (
              <div key={pid} className="flex gap-6 border-b border-charcoal/10 pb-6">
                <img src={img} alt="" className="h-24 w-24 object-cover bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.productName}</h3>
                  <p className="text-sm text-charcoal/60">{formatPrice(item.unitPrice)}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(pid, Number(e.target.value))}
                      className="w-16 border px-2 py-1 text-sm"
                    />
                    <button type="button" onClick={() => removeFromCart(pid)} className="text-xs text-red-600 hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-medium">{formatPrice(item.lineTotal)}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex items-center justify-between border-t pt-6">
          <p className="text-xl font-semibold">Total: {formatPrice(cart.cartTotal)}</p>
          <Link to="/checkout" className="btn-primary">CHECKOUT →</Link>
        </div>
      </div>
    </div>
  );
}
