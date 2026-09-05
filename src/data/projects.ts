export const projects = [
  {
    slug: 'johnnies-liquor',
    name: 'Johnnies Liquor',
    sector: 'Liquor Retail',
    year: '2026',
    service: 'Website + Digital Marketing',
    serviceColor: '#4F46E5',
    status: 'In Progress',
    statusColor: '#4F46E5',
    outcome: 'Building consistent digital presence through website development and active social media management.',
    image: '/johnnies-website.png',
    logo: '/johnnies-logo.jpg',
    gallery: ['/johnnies-website.png'],
    tags: ['Website', 'Digital Marketing', 'Social Media', 'Brand Consistency'],
    featured: true,

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

