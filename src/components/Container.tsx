import React from 'react'
import clsx from 'clsx'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={clsx('container mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
