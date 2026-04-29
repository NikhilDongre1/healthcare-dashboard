import React from 'react'
import {
  Users, CalendarCheck, BedDouble,
  AlertCircle, TrendingUp, TrendingDown,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { StatCard as StatCardType } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  Users:         <Users         size={20} />,
  CalendarCheck: <CalendarCheck size={20} />,
  BedDouble:     <BedDouble     size={20} />,
  AlertCircle:   <AlertCircle   size={20} />,
}

const colorMap: Record<string, string> = {
  primary: 'bg-primary-light  text-primary',
  accent:  'bg-sky-50         text-accent',
  warning: 'bg-amber-50       text-warning',
  error:   'bg-red-50         text-error',
  success: 'bg-emerald-50     text-success',
}

interface StatCardProps {
  data: StatCardType
}

export const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const isPositive = data.change >= 0

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-1">
            {data.label}
          </p>
          <p className="text-3xl font-bold text-text-primary">
            {data.value}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorMap[data.color]}`}>
          {iconMap[data.icon]}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${
            isPositive ? 'text-success' : 'text-error'
          }`}
        >
          {isPositive
            ? <TrendingUp  size={13} />
            : <TrendingDown size={13} />
          }
          {isPositive ? '+' : ''}{data.change}%
        </span>
        <span className="text-xs text-text-muted">{data.changeLabel}</span>
      </div>
    </Card>
  )
}