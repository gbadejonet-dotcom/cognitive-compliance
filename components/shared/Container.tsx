import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  size?: 'default' | 'narrow' | 'wide'
}

export function Container({
  children,
  className,
  as: Tag = 'div',
  size = 'default',
}: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-3xl',
    default: 'max-w-7xl',
    wide: 'max-w-screen-2xl',
  }

  return (
    <Tag className={cn('mx-auto px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </Tag>
  )
}
