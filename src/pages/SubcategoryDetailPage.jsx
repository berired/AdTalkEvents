import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Seo from '../components/Seo'
import { breadcrumbList, serviceSchema } from '../lib/seoSchema'
import './SubcategoryDetailPage.css'
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

function SubcategoryDetailPage() {
  const { serviceId, subcategoryId } = useParams()
  const navigate = useNavigate()

  const service = servicesManifest.find((s) => s.slug === serviceId)
  const subcategoryEntry = service?.subcategories?.find((sub) => sub.slug === subcategoryId)
  const subcategory = subcategoryEntry && {
    title: subcategoryEntry.title,
    description: subcategoryEntry.description,
    images: (subcategoryEntry.images || []).map((file) => imagesByFile[file]).filter(Boolean),
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [serviceId, subcategoryId])

  const handleBackClick = () => {
    navigate(`/services/${serviceId}`)
  }

  if (!subcategory) {
    return (
      <div className="loading-container">
        <Seo title="Subcategory Not Found | AdTalk Events" description="The subcategory you're looking for doesn't exist. Explore AdTalk's nationwide manpower, training, and brand activation services." />
        <h2>Subcategory not found</h2>
        <p>The subcategory you're looking for doesn't exist.</p>
        <button onClick={handleBackClick} className="back-btn">Back to Service</button>
      </div>
    )
  }

  const subcategoryPath = `/services/${serviceId}/subcategory/${subcategoryId}`

  return (
    <div className="subcategory-detail-page">
      <Seo
        title={`${subcategory.title} | AdTalk Events`}
        description={subcategory.description}
        structuredData={[
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: subcategory.title, path: subcategoryPath },
          ]),
          serviceSchema({ name: subcategory.title, description: subcategory.description, path: subcategoryPath }),
        ]}
      />
      <div className="subcategory-detail-container">
        <div className="subcategory-detail-header">
          <button onClick={handleBackClick} className="back-btn">
            ← Back to Service
          </button>
          <h1 className="subcategory-detail-title">{subcategory.title}</h1>
        </div>

        <div className="subcategory-images-grid">
          {subcategory.images.map((src, idx) => (
            <div
              key={idx}
              className={`subcategory-image-item subcategory-image-${idx + 1}${idx === 2 ? ' landscape-image' : ''}`}
            >
              <img src={src} alt={`${subcategory.title} - Image ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="subcategory-detail-content">
          <h2>About This Service</h2>
          <p className="subcategory-detail-description">{subcategory.description}</p>
        </div>
      </div>
    </div>
  )
}

export default SubcategoryDetailPage
