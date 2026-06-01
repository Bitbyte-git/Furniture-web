import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CategoryBar from '../components/CategoryBar';
import AboutSection from '../components/AboutSection';
import BestSellers from '../components/BestSellers';
import PromoSection from '../components/PromoSection';
import Newsletter from '../components/Newsletter';
import api from '../api/axios';

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/products/categories').then((res) => setCategories(res.data.categories || [])).catch(() => {});
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryBar categories={categories} />
      <AboutSection />
      <BestSellers />
      <PromoSection />
      <Newsletter />
    </>
  );
}
