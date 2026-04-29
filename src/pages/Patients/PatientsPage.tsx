import React, { useMemo } from "react";
import { LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import { PatientGrid } from "@/features/patients/PatientGrid";
import { PatientList } from "@/features/patients/PatientList";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { usePatientStore } from "@/store/patientStore";
import { DEPARTMENTS } from "@/constants/app";

const STATUS_OPTIONS = ["All", "Active", "Inactive", "Critical"] as const;
const DEPT_OPTIONS = ["All", ...DEPARTMENTS] as const;

export const PatientsPage: React.FC = () => {
  const patients = usePatientStore((s) => s.patients);
  const viewMode = usePatientStore((s) => s.viewMode);
  const searchQuery = usePatientStore((s) => s.searchQuery);
  const statusFilter = usePatientStore((s) => s.statusFilter);
  const departmentFilter = usePatientStore((s) => s.departmentFilter);
  const setViewMode = usePatientStore((s) => s.setViewMode);
  const setSearchQuery = usePatientStore((s) => s.setSearchQuery);
  const setStatusFilter = usePatientStore((s) => s.setStatusFilter);
  const setDepartmentFilter = usePatientStore((s) => s.setDepartmentFilter);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "All" || p.status === statusFilter;

      const matchDept =
        departmentFilter === "All" || p.department === departmentFilter;

      return matchSearch && matchStatus && matchDept;
    });
  }, [patients, searchQuery, statusFilter, departmentFilter]);

  const activeFilterCount = [
    statusFilter !== "All",
    departmentFilter !== "All",
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Patients</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            {filtered.length} of {patients.length} patients
          </p>
        </div>
        <div className="flex items-center gap-1 bg-bg border border-border rounded-lg p-1 self-start sm:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={[
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-default",
              viewMode === "grid"
                ? "bg-surface text-text-primary shadow-card"
                : "text-text-muted hover:text-text-secondary",
            ].join(" ")}
            aria-label="Grid view"
          >
            <LayoutGrid size={14} /> Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={[
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-default",
              viewMode === "list"
                ? "bg-surface text-text-primary shadow-card"
                : "text-text-muted hover:text-text-secondary",
            ].join(" ")}
            aria-label="List view"
          >
            <List size={14} /> List
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by name, ID, doctor or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={15} />}
            fullWidth
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-text-muted shrink-0">
            <SlidersHorizontal size={13} /> Status:
          </span>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={[
                "px-2.5 py-1 rounded-full text-xs font-medium border transition-default",
                statusFilter === s
                  ? "bg-primary text-white border-primary"
                  : "bg-surface text-text-secondary border-border hover:border-primary hover:text-primary",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1">
        <span className="text-xs text-text-muted shrink-0">Dept:</span>
        {DEPT_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => setDepartmentFilter(d)}
            className={[
              "px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap transition-default shrink-0",
              departmentFilter === d
                ? "bg-primary text-white border-primary"
                : "bg-surface text-text-secondary border-border hover:border-primary hover:text-primary",
            ].join(" ")}
          >
            {d}
          </button>
        ))}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Active filters:</span>
          {statusFilter !== "All" && (
            <Badge color="info" size="sm">
              Status: {statusFilter}
            </Badge>
          )}
          {departmentFilter !== "All" && (
            <Badge color="info" size="sm">
              Dept: {departmentFilter}
            </Badge>
          )}
          <button
            onClick={() => {
              setStatusFilter("All");
              setDepartmentFilter("All");
              setSearchQuery("");
            }}
            className="text-xs text-error hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-full bg-bg flex items-center justify-center">
            <Search size={24} className="text-text-muted" />
          </div>
          <p className="text-sm font-medium text-text-primary">
            No patients found
          </p>
          <p className="text-xs text-text-muted">
            Try adjusting your search or filters
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <PatientGrid patients={filtered} />
      ) : (
        <PatientList patients={filtered} />
      )}
    </div>
  );
};
