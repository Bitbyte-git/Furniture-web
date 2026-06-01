import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const getSessionId = () => {
  let id = localStorage.getItem('sessionId');
  if (!id) {
    id = `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('sessionId', id);
  }
  return id;
};

const normalizeCart = (cart) => (cart?.items ? cart : { items: [], cartTotal: 0 });

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(normalizeCart(data.cart));
    } catch {
      setCart({ items: [], cartTotal: 0 });
    }
  }, []);

  useEffect(() => {
    getSessionId();
    fetchCart();
  }, [fetchCart, user]);

  const addToCart = async (productId, quantity = 1, options = {}) => {
    const { data } = await api.post('/cart/add', {
      productId,
      quantity,
      sessionId: getSessionId(),
      ...options,
    });
    setCart(normalizeCart(data.cart));
    return data.cart;
  };

  const updateQuantity = async (productId, quantity) => {
    const { data } = await api.put('/cart/update', { productId, quantity });
    setCart(normalizeCart(data.cart));
  };

  const removeFromCart = async (productId) => {
    const { data } = await api.delete(`/cart/remove/${productId}`);
    setCart(normalizeCart(data.cart));
  };

  const itemCount = cart.items?.reduce((s, i) => s + i.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, itemCount, addToCart, updateQuantity, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
