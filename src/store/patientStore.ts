import { create } from "zustand";
import type { Patient, ViewMode } from "@/types";
import patientsData from "@/data/patients.json";

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  viewMode: ViewMode;
  searchQuery: string;
  statusFilter: string;
  departmentFilter: string;

  setSelectedPatient: (patient: Patient | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setDepartmentFilter: (dept: string) => void;
  getPatientById: (id: string) => Patient | undefined;
}

export const usePatientStore = create<PatientState>()((set, get) => ({
  patients: patientsData as Patient[],
  selectedPatient: null,
  viewMode: "grid",
  searchQuery: "",
  statusFilter: "All",
  departmentFilter: "All",

  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  setViewMode: (viewMode) => set({ viewMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setDepartmentFilter: (departmentFilter) => set({ departmentFilter }),

  getPatientById: (id) => get().patients.find((p) => p.id === id),
}));
