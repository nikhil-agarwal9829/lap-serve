import { Link, useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface ScrollLinkProps {
  to: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function ScrollLink({ to, className, children, onClick }: ScrollLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e: React.MouseEvent) => {
    onClick?.()
    const [path, hash] = to.split('#')
    const targetPath = path || '/'

    if (hash) {
      e.preventDefault()
      if (location.pathname !== targetPath) {
        navigate(`${targetPath}#${hash}`)
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (to.startsWith('http') || to.startsWith('tel:') || to.startsWith('mailto:')) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={cn(className)} onClick={handleClick}>
      {children}
    </Link>
  )
}
