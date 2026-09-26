import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@/components/layout/Layout'
import { CartProvider } from '@/context/CartContext'
import { useLenis } from '@/hooks/useLenis'
import { HomePage } from '@/pages/HomePage'

const ServicesPage = lazy(() => import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const ServiceDetailPage = lazy(() =>
  import('@/pages/ServicesPage').then((m) => ({ default: m.ServiceDetailPage }))
)
const BrandsPage = lazy(() => import('@/pages/BrandsPage').then((m) => ({ default: m.BrandsPage })))
const BrandDetailPage = lazy(() => import('@/pages/BrandsPage').then((m) => ({ default: m.BrandDetailPage })))
const BookingPage = lazy(() => import('@/pages/BookingPage').then((m) => ({ default: m.BookingPage })))
const PricingPage = lazy(() => import('@/pages/PricingPage').then((m) => ({ default: m.PricingPage })))
const LocationsPage = lazy(() => import('@/pages/LocationsPage').then((m) => ({ default: m.LocationsPage })))
const LocationDetailPage = lazy(() =>
  import('@/pages/LocationsPage').then((m) => ({ default: m.LocationDetailPage }))
)
const FaqPage = lazy(() => import('@/pages/FaqPage').then((m) => ({ default: m.FaqPage })))
const TestimonialsPage = lazy(() =>
  import('@/pages/TestimonialsPage').then((m) => ({ default: m.TestimonialsPage }))
)
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const TrackRepairPage = lazy(() => import('@/pages/TrackRepairPage').then((m) => ({ default: m.TrackRepairPage })))
const StorePage = lazy(() => import('@/pages/store/StorePage').then((m) => ({ default: m.StorePage })))
const ProductDetailPage = lazy(() =>
  import('@/pages/store/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
)
const CartPage = lazy(() => import('@/pages/store/CartPage').then((m) => ({ default: m.CartPage })))
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))

const queryClient = new QueryClient()

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

function AppContent() {
  useLenis()

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="brands" element={<BrandsPage />} />
          <Route path="brands/:slug" element={<BrandDetailPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="locations/:slug" element={<LocationDetailPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="track" element={<TrackRepairPage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="store/cart" element={<CartPage />} />
          <Route path="store/:id" element={<ProductDetailPage />} />
          <Route path="legal/:type" element={<LegalPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}
