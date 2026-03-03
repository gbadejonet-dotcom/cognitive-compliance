import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <Badge
          variant={dark ? 'dark' : 'default'}
          className="mb-4"
        >
          {eyebrow}
        </Badge>
      )}
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight sm:text-4xl',
          dark ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            dark ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
