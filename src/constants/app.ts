export const APP_NAME = 'HealthCore'

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Oncology',
  'Endocrinology',
  'Gastroenterology',
  'Pulmonology',
  'Dermatology',
  'Nephrology',
  'Geriatrics',
] as const

export const DATE_RANGES = [
  { label: 'Last 3 Months', value: '3m',  months: 3  },
  { label: 'Last 6 Months', value: '6m',  months: 6  },
  { label: 'This Year',     value: '12m', months: 12 },
] as const
export const CHART_COLORS = {
  primary:  '#2563EB',
  accent:   '#0EA5E9',
  success:  '#10B981',
  warning:  '#F59E0B',
  error:    '#EF4444',
  violet:   '#8B5CF6',
  pink:     '#EC4899',
  teal:     '#14B8A6',
  orange:   '#F97316',
  indigo:   '#6366F1',
} as const

export const DEPARTMENT_COLORS = [
  '#2563EB',
  '#0EA5E9',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
  '#6366F1',
  '#EF4444',
] as const