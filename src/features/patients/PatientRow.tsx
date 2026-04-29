import React from 'react'
import { useNavigate }             from 'react-router-dom'
import { ChevronRight }            from 'lucide-react'
import { Avatar }                  from '@/components/ui/Avatar'
import { Badge }                   from '@/components/ui/Badge'
import { formatDate, statusColor } from '@/utils/helpers'
import { patientDetailPath }       from '@/constants/routes'
import type { Patient }            from '@/types'

interface Props {
  patient: Patient
}

export const PatientRow: React.FC<Props> = ({ patient }) => {
  const navigate = useNavigate()

  return (
    <tr
      onClick={() => navigate(patientDetailPath(patient.id))}
      className="border-b border-border hover:bg-bg transition-default cursor-pointer group"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar initials={patient.avatarInitials} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {patient.name}
            </p>
            <p className="text-xs text-text-muted">{patient.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap">
        {patient.age}y · {patient.gender}
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary">
        {patient.bloodGroup}
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap hidden md:table-cell">
        {patient.department}
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap hidden lg:table-cell">
        {patient.doctor}
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap hidden sm:table-cell">
        {formatDate(patient.lastVisit)}
      </td>
      <td className="px-4 py-3">
        <Badge color={statusColor(patient.status)} dot size="sm">
          {patient.status}
        </Badge>
      </td>
      <td className="px-4 py-3 text-text-muted">
        <ChevronRight
          size={16}
          className="group-hover:text-primary transition-default"
        />
      </td>
    </tr>
  )
}