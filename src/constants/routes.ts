export const ROUTES = {
  LOGIN:          '/login',
  DASHBOARD:      '/dashboard',
  ANALYTICS:      '/analytics',
  PATIENTS:       '/patients',
  PATIENT_DETAIL: '/patients/:id',
  NOT_FOUND:      '*',
} as const
export const patientDetailPath = (id: string) => `/patients/${id}`