export type HealthStatus = "Healthy" | "Warning" | "Critical";

export interface Equipment {
  id: string;
  name: string;
  code: string;
  status: HealthStatus;
  healthScore: number;
  operatingHours: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

export const equipment: Equipment[] = [
  { id: "ME-01", name: "Main Engine", code: "ME-01", status: "Healthy", healthScore: 91, operatingHours: 1245, lastMaintenance: "May 10, 2025", nextMaintenance: "May 27, 2025" },
  { id: "GEN-02", name: "Auxiliary Generator", code: "GEN-02", status: "Warning", healthScore: 74, operatingHours: 980, lastMaintenance: "May 8, 2025", nextMaintenance: "May 28, 2025" },
  { id: "FP-01", name: "Fuel Purifier", code: "FP-01", status: "Healthy", healthScore: 88, operatingHours: 612, lastMaintenance: "May 5, 2025", nextMaintenance: "May 30, 2025" },
  { id: "CP-02", name: "Cooling Pump", code: "CP-02", status: "Warning", healthScore: 69, operatingHours: 1432, lastMaintenance: "May 3, 2025", nextMaintenance: "May 31, 2025" },
  { id: "HP-01", name: "Hydraulic Pump", code: "HP-01", status: "Healthy", healthScore: 93, operatingHours: 540, lastMaintenance: "Apr 30, 2025", nextMaintenance: "Jun 2, 2025" },
  { id: "AC-01", name: "Air Compressor", code: "AC-01", status: "Healthy", healthScore: 90, operatingHours: 720, lastMaintenance: "Apr 28, 2025", nextMaintenance: "Jun 4, 2025" },
  { id: "FWG-01", name: "Fresh Water Generator", code: "FWG-01", status: "Critical", healthScore: 42, operatingHours: 1810, lastMaintenance: "Apr 20, 2025", nextMaintenance: "May 26, 2025" },
  { id: "SS-01", name: "Steering System", code: "SS-01", status: "Healthy", healthScore: 95, operatingHours: 410, lastMaintenance: "Apr 25, 2025", nextMaintenance: "Jun 6, 2025" },
];

export const upcomingMaintenance = [
  { equipment: "Main Engine (ME-01)", due: "Due in 2 days", level: "warning" as const },
  { equipment: "Auxiliary Generator (GEN-02)", due: "Due in 3 days", level: "warning" as const },
  { equipment: "Fuel Purifier (FP-01)", due: "Due in 5 days", level: "warning" as const },
  { equipment: "Cooling Pump (CP-02)", due: "Due in 6 days", level: "warning" as const },
];

export const maintenanceLog = [
  { equipment: "Main Engine (ME-01)", type: "Preventive", description: "Routine inspection oil change", date: "May 10, 2025", status: "Completed", technician: "John D." },
  { equipment: "Auxiliary Generator (GEN-02)", type: "Corrective", description: "Replaced air filter", date: "May 8, 2025", status: "Completed", technician: "Mike S." },
  { equipment: "Fuel Purifier (FP-01)", type: "Preventive", description: "Bowl cleaning", date: "May 5, 2025", status: "Completed", technician: "John D." },
  { equipment: "Cooling Pump (CP-02)", type: "Corrective", description: "Seal replacement", date: "May 3, 2025", status: "Completed", technician: "Mike S." },
  { equipment: "Hydraulic Pump (HP-01)", type: "Preventive", description: "Oil change", date: "Apr 30, 2025", status: "Completed", technician: "John D." },
  { equipment: "Air Compressor (AC-01)", type: "Preventive", description: "Inspection", date: "Apr 28, 2025", status: "Completed", technician: "Mike S." },
  { equipment: "Steering System (SS-01)", type: "Corrective", description: "Hydraulic leak fixed", date: "Apr 25, 2025", status: "Completed", technician: "John D." },
];

export const healthTrend = [
  { day: "May 18", value: 78 },
  { day: "May 19", value: 82 },
  { day: "May 20", value: 75 },
  { day: "May 21", value: 84 },
  { day: "May 22", value: 80 },
  { day: "May 23", value: 86 },
  { day: "May 24", value: 82 },
];

export const maintenanceSummary = [
  { day: "M", value: 3 }, { day: "T", value: 5 }, { day: "W", value: 2 },
  { day: "T", value: 4 }, { day: "F", value: 6 }, { day: "S", value: 1 }, { day: "S", value: 2 },
];

export const healthScoreTrend = [
  { m: "Jan", v: 70 }, { m: "Feb", v: 73 }, { m: "Mar", v: 76 },
  { m: "Apr", v: 78 }, { m: "May", v: 82 },
];

export const parameters = [
  { name: "Exhaust Temperature", value: "320 °C", status: "Normal" },
  { name: "Lubricating Oil Pressure", value: "4.2 bar", status: "Normal" },
  { name: "Coolant Temperature", value: "78 °C", status: "Normal" },
  { name: "Vibration Level", value: "2.1 mm/s", status: "Normal" },
];
