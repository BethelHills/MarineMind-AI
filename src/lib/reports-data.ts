export type ReportItem = {
  id: string;
  title: string;
  equipment: string;
  category: string;
  engineer: string;
  status: string;
  type: string;
  date: string;
  summary: string;
  risk: string;
};

export const initialReports: ReportItem[] = [
  {
    id: "REP-1001",
    title: "Main Engine Temperature Report",
    equipment: "Main Engine Alpha",
    category: "Temperature",
    engineer: "Bethel Hillary",
    status: "Completed",
    type: "AI Generated",
    date: "May 31, 2026",
    summary:
      "Engine temperature increased after extended operation. Cooling flow and heat exchanger condition should be reviewed.",
    risk: "Medium-High",
  },
  {
    id: "REP-1002",
    title: "Cooling Pump Vibration Report",
    equipment: "Cooling Pump Delta",
    category: "Vibration",
    engineer: "Team Alpha",
    status: "Open",
    type: "Manual",
    date: "May 31, 2026",
    summary: "Abnormal pump vibration detected. Possible bearing wear, misalignment, or cavitation.",
    risk: "High",
  },
  {
    id: "REP-1003",
    title: "Fuel Purifier Service Summary",
    equipment: "Fuel Purifier Gamma",
    category: "Maintenance",
    engineer: "Marine Ops",
    status: "Completed",
    type: "AI Generated",
    date: "May 29, 2026",
    summary: "Purifier bowl inspection, seal checks, and sludge discharge review completed.",
    risk: "Low",
  },
  {
    id: "REP-1004",
    title: "Aux Generator Routine Check",
    equipment: "Aux Generator Beta",
    category: "Electrical",
    engineer: "Power Team",
    status: "Completed",
    type: "Manual",
    date: "May 27, 2026",
    summary: "Voltage output stable under load. No abnormal sound or overheating detected.",
    risk: "Low",
  },
  {
    id: "REP-1005",
    title: "Bilge Pump Pressure Report",
    equipment: "Bilge Water Pump",
    category: "Pressure",
    engineer: "Safety Team",
    status: "Open",
    type: "AI Generated",
    date: "May 26, 2026",
    summary:
      "Reduced discharge pressure may indicate strainer blockage, worn impeller, or air lock.",
    risk: "Medium",
  },
];

export const reportHealthData = [
  { day: "Mon", health: 78, reports: 4 },
  { day: "Tue", health: 82, reports: 6 },
  { day: "Wed", health: 76, reports: 5 },
  { day: "Thu", health: 84, reports: 8 },
  { day: "Fri", health: 80, reports: 7 },
  { day: "Sat", health: 86, reports: 5 },
  { day: "Sun", health: 82, reports: 9 },
];

export const reportFaultData = [
  { name: "Temperature", value: 35, color: "#0ea5e9" },
  { name: "Pressure", value: 22, color: "#14b8a6" },
  { name: "Vibration", value: 18, color: "#f59e0b" },
  { name: "Maintenance", value: 25, color: "#ef4444" },
];

export const reportEquipmentHealth = [
  { name: "Main Engine Alpha", value: 82 },
  { name: "Cooling Pump Delta", value: 54 },
  { name: "Fuel Purifier Gamma", value: 76 },
  { name: "Aux Generator Beta", value: 91 },
  { name: "Bilge Water Pump", value: 63 },
];

export const reportStatusOptions = ["All", "Open", "Completed", "Archived"] as const;
export const reportCategoryOptions = [
  "All",
  "Temperature",
  "Vibration",
  "Maintenance",
  "Electrical",
  "Pressure",
] as const;
export const reportTypeOptions = ["All", "AI Generated", "Manual"] as const;

export const reportChecklist = [
  "Review fault readings",
  "Confirm maintenance action",
  "Attach supporting documents",
  "Export final PDF",
];

export const reportExportOptions = [
  { title: "Export PDF Reports", icon: "FileText" as const },
  { title: "Export Excel Records", icon: "FileSpreadsheet" as const },
  { title: "Download Maintenance Logs", icon: "Download" as const },
  { title: "Export AI Reports", icon: "Sparkles" as const },
];

export const marineMindInsight =
  "Most recurring fault this week is cooling and vibration related. Schedule pump inspection and review main engine cooling performance.";
