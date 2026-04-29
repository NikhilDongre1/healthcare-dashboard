import React from 'react'
import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, Cell, LabelList,
} from 'recharts'
import { Card }         from '@/components/ui/Card'
import { CHART_COLORS } from '@/constants/app'
import type { AppointmentStatusData } from '@/types'
import type { TooltipContentProps } from 'recharts'

interface Props {
  data: AppointmentStatusData[]
}

const STATUS_COLORS: Record<string, string> = {
  Completed: CHART_COLORS.success,
  Scheduled: CHART_COLORS.primary,
  Cancelled: CHART_COLORS.error,
  'No Show': CHART_COLORS.warning,
}

const CustomTooltip: React.FC<Partial<TooltipContentProps<number, string>>> = ({
  active,
  payload,
}) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0].payload as AppointmentStatusData
  return (
    <div className="bg-surface border border-border rounded-lg shadow-card px-3 py-2 text-xs">
      <p className="font-semibold text-text-primary">{name}</p>
      <p className="text-text-secondary mt-0.5">
        <span className="font-medium text-text-primary">{value}%</span> of appointments
      </p>
    </div>
  )
}

export const AppointmentStatusChart: React.FC<Props> = ({ data }) => {
  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">
          Appointment Status Breakdown
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Distribution across all appointment outcomes
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: '#64748B' }}
            axisLine={false}
            tickLine={false}
            width={72}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={24}>
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v) => `${Number(v)}%`}
              style={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
            />
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={STATUS_COLORS[entry.name] ?? CHART_COLORS.primary}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
        {data.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: STATUS_COLORS[entry.name] }}
            />
            <span className="text-xs text-text-secondary">{entry.name}</span>
            <span className="text-xs font-semibold text-text-primary">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
