import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${isHome ? '' : 'pt-[72px]'}`}>{children}</main>
      <Footer />
    </div>
  );
}
