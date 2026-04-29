import React, { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/Spinner'

interface PageWrapperProps {
  children:  React.ReactNode
  loading?:  boolean
  className?: string
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  loading = false,
  className = '',
}) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={[
        'transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
