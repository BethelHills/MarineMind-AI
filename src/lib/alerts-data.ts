export type AlertItem = {
  id: string;
  title: string;
  equipment: string;
  equipmentId: string;
  severity: string;
  status: string;
  category: string;
  location: string;
  time: string;
  date: string;
  message: string;
  recommendation: string;
};

export const initialAlerts: AlertItem[] = [
  {
    id: "AL-1001",
    title: "Cooling Pump vibration above safe limit",
    equipment: "Cooling Pump Delta",
    equipmentId: "CP-04",
    severity: "Critical",
    status: "Open",
    category: "Vibration",
    location: "Engine Room",
    time: "12 mins ago",
    date: "May 31, 2026",
    message:
      "Vibration readings are increasing and may indicate bearing wear, coupling misalignment, or cavitation.",
    recommendation:
      "Inspect bearings, check pump alignment, review suction pressure, and avoid continuous operation until checked.",
  },
  {
    id: "AL-1002",
    title: "Main Engine temperature trending high",
    equipment: "Main Engine Alpha",
    equipmentId: "ME-01",
    severity: "Warning",
    status: "Open",
    category: "Temperature",
    location: "Engine Room",
    time: "1 hour ago",
    date: "May 31, 2026",
    message:
      "Operating temperature is rising after long running hours. Cooling flow or load condition should be reviewed.",
    recommendation:
      "Check coolant level, cooling water pressure, heat exchanger condition, and engine load history.",
  },
  {
    id: "AL-1003",
    title: "Fuel Purifier service due soon",
    equipment: "Fuel Purifier Gamma",
    equipmentId: "FP-03",
    severity: "Warning",
    status: "Open",
    category: "Maintenance",
    location: "Fuel Room",
    time: "3 hours ago",
    date: "May 31, 2026",
    message: "Scheduled servicing is due within the next maintenance window.",
    recommendation:
      "Clean purifier bowl, inspect seals, verify sludge discharge, and check fuel temperature settings.",
  },
  {
    id: "AL-1004",
    title: "Aux Generator health score improved",
    equipment: "Aux Generator Beta",
    equipmentId: "AG-02",
    severity: "Info",
    status: "Resolved",
    category: "Health",
    location: "Deck 2",
    time: "Yesterday",
    date: "May 30, 2026",
    message: "Generator output and operating readings are stable after routine maintenance.",
    recommendation: "Continue normal monitoring and keep maintenance log updated.",
  },
  {
    id: "AL-1005",
    title: "Bilge Pump discharge pressure reduced",
    equipment: "Bilge Water Pump",
    equipmentId: "BW-06",
    severity: "Warning",
    status: "Open",
    category: "Pressure",
    location: "Lower Deck",
    time: "Yesterday",
    date: "May 30, 2026",
    message: "Discharge pressure is below expected operating range.",
    recommendation:
      "Check strainer, impeller, suction line, discharge valve, and possible air lock.",
  },
  {
    id: "AL-1006",
    title: "Air Compressor inspection completed",
    equipment: "Air Compressor Unit",
    equipmentId: "AC-05",
    severity: "Info",
    status: "Resolved",
    category: "Maintenance",
    location: "Workshop Bay",
    time: "May 29",
    date: "May 29, 2026",
    message: "Pressure switch and safety valve inspection completed successfully.",
    recommendation: "Next calibration should be scheduled based on running hours.",
  },
];

export const alertSeverityOptions = ["All", "Critical", "Warning", "Info"] as const;
export const alertStatusOptions = ["All", "Open", "Resolved", "Muted"] as const;
export const alertCategoryOptions = [
  "All",
  "Vibration",
  "Temperature",
  "Maintenance",
  "Health",
  "Pressure",
] as const;

export const alertIntelligenceSummary =
  "Cooling Pump Delta has the highest risk right now. Review vibration readings and create a maintenance task before extended operation.";

export const alertCategoryHighlights = [
  { title: "Temperature", text: "Main Engine temperature warning" },
  { title: "Pressure", text: "Bilge Pump discharge pressure low" },
  { title: "Maintenance", text: "Fuel Purifier service due" },
  { title: "Vibration", text: "Cooling Pump vibration critical" },
] as const;

export const alertResponseChecklist = [
  "Acknowledge alert in system",
  "Inspect equipment safely",
  "Record readings and findings",
  "Create maintenance task if required",
];
