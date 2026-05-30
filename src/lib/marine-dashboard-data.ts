export const equipmentRows = [
  { name: "Main Engine ME-01", type: "Engine", location: "Engine Room", status: "Warning", health: 72, last: "May 21, 2026" },
  { name: "Aux Generator AG-02", type: "Generator", location: "Deck 2", status: "Healthy", health: 91, last: "May 18, 2026" },
  { name: "Cooling Pump CP-04", type: "Pump", location: "Engine Room", status: "Critical", health: 44, last: "May 10, 2026" },
  { name: "Fuel Purifier FP-03", type: "Purifier", location: "Fuel Room", status: "Due", health: 68, last: "May 12, 2026" },
];

export const maintenanceRows = [
  { equipment: "Main Engine ME-01", type: "Inspection", technician: "Engr. Bethel", date: "May 27", status: "Scheduled" },
  { equipment: "Cooling Pump CP-04", type: "Repair", technician: "Team Alpha", date: "Today", status: "Overdue" },
  { equipment: "Fuel Purifier FP-03", type: "Servicing", technician: "Marine Ops", date: "May 29", status: "Scheduled" },
  { equipment: "Aux Generator AG-02", type: "Routine Check", technician: "Deck Team", date: "May 22", status: "Completed" },
];

export const alertCards = [
  { title: "Cooling Pump vibration above normal", level: "Critical", time: "12 mins ago" },
  { title: "Main Engine inspection due soon", level: "Warning", time: "1 hour ago" },
  { title: "Fuel Purifier maintenance due", level: "Warning", time: "3 hours ago" },
  { title: "Generator health score improved", level: "Info", time: "Yesterday" },
];

export const chartData = [
  { day: "Mon", health: 78, alerts: 4 },
  { day: "Tue", health: 82, alerts: 3 },
  { day: "Wed", health: 76, alerts: 5 },
  { day: "Thu", health: 84, alerts: 2 },
  { day: "Fri", health: 80, alerts: 4 },
  { day: "Sat", health: 86, alerts: 2 },
  { day: "Sun", health: 82, alerts: 3 },
];

export const pieData = [
  { name: "Healthy", value: 55, color: "#14b8a6" },
  { name: "Warning", value: 30, color: "#f59e0b" },
  { name: "Critical", value: 15, color: "#ef4444" },
];

export const documentCards = [
  { title: "Main Engine Manual.pdf", type: "Manual", date: "May 12, 2026" },
  { title: "Monthly Inspection Report.docx", type: "Report", date: "May 20, 2026" },
  { title: "Generator Certificate.pdf", type: "Certificate", date: "May 05, 2026" },
];

export const aiHistory = ["Engine overheating", "Pump vibration", "Generator low output"];

export const aiSuggestedChecks = [
  "Check cooling water pressure",
  "Inspect fuel injector",
  "Review vibration readings",
  "Check bearing temperature",
];

export const reportCards = [
  "Maintenance Summary",
  "Equipment Health Report",
  "Monthly Alert Report",
];

export const settingsCards = [
  "Profile Settings",
  "Company Information",
  "Notification Rules",
  "AI Preferences",
];
