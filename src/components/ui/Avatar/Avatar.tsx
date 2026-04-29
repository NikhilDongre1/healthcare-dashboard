import React from 'react'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string | null
  initials?: string
  size?: AvatarSize
  className?: string
}

const sizeMap: Record<AvatarSize, string> = {
  sm: 'w-7  h-7  text-xs',
  md: 'w-9  h-9  text-sm',
  lg: 'w-11 h-11 text-base',
  xl: 'w-14 h-14 text-lg',
}

const colorPalette = [
  'bg-blue-100   text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-violet-100 text-violet-700',
  'bg-orange-100 text-orange-700',
  'bg-pink-100   text-pink-700',
  'bg-teal-100   text-teal-700',
]

function getColorFromInitials(initials: string): string {
  const index = (initials.charCodeAt(0) || 0) % colorPalette.length
  return colorPalette[index]
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  initials = '?',
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false)
  const showFallback = !src || imgError

  return (
    <div
      className={[
        'rounded-full overflow-hidden flex items-center justify-center shrink-0 font-semibold',
        sizeMap[size],
        showFallback ? getColorFromInitials(initials) : '',
        className,
      ].join(' ')}
    >
      {showFallback ? (
        <span>{initials.slice(0, 2).toUpperCase()}</span>
      ) : (
        <img
          src={src}
          alt={initials}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  )
}
