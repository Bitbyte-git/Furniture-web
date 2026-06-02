import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CategoryBar from '../components/CategoryBar';
import AboutSection from '../components/AboutSection';
// Removed unused ExpandingCollections import
import Newsletter from '../components/Newsletter';
import ScrollShowcaseSection from '../components/ScrollShowcaseSection';
import MarqueeTicker from '../components/MarqueeTicker';
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
      <MarqueeTicker />
      <ScrollShowcaseSection />
      <Newsletter />
    </>
  );
}
