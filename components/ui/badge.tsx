import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blue-50 text-blue-700 border border-blue-100',
        secondary: 'bg-slate-100 text-slate-700 border border-slate-200',
        teal: 'bg-teal-50 text-teal-700 border border-teal-100',
        amber: 'bg-amber-50 text-amber-700 border border-amber-100',
        outline: 'border border-slate-300 text-slate-600',
        dark: 'bg-slate-800 text-slate-200 border border-slate-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
