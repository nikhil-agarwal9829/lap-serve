import { useParams, Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'

const CONTENT: Record<string, { title: string; body: string }> = {
  privacy: {
    title: 'Privacy Policy',
    body: 'LapServe respects your privacy. We collect only information necessary to provide repair services and never sell your data to third parties.',
  },
  terms: {
    title: 'Terms of Service',
    body: 'By using LapServe services, you agree to our transparent pricing, doorstep repair terms, and warranty conditions outlined at booking.',
  },
  refund: {
    title: 'Refund Policy',
    body: 'Refunds are processed for cancelled bookings before engineer dispatch, or as per warranty claim resolution within 7 business days.',
  },
  warranty: {
    title: 'Warranty Policy',
    body: 'All eligible repairs include up to 1 year warranty on parts and labor. Coverage details are provided in writing upon repair completion.',
  },
}

export function LegalPage() {
  const { type } = useParams()
  const page = type ? CONTENT[type] : null

  if (!page) {
    return (
      <section className="section-gap section-dark pt-28 text-center">
        <p>Page not found</p>
        <Link to="/" className="text-primary">Home</Link>
      </section>
    )
  }

  return (
    <>
      <SEO title={page.title} description={page.body} path={`/legal/${type}`} />
      <section className="section-gap section-light pt-28">
        <div className="container-lapserve max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900">{page.title}</h1>
          <p className="mt-8 leading-relaxed text-slate-600">{page.body}</p>
        </div>
      </section>
    </>
  )
}
