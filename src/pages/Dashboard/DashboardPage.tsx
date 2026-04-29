import React from "react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/features/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import dashboardData from "@/data/dashboard.json";
import { usePatientStore } from "@/store/patientStore";
import { PageWrapper } from "@/components/ui/PageWrapper";

import {
  formatDate,
  statusColor,
  appointmentStatusColor,
} from "@/utils/helpers";
import { patientDetailPath } from "@/constants/routes";
import { ArrowRight } from "lucide-react";
import type { StatCard as StatCardType } from "@/types";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const patients = usePatientStore((s) => s.patients);

  const recentPatients = [...patients]
    .sort(
      (a, b) =>
        new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime(),
    )
    .slice(0, 5);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Welcome back. Here's what's happening today.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {(dashboardData.stats as StatCardType[]).map((stat) => (
            <StatCard key={stat.id} data={stat} />
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card padding="none" className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-text-primary">
                Recent Patients
              </h2>
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ArrowRight size={14} />}
                onClick={() => navigate("/patients")}
              >
                View all
              </Button>
            </div>

            <div className="divide-y divide-border">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => navigate(patientDetailPath(patient.id))}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-bg
                           transition-default cursor-pointer"
                >
                  <Avatar initials={patient.avatarInitials} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {patient.name}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {patient.department} · {patient.doctor}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge color={statusColor(patient.status)} dot size="sm">
                      {patient.status}
                    </Badge>
                    <span className="text-xs text-text-muted">
                      {formatDate(patient.lastVisit)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card padding="none" className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-text-primary">
                Today's Appointments
              </h2>
              <span className="text-xs text-text-muted">
                {dashboardData.todayAppointments.length} total
              </span>
            </div>

            <div className="divide-y divide-border overflow-y-auto max-h-80">
              {dashboardData.todayAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <div className="w-16 shrink-0 text-center">
                    <p className="text-xs font-semibold text-text-primary leading-tight">
                      {appt.time.split(" ")[0]}
                    </p>
                    <p className="text-[10px] text-text-muted">
                      {appt.time.split(" ")[1]}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-border shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {appt.patient}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {appt.department} · {appt.doctor}
                    </p>
                  </div>
                  <Badge color={appointmentStatusColor(appt.status)} size="sm">
                    {appt.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};
