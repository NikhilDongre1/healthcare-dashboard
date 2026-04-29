import React, { useState, useMemo } from "react";
import { PatientVolumeChart } from "@/features/analytics/PatientVolumeChart";
import { RevenueChart } from "@/features/analytics/RevenueChart";
import { DepartmentChart } from "@/features/analytics/DepartmentChart";
import { Card } from "@/components/ui/Card";
import { DATE_RANGES } from "@/constants/app";
import { AppointmentStatusChart } from "@/features/analytics/AppointmentStatusChart";
import { formatCurrency, formatNumber } from "@/utils/helpers";
import analyticsData from "@/data/analytics.json";
import type {
  MonthlyData,
  DepartmentData,
  AppointmentStatusData,
} from "@/types";

const monthly = analyticsData.monthly as MonthlyData[];
const departments = analyticsData.departments as DepartmentData[];
const appointmentStatus =
  analyticsData.appointmentStatus as AppointmentStatusData[];

type RangeValue = "3m" | "6m" | "12m";

export const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState<RangeValue>("12m");
  const filteredMonthly = useMemo(() => {
    const selected = DATE_RANGES.find((r) => r.value === range);
    const months = selected?.months ?? 12;
    return monthly.slice(-months);
  }, [range]);

  const totals = useMemo(
    () => ({
      patients: filteredMonthly.reduce((acc, d) => acc + d.patients, 0),
      appointments: filteredMonthly.reduce((acc, d) => acc + d.appointments, 0),
      revenue: filteredMonthly.reduce((acc, d) => acc + d.revenue, 0),
    }),
    [filteredMonthly],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Analytics</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Performance insights and operational trends
          </p>
        </div>

        <div className="flex items-center gap-1 bg-bg border border-border rounded-lg p-1 self-start sm:self-auto">
          {DATE_RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value as RangeValue)}
              className={[
                "px-3 py-1.5 rounded-md text-xs font-medium transition-default",
                range === r.value
                  ? "bg-surface text-text-primary shadow-card"
                  : "text-text-muted hover:text-text-secondary",
              ].join(" ")}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Total Patients",
            value: formatNumber(totals.patients),
            sub: "Unique patients seen",
          },
          {
            label: "Total Appointments",
            value: formatNumber(totals.appointments),
            sub: "All appointment types",
          },
          {
            label: "Total Revenue",
            value: formatCurrency(totals.revenue),
            sub: "Gross billing revenue",
          },
        ].map((item) => (
          <Card key={item.label} className="flex flex-col gap-1">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              {item.label}
            </p>
            <p className="text-2xl font-bold text-text-primary">{item.value}</p>
            <p className="text-xs text-text-secondary">{item.sub}</p>
          </Card>
        ))}
      </div>

      <PatientVolumeChart data={filteredMonthly} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart data={filteredMonthly} />
        <AppointmentStatusChart data={appointmentStatus} />
      </div>

      <DepartmentChart data={departments} />
    </div>
  );
};
