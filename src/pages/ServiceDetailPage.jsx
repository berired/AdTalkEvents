import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ServiceDetail from '../components/ServiceDetail'
import Seo from '../components/Seo'
import { breadcrumbList, serviceSchema } from '../lib/seoSchema'
import './ServiceDetailPage.css'
import servicesManifest from '../data/services-manifest.json'

// Content + images come from Contentful. Run `npm run fetch-services` after
// changing content in Contentful to regenerate src/assets/services-cms/ and
// src/data/services-manifest.json, then commit the result.
const serviceImageModules = import.meta.glob('../assets/services-cms/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
})

const imagesByFile = Object.fromEntries(
  Object.entries(serviceImageModules).map(([path, src]) => [path.split('/').pop(), src])
)

function resolveImages(files) {
  return (files || []).map((file) => imagesByFile[file]).filter(Boolean)
}

const servicesData = servicesManifest.map((service) => ({
  id: service.slug,
  title: service.title,
  description: service.description,
  images: resolveImages(service.images),
  subcategories: (service.subcategories || []).map((sub) => ({
    id: sub.slug,
    title: sub.title,
    description: sub.description,
    images: resolveImages(sub.images),
  })),
}))

function ServiceDetailPage() {
  const { id } = useParams()
  const service = servicesData.find(s => s.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!service) {
    return (
      <div className="loading-container">
        <Seo title="Service Not Found | AdTalk Events" description="The service you're looking for doesn't exist. Explore AdTalk's nationwide manpower, training, and brand activation services." />
        <h2>Service not found</h2>
        <p>The service you're looking for doesn't exist.</p>
      </div>
    )
  }

  const servicePath = `/services/${service.id}`

  return (
    <div className="service-detail-page">
      <Seo
        title={`${service.title} | AdTalk Events`}
        description={service.description}
        structuredData={[
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: servicePath },
          ]),
          serviceSchema({ name: service.title, description: service.description, path: servicePath }),
        ]}
      />
      <ServiceDetail service={service} />
    </div>
  )
}

export default ServiceDetailPage
