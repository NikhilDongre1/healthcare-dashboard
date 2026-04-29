import React from 'react'
import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts'
import { Card }         from '@/components/ui/Card'
import { CHART_COLORS } from '@/constants/app'
import { formatCurrency } from '@/utils/helpers'
import type { MonthlyData } from '@/types'
import type { TooltipContentProps } from 'recharts'

interface Props {
  data: MonthlyData[]
}

const CustomTooltip: React.FC<Partial<TooltipContentProps<number, string>>> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface border border-border rounded-lg shadow-card px-3 py-2.5 text-xs">
      <p className="font-semibold text-text-primary mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: CHART_COLORS.success }}
        />
        <span className="text-text-secondary">Revenue:</span>
        <span className="font-medium text-text-primary">
          {formatCurrency(Number(payload[0].value ?? 0))}
        </span>
      </div>
    </div>
  )
}

export const RevenueChart: React.FC<Props> = ({ data }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue))

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">
          Monthly Revenue
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Billing revenue for the selected period
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E2E8F0"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
          <Bar dataKey="revenue" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.revenue === maxRevenue
                    ? CHART_COLORS.primary
                    : CHART_COLORS.accent
                }
                fillOpacity={entry.revenue === maxRevenue ? 1 : 0.65}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
