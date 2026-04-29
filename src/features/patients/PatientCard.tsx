import React from 'react'
import { useNavigate }        from 'react-router-dom'
import { Phone, Mail, Calendar } from 'lucide-react'
import { Card }               from '@/components/ui/Card'
import { Badge }              from '@/components/ui/Badge'
import { Avatar }             from '@/components/ui/Avatar'
import { formatDate, statusColor } from '@/utils/helpers'
import { patientDetailPath }  from '@/constants/routes'
import type { Patient }       from '@/types'

interface Props {
  patient: Patient
}

export const PatientCard: React.FC<Props> = ({ patient }) => {
  const navigate = useNavigate()

  return (
    <Card
      hover
      padding="none"
      onClick={() => navigate(patientDetailPath(patient.id))}
      className="overflow-hidden flex flex-col"
    >
      <div className="h-14 bg-gradient-to-r from-primary to-accent relative shrink-0">
        <div className="absolute -bottom-5 left-4">
          <Avatar
            initials={patient.avatarInitials}
            size="lg"
            className="ring-2 ring-surface"
          />
        </div>
        <div className="absolute top-3 right-3">
          <Badge color={statusColor(patient.status)} dot size="sm">
            {patient.status}
          </Badge>
        </div>
      </div>
      <div className="pt-7 px-4 pb-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-sm font-semibold text-text-primary leading-tight">
            {patient.name}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            {patient.id} · {patient.age}y · {patient.gender} · {patient.bloodGroup}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Department</span>
            <span className="text-xs font-medium text-text-primary">
              {patient.department}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Doctor</span>
            <span className="text-xs font-medium text-text-primary truncate max-w-[120px]">
              {patient.doctor}
            </span>
          </div>
        </div>
        <div className="border-t border-border" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Phone size={11} className="shrink-0" />
            <span className="truncate">{patient.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Mail size={11} className="shrink-0" />
            <span className="truncate">{patient.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Calendar size={11} className="shrink-0" />
            <span>Last visit: {formatDate(patient.lastVisit)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}