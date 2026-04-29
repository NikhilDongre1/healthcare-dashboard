import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Droplet,
  User,
  Stethoscope,
  Calendar,
  AlertCircle,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { usePatientStore } from "@/store/patientStore";
import { formatDate, statusColor } from "@/utils/helpers";
import { useNotification } from "@/hooks/useNotification";
import { Bell } from "lucide-react";

const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 text-text-muted shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-xs text-text-muted mb-0.5">{label}</p>
      <p className="text-sm font-medium text-text-primary break-words">
        {value}
      </p>
    </div>
  </div>
);

const APPOINTMENT_HISTORY = [
  { label: "Completed", date: "lastVisit", status: "Completed" },
  { label: "Upcoming", date: "nextAppointment", status: "Scheduled" },
];

const appointmentStatusColor = (
  s: string,
): "success" | "warning" | "error" | "info" | "neutral" => {
  const map: Record<
    string,
    "success" | "warning" | "error" | "info" | "neutral"
  > = {
    Completed: "success",
    Scheduled: "warning",
    Cancelled: "error",
  };
  return map[s] ?? "neutral";
};

export const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getById = usePatientStore((s) => s.getPatientById);
  const patient = getById(id ?? "");

  const { trigger, permission, requestPermission } = useNotification();
  const [reminded, setReminded] = React.useState(false);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <AlertCircle size={40} className="text-text-muted" />
        <p className="text-base font-semibold text-text-primary">
          Patient not found
        </p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    );
  }

  const handleRemind = async () => {
    if (permission !== "granted") {
      await requestPermission();
    }
    await trigger({
      title: "Appointment Reminder",
      body: `${patient.name}'s next appointment is on ${formatDate(patient.nextAppointment)} with ${patient.doctor}.`,
      tag: `reminder-${patient.id}`,
      type: "info",
      inApp: true,
    });
    setReminded(true);
    setTimeout(() => setReminded(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft size={15} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
      <Card padding="none" className="overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-primary to-accent" />

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-8 mb-5">
            <Avatar
              initials={patient.avatarInitials}
              size="xl"
              className="ring-4 ring-surface"
            />
            <div className="flex items-center gap-3 flex-wrap">
              <Badge color={statusColor(patient.status)} dot>
                {patient.status}
              </Badge>
              <span className="text-xs text-text-muted font-medium bg-bg px-2.5 py-1 rounded-full border border-border">
                {patient.id}
              </span>
              <Button
                size="sm"
                variant={reminded ? "secondary" : "primary"}
                appearance="outlined"
                leftIcon={<Bell size={13} />}
                onClick={handleRemind}
              >
                {reminded ? "Reminder set!" : "Remind me"}
              </Button>
            </div>
          </div>
          <h1 className="text-xl font-bold text-text-primary">
            {patient.name}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            {patient.age} years old · {patient.gender} · Blood group:{" "}
            {patient.bloodGroup}
          </p>
          <div className="mt-3 flex items-start gap-2 p-3 bg-bg rounded-lg border border-border">
            <AlertCircle size={15} className="text-warning mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-text-muted mb-0.5">
                Current Diagnosis
              </p>
              <p className="text-sm text-text-primary">{patient.diagnosis}</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-text-primary pb-2 border-b border-border">
            Personal Information
          </h2>
          <InfoRow
            icon={<User size={15} />}
            label="Full Name"
            value={patient.name}
          />
          <InfoRow
            icon={<Droplet size={15} />}
            label="Blood Group"
            value={patient.bloodGroup}
          />
          <InfoRow
            icon={<Phone size={15} />}
            label="Phone"
            value={patient.phone}
          />
          <InfoRow
            icon={<Mail size={15} />}
            label="Email"
            value={patient.email}
          />
          <InfoRow
            icon={<MapPin size={15} />}
            label="Address"
            value={patient.address}
          />
        </Card>
        <Card className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-text-primary pb-2 border-b border-border">
            Clinical Information
          </h2>
          <InfoRow
            icon={<Building2 size={15} />}
            label="Department"
            value={patient.department}
          />
          <InfoRow
            icon={<Stethoscope size={15} />}
            label="Assigned Doctor"
            value={patient.doctor}
          />
          <InfoRow
            icon={<AlertCircle size={15} />}
            label="Diagnosis"
            value={patient.diagnosis}
          />
          <InfoRow
            icon={<Calendar size={15} />}
            label="Last Visit"
            value={formatDate(patient.lastVisit)}
          />
          <InfoRow
            icon={<Calendar size={15} />}
            label="Next Appointment"
            value={formatDate(patient.nextAppointment)}
          />
        </Card>
      </div>
      <Card padding="none" className="overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">
            Appointment History
          </h2>
        </div>
        <div className="divide-y divide-border">
          {APPOINTMENT_HISTORY.map((appt) => {
            const dateValue =
              appt.date === "lastVisit"
                ? patient.lastVisit
                : patient.nextAppointment;

            return (
              <div
                key={appt.label}
                className="flex items-center justify-between px-5 py-4 gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "w-2.5 h-2.5 rounded-full shrink-0",
                      appt.status === "Completed" ? "bg-success" : "bg-warning",
                    ].join(" ")}
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {patient.department} Consultation
                    </p>
                    <p className="text-xs text-text-muted">{patient.doctor}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <Badge
                    color={appointmentStatusColor(appt.status)}
                    size="sm"
                    dot
                  >
                    {appt.status}
                  </Badge>
                  <span className="text-xs text-text-muted">
                    {formatDate(dateValue)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
