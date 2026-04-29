import React from 'react'

interface ToggleProps {
  checked: boolean
  onChange: (value: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md'
}

const sizeConfig = {
  sm: {
    track:  'w-8 h-4',
    thumb:  'w-3 h-3',
    translate: 'translate-x-4',
  },
  md: {
    track:  'w-11 h-6',
    thumb:  'w-4 h-4',
    translate: 'translate-x-5',
  },
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
}) => {
  const { track, thumb, translate } = sizeConfig[size]

  return (
    <label
      className={`inline-flex items-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={[
            'rounded-full transition-default',
            track,
            checked ? 'bg-primary' : 'bg-border',
          ].join(' ')}
        />
        <div
          className={[
            'absolute top-1 left-1 bg-white rounded-full shadow transition-default',
            thumb,
            checked ? translate : 'translate-x-0',
          ].join(' ')}
        />
      </div>
      {label && (
        <span className="text-sm font-medium text-text-primary">{label}</span>
      )}
    </label>
  )
}