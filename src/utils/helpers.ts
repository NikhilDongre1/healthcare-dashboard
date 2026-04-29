export function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function statusColor(
  status: string,
): "success" | "error" | "neutral" | "warning" {
  const map: Record<string, "success" | "error" | "neutral" | "warning"> = {
    Active: "success",
    Critical: "error",
    Inactive: "neutral",
  };
  return map[status] ?? "neutral";
}

export function appointmentStatusColor(
  status: string,
): "success" | "info" | "warning" | "error" | "neutral" {
  const map: Record<
    string,
    "success" | "info" | "warning" | "error" | "neutral"
  > = {
    Completed: "success",
    "In Progress": "info",
    Scheduled: "warning",
    Cancelled: "error",
  };
  return map[status] ?? "neutral";
}
