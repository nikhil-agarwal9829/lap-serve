import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useSmoothScroll() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id.replace('#', ''))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return true
      }
      return false
    },
    []
  )

  const goTo = useCallback(
    (path: string) => {
      const [pathname, hash] = path.split('#')
      const targetPath = pathname || '/'
      const hashId = hash ? `#${hash}` : ''

      if (location.pathname === targetPath && hash) {
        setTimeout(() => scrollTo(hash), 100)
        return
      }

      navigate(`${targetPath}${hashId}`)
      if (hash) {
        setTimeout(() => scrollTo(hash), 400)
      }
    },
    [location.pathname, navigate, scrollTo]
  )

  return { scrollTo, goTo }
}
