const posts = [
  { title: 'Japandi Style: Where East Meets North', category: 'Trends', date: 'May 2026' },
  { title: 'Caring for Solid Wood Furniture', category: 'Care', date: 'April 2026' },
  { title: '5 Tips for Small Space Living', category: 'Tips', date: 'March 2026' },
];

export default function Journal() {
  return (
    <div className="bg-cream py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <h1 className="section-heading mb-10">Journal</h1>
        <div className="space-y-8">
          {posts.map((p) => (
            <article key={p.title} className="border-b border-charcoal/10 pb-8">
              <p className="text-xs tracking-widest text-sage">{p.category} · {p.date}</p>
              <h2 className="mt-2 font-serif text-2xl hover:text-sage cursor-pointer">{p.title}</h2>
              <p className="mt-2 text-sm text-charcoal/60">Read more →</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
