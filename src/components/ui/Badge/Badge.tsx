import React from 'react'

type BadgeColor = 'success' | 'warning' | 'error' | 'info' | 'neutral'
type BadgeSize  = 'sm' | 'md'

interface BadgeProps {
  color?: BadgeColor
  size?: BadgeSize
  children: React.ReactNode
  dot?: boolean
}

const colorMap: Record<BadgeColor, string> = {
  success: 'bg-emerald-50  text-success  border border-emerald-200',
  warning: 'bg-amber-50    text-warning   border border-amber-200',
  error:   'bg-red-50      text-error     border border-red-200',
  info:    'bg-blue-50     text-primary   border border-blue-200',
  neutral: 'bg-bg          text-text-secondary border border-border',
}

const dotColorMap: Record<BadgeColor, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error:   'bg-error',
  info:    'bg-primary',
  neutral: 'bg-text-muted',
}

const sizeMap: Record<BadgeSize, string> = {
  sm: 'text-xs px-2   py-0.5',
  md: 'text-xs px-2.5 py-1',
}

export const Badge: React.FC<BadgeProps> = ({
  color = 'neutral',
  size = 'md',
  dot = false,
  children,
}) => {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        colorMap[color],
        sizeMap[size],
      ].join(' ')}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColorMap[color]}`}
        />
      )}
      {children}
    </span>
  )
}