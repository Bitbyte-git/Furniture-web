import { Link } from 'react-router-dom';

const MENU_DATA = {
  SHOP: [
    { title: 'New Arrivals', items: ['Oasis Collection','Terra Collection','Astra Collection','Dawn Collection'] },
    { title: 'Living', items: ['Sofas','Coffee Tables','TV Units','Recliners'] },
    { title: 'Bedroom', items: ['Beds','Mattresses','Wardrobes','Bedside Tables'] },
    { title: 'Dining', items: ['Dining Tables','Dining Chairs','Sideboards'] },
    { title: 'Storage', items: ['Wardrobes','Dressers','Shelving'] },
  ],
  COLLECTIONS: [
    { title: 'By Room', items: ['Living Room','Bedroom','Dining Room','Office'] },
    { title: 'By Style', items: ['Contemporary','Classic','Japandi','Modern'] },
    { title: 'Materials', items: ['Solid Wood','Upholstery','Metal & Glass'] },
  ],
  ABOUT: [
    { title: 'Company', items: ['Our Story','Craftsmanship','Sustainability'] },
    { title: 'Visit', items: ['Showroom','Careers','Press'] },
  ],
  JOURNAL: [
    { title: 'Inspiration', items: ['Room Ideas','Trends','Guides'] },
  ],
  CONTACT: [
    { title: 'Customer Care', items: ['Contact Us','FAQ','Warranty'] },
  ],
};

export default function MegaMenu({ keyLabel }) {
  const columns = MENU_DATA[keyLabel] || MENU_DATA.SHOP;

  return (
      <div className="mx-auto w-full rounded-b-lg bg-white shadow-lg ring-1 ring-black/5">
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-6">
          {columns.map((col, i) => (
            <div key={i} className="min-w-[140px]">
              <div className="text-sm font-semibold text-charcoal mb-3">{col.title}</div>
              <ul className="space-y-2 text-sm text-charcoal/70">
                {col.items.map((it) => {
                  // If it's a direct service link (from ABOUT, CONTACT, etc) keep it as is if it starts with /
                  // Actually in MegaMenu, ABOUT items are like "Our Story", CONTACT items are "Contact Us"
                  // Let's create a helper link generator to avoid breaking service links.
                  let linkTo = `/collections/${it.toLowerCase().replace(/\s+/g, '-')}`;
                  if (it === 'Contact Us') linkTo = '/contact';
                  if (it === 'FAQ') linkTo = '/faq';
                  if (it === 'Warranty') linkTo = '/warranty';
                  if (it === 'Showroom') linkTo = '/about';
                  if (it === 'Careers') linkTo = '/about';
                  if (it === 'Our Story' || it === 'Craftsmanship' || it === 'Sustainability') linkTo = '/about';
                  
                  return (
                    <li key={it}>
                      <Link to={linkTo} className="hover:text-sage transition-colors">{it}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="col-span-2 hidden md:block">
            <div className="h-36 w-full overflow-hidden rounded-md bg-gray-100">
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80" alt="showcase" className="h-full w-full object-cover" />
            </div>
            <p className="mt-3 text-sm text-charcoal/60">Explore curated collections and handcrafted pieces in our showroom.</p>
          </div>
        </div>
      </div>
  );
}
