import React from 'react'

import { cn } from '@/utilities/ui'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="PE Live Logo"
      width={120}
      height={60}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={cn('h-10 w-auto', className)}
      src="/logos/pelive.svg"
    />
  )
}
