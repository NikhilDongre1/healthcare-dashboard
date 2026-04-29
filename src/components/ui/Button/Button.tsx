import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonAppearance = 'filled' | 'outlined'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  appearance?: ButtonAppearance
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const filledVariants: Record<ButtonVariant, string> = {
  primary:   'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark',
  secondary: 'bg-surface text-text-primary border border-border hover:bg-bg active:bg-bg',
  danger:    'bg-error text-white hover:bg-red-600 active:bg-red-700',
  ghost:     'bg-transparent text-text-secondary hover:bg-bg active:bg-border',
}

const outlinedVariants: Record<ButtonVariant, string> = {
  primary:   'bg-transparent text-primary border border-primary hover:bg-primary-light active:bg-primary-light',
  secondary: 'bg-transparent text-text-secondary border border-border hover:bg-bg',
  danger:    'bg-transparent text-error border border-error hover:bg-red-50 active:bg-red-50',
  ghost:     'bg-transparent text-text-secondary border border-transparent hover:bg-bg',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8  px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  appearance = 'filled',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...rest
}) => {
  const variantClasses =
    appearance === 'filled'
      ? filledVariants[variant]
      : outlinedVariants[variant]

  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded',
        'transition-default select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        variantClasses,
        sizes[size],
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  )
}
