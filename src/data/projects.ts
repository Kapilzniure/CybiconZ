export const projects = [
  {
    slug: 'lwangblack',
    name: 'LwangBlack Coffee',
    sector: 'Coffee Brand',
    year: '2024',
    service: 'E-Commerce System',
    serviceColor: '#7C3AED',
    status: 'In Development',
    statusColor: '#7C3AED',
    outcome: 'Building a global e-commerce infrastructure with multi-country support, multi-currency checkout, and delivery integrations.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
    tags: ['E-Commerce', 'Multi-Country', 'Multi-Currency', 'Delivery Integration'],
    featured: true,

    situation: 'LwangBlack Coffee needed a digital infrastructure that could operate globally — not a basic online shop, but a full commercial system capable of handling different countries, currencies, and delivery partners from a single platform.',

    challenge: 'Building for multiple countries means more than just translating a website. It means country-specific pricing, currency conversion, different delivery partners per region, and an admin system that the team can actually manage without technical help.',

    approach: 'We are building the system in layers. The foundation is a mobile-first storefront designed for clarity — no confusion at checkout, no unnecessary steps. On top of that, we are building the multi-country configuration, payment gateway integration, and delivery partner hooks. An admin role system gives the LwangBlack team full control without needing a developer for every change.',

    inProgress: true,
    inProgressNote: 'This project is currently in active development. The architecture is complete and core features are being built and tested.',

    delivering: [
      'Global e-commerce storefront (mobile-first)',
      'Multi-country support with localized experiences',
      'Multi-currency pricing and checkout',
      'Country-based pricing configuration',
      'Multiple delivery partner integrations',
      'Role-based admin system',
      'Performance-optimized across all markets',
    ],
  },
  {
    slug: 'johnnies-liquor',
    name: 'Johnnies Liquor',
    sector: 'Liquor Retail',
    year: '2024',
    service: 'Website + Digital Marketing',
    serviceColor: '#7C3AED',
    status: 'In Progress',
    statusColor: '#7C3AED',
    outcome: 'Building consistent digital presence through website development and active social media management.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&q=80',
    tags: ['Website', 'Digital Marketing', 'Social Media', 'Brand Consistency'],
    featured: false,

    situation: 'Johnnies Liquor had an inconsistent online presence. No structured digital strategy, irregular social media, and a website that did not reflect the quality of the business.',

    challenge: 'For a retail business, digital presence is how people find you and decide whether to trust you before they walk in. Inconsistency — in posting, in branding, in the website — reads as unprofessional. The fix is not dramatic. It is consistent, structured, and on-brand.',

    approach: 'We built a clean, modern website that reflects the business properly. Alongside the site, we handle their social media — consistent posting, on-brand content, and a strategy focused on building a real audience rather than chasing vanity metrics.',

    inProgress: true,
    inProgressNote: 'Website is live. Digital marketing is ongoing — we manage their social media and digital presence actively.',

    delivering: [
      'Custom website — clean, modern, user-friendly',
      'Social media management and content creation',
      'Consistent brand voice across all platforms',
      'Digital marketing strategy',
      'Regular performance reviews',
    ],
  },
];

export type Project = typeof projects[number];
