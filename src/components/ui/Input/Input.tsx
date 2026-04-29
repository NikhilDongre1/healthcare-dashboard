import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  id,
  ...rest
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-text-muted pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={[
            'w-full h-10 rounded border bg-surface text-text-primary text-sm',
            'placeholder:text-text-muted',
            'transition-default',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            error
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-border',
            disabled
              ? 'opacity-50 cursor-not-allowed bg-bg'
              : '',
            leftIcon  ? 'pl-9'  : 'pl-3',
            rightIcon ? 'pr-9' : 'pr-3',
            className,
          ].join(' ')}
          {...rest}
        />

        {rightIcon && (
          <span className="absolute right-3 text-text-muted">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-text-muted">{hint}</p>
      )}
    </div>
  )
}