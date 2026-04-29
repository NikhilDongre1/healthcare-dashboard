import React        from 'react'
import { PatientCard } from './PatientCard'
import type { Patient } from '@/types'

interface Props {
  patients: Patient[]
}

export const PatientGrid: React.FC<Props> = ({ patients }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  )
}