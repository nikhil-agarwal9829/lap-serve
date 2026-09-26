import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useMagnetic } from '@/hooks/useMagnetic'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends ButtonProps {
  to?: string
  href?: string
}

export function MagneticButton({ to, href, className, children, onClick, ...props }: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.25)
  const navigate = useNavigate()
  const location = useLocation()

  const classes = cn('btn-ripple transition-transform duration-200 ease-out', className)

  const handleHashClick = (e: React.MouseEvent, path: string) => {
    const [pathname, hash] = path.split('#')
    const target = pathname || '/'
    if (!hash) return

    e.preventDefault()
    onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>)

    if (location.pathname !== target) {
      navigate(`${target}#${hash}`)
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 400)
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (to?.includes('#')) {
    return (
      <Button
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={classes}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={(e) => handleHashClick(e, to)}
        {...props}
      >
        {children}
      </Button>
    )
  }

  if (to) {
    return (
      <Link to={to} className="inline-block" onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}>
        <Button
          ref={ref as React.RefObject<HTMLButtonElement>}
          className={classes}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          {...props}
        >
          {children}
        </Button>
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block" onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}>
        <Button
          ref={ref as React.RefObject<HTMLButtonElement>}
          className={classes}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          {...props}
        >
          {children}
        </Button>
      </a>
    )
  }

  return (
    <Button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={classes}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  )
}
