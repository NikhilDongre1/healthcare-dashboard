import React    from 'react'
import { PatientRow } from './PatientRow'
import type { Patient } from '@/types'

interface Props {
  patients: Patient[]
}

export const PatientList: React.FC<Props> = ({ patients }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-bg">
            <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
              Patient
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide whitespace-nowrap">
              Age / Gender
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
              Blood
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">
              Department
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">
              Doctor
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide hidden sm:table-cell whitespace-nowrap">
              Last Visit
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
              Status
            </th>
            <th className="px-4 py-3 w-8" />
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <PatientRow key={patient.id} patient={patient} />
          ))}
        </tbody>
      </table>
    </div>
  )
}