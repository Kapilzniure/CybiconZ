export const projects = [
  {
    slug: 'lwangblack',
    name: 'LwangBlack Coffee',
    sector: 'Coffee Brand',
    year: '2024',
    service: 'E-Commerce',
    serviceTag: 'e-commerce',
    outcome: 'Global e-commerce infrastructure with multi-country storefronts, multi-currency checkout, and delivery integrations.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
    tags: ['React', 'Node.js', 'Stripe', 'Multi-Currency'],
    featured: true,
    // TODO: Replace with real situation
    situation: 'LwangBlack needed a global storefront capable of accepting orders across regions with proper currency handling and reliable delivery integrations.',
    // TODO: Replace with real approach
    approach: 'We designed a single brand system, then built a custom storefront with regional routing, Stripe multi-currency, and pluggable delivery providers.',
    delivered: ['Global e-commerce storefront', 'Multi-country support', 'Multi-currency checkout', 'Delivery integrations', 'Brand design system'],
  },
  {
    slug: 'johnnies-liquor',
    name: 'Johnnies Liquor',
    sector: 'Liquor Retail',
    year: '2024',
    service: 'Website + Marketing',
    serviceTag: 'website',
    outcome: 'Complete digital presence with website development and social media growth strategy.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1200&q=80',
    tags: ['Website', 'Digital Marketing', 'Social Media'],
    featured: false,
    // TODO: Replace with real situation
    situation: 'Johnnies needed a credible online presence and a marketing engine to support in-store traffic and direct customer relationships.',
    // TODO: Replace with real approach
    approach: 'Site rebuild focused on conversion, paired with a content calendar and reporting cadence the owner could actually read.',
    delivered: ['Custom website', 'Social media strategy', 'Online presence growth'],
  },
];
export type Project = typeof projects[number];
