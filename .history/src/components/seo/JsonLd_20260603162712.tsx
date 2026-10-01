export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CybiconZ',
    url: 'https://cybiconz.com',
    logo: 'https://cybiconz.com/cybiconz-logo.png',
    description: 'Tokyo-based digital agency building websites, e-commerce systems, and web applications.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tokyo',
      addressCountry: 'JP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@cybiconz.com',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    foundingDate: '2025',
    areaServed: 'Worldwide',
    serviceType: [
      'Website Development',
      'E-Commerce Development',
      'UI/UX Design',
      'Web Application Development',
      'Digital Marketing',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CybiconZ',
    url: 'https://cybiconz.com',
    description: 'Digital agency building websites, e-commerce systems, and applications that actually work.',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'Organization',
      name: 'CybiconZ',
      url: 'https://cybiconz.com',
    },
    name,
    description,
    url,
    areaServed: 'Worldwide',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
