import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Journal from './pages/Journal';
import Account from './pages/Account';
import OrderTrack from './pages/OrderTrack';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Warranty from './pages/Warranty';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';
import TrackOrderForm from './pages/TrackOrderForm';
import CategoryLanding from './pages/CategoryLanding';
import LivingRoom from './pages/LivingRoom';
import Bedroom from './pages/Bedroom';
import DiningRoom from './pages/DiningRoom';
import StoragePage from './pages/StoragePage';
import DecorPage from './pages/DecorPage';

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders/:orderId" element={<OrderTrack />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/track-order" element={<TrackOrderForm />} />
        <Route path="/collections/:slug" element={<CategoryLanding />} />
        {/* Category shortcut routes – redirect to /collections/:slug */}
        <Route path="/living-room" element={<LivingRoom />} />
        <Route path="/bedroom" element={<Bedroom />} />
        <Route path="/dining" element={<DiningRoom />} />
        <Route path="/storage" element={<StoragePage />} />
        <Route path="/decor" element={<DecorPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
