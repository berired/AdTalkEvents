const BUSINESS_NAME = 'AdTalk Event Solutions Inc.'
const SITE_URL = 'https://adtalk.com.ph'

export function breadcrumbList(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${window.location.origin}${item.path}`,
    })),
  }
}

export function serviceSchema({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${window.location.origin}${path}`,
    provider: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: `${SITE_URL}/`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Philippines',
    },
  }
}
