import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#4fd1ff] text-[#020817] hover:bg-[#38bdf8] shadow-lg shadow-[#4fd1ff]/25',
        secondary: 'bg-elevated text-foreground border border-white/10 hover:border-primary/40 hover:bg-elevated/80',
        ghost: 'text-muted hover:text-foreground hover:bg-white/5',
        gold: 'bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20',
        outline: 'border border-white/20 bg-transparent hover:border-primary/50 hover:text-primary',
        light: 'bg-[#071224] text-white hover:bg-[#0a1630] shadow-md hover:shadow-lg hover:shadow-[#4fd1ff]/15',
        lightOutline:
          'border border-slate-300 bg-white text-slate-800 hover:border-[#4fd1ff]/50 hover:shadow-md hover:shadow-[#4fd1ff]/10',
      },
      size: {
        default: 'h-12 px-8',
        sm: 'h-10 px-5 text-xs',
        lg: 'h-14 px-10 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
