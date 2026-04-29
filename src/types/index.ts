export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type PatientStatus = "Active" | "Inactive" | "Critical";
export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";
export type Gender = "Male" | "Female" | "Other";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  status: PatientStatus;
  department: string;
  doctor: string;
  lastVisit: string;
  nextAppointment: string;
  phone: string;
  email: string;
  address: string;
  diagnosis: string;
  avatarInitials: string;
}

export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color: "primary" | "success" | "warning" | "error" | "accent";
}

export interface MonthlyData {
  month: string;
  patients: number;
  appointments: number;
  revenue: number;
}

export interface DepartmentData {
  department: string;
  visits: number;
}

export interface AppointmentStatusData {
  name: string;
  value: number;
}

export type ViewMode = "grid" | "list";
