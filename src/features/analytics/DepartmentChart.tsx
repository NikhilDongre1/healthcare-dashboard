import React, { useState } from 'react'
import {
  ResponsiveContainer, PieChart, Pie,
  Cell, Tooltip, Sector,
} from 'recharts'
import { Card }              from '@/components/ui/Card'
import { DEPARTMENT_COLORS } from '@/constants/app'
import type { DepartmentData } from '@/types'
import type { PieSectorDataItem } from 'recharts/types/polar/Pie'

interface Props {
  data: DepartmentData[]
}

const InteractivePie = Pie as unknown as React.ComponentType<
  React.ComponentProps<typeof Pie> & {
    activeIndex?: number
    activeShape?: (props: PieSectorDataItem) => React.ReactElement | null
  }
>

const renderActiveShape = (props: PieSectorDataItem) => {
  const {
    cx, cy, innerRadius, outerRadius,
    startAngle, endAngle, fill,
    payload, percent = 0, value,
  } = props
  const department = (payload as DepartmentData | undefined)?.department ?? ''

  return (
    <g>
      <text
        x={cx} y={cy - 10}
        textAnchor="middle"
        fill="#0F172A"
        fontSize={14}
        fontWeight={600}
      >
        {department}
      </text>
      <text
        x={cx} y={cy + 14}
        textAnchor="middle"
        fill="#64748B"
        fontSize={12}
      >
        {value} visits · {(percent * 100).toFixed(1)}%
      </text>
      <Sector
        cx={cx} cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx} cy={cy}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 14}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

export const DepartmentChart: React.FC<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">
          Visits by Department
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Click a segment to highlight
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-full lg:w-1/2 shrink-0">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <InteractivePie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                dataKey="visits"
                nameKey="department"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]}
                  />
                ))}
              </InteractivePie>
              <Tooltip
                formatter={(value, name) => [
                  `${Number(value ?? 0)} visits`,
                  String(name),
                ]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-2 w-full lg:w-1/2">
          {data.map((entry, index) => (
            <div
              key={entry.department}
              className={[
                'flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-default',
                activeIndex === index ? 'bg-bg' : 'hover:bg-bg',
              ].join(' ')}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length],
                  }}
                />
                <span className="text-xs text-text-secondary truncate">
                  {entry.department}
                </span>
              </div>
              <span className="text-xs font-semibold text-text-primary shrink-0">
                {entry.visits}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
