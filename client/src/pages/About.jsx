import AboutSection from '../components/AboutSection';

export default function About() {
  return (
    <>
      <div className="bg-beige py-20 text-center">
        <h1 className="section-heading">About NESTORA</h1>
        <p className="mx-auto mt-4 max-w-2xl text-charcoal/70">
          Crafting digital spaces for beautiful homes since 2014. Our mission is to bring Japandi-inspired
          furniture that balances form, function, and sustainability.
        </p>
      </div>
      <AboutSection />
    </>
  );
}
