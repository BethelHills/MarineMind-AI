export type MaintenanceTask = {
  id: string;
  equipment: string;
  equipmentId: string;
  type: string;
  priority: string;
  status: string;
  technician: string;
  date: string;
  time: string;
  estimatedTime: string;
  location: string;
  notes: string;
};

export const initialTasks: MaintenanceTask[] = [
  {
    id: "MT-1001",
    equipment: "Main Engine Alpha",
    equipmentId: "ME-01",
    type: "Inspection",
    priority: "High",
    status: "Scheduled",
    technician: "Engr. Bethel",
    date: "May 27, 2026",
    time: "09:30 AM",
    estimatedTime: "2 hrs",
    location: "Engine Room",
    notes: "Check cooling line, exhaust temperature, fuel injector, and vibration reading.",
  },
  {
    id: "MT-1002",
    equipment: "Cooling Pump Delta",
    equipmentId: "CP-04",
    type: "Repair",
    priority: "Critical",
    status: "Overdue",
    technician: "Team Alpha",
    date: "Today",
    time: "11:00 AM",
    estimatedTime: "3 hrs",
    location: "Engine Room",
    notes: "High vibration detected. Inspect bearing, alignment, coupling, and suction restriction.",
  },
  {
    id: "MT-1003",
    equipment: "Fuel Purifier Gamma",
    equipmentId: "FP-03",
    type: "Servicing",
    priority: "Medium",
    status: "Scheduled",
    technician: "Marine Ops",
    date: "May 29, 2026",
    time: "02:00 PM",
    estimatedTime: "1.5 hrs",
    location: "Fuel Room",
    notes: "Clean bowl, inspect seals, check sludge discharge, and verify purifier performance.",
  },
  {
    id: "MT-1004",
    equipment: "Aux Generator Beta",
    equipmentId: "AG-02",
    type: "Routine Check",
    priority: "Low",
    status: "Completed",
    technician: "Power Team",
    date: "May 22, 2026",
    time: "10:00 AM",
    estimatedTime: "1 hr",
    location: "Deck 2",
    notes: "Oil level checked, output voltage stable, no abnormal sound detected.",
  },
  {
    id: "MT-1005",
    equipment: "Bilge Water Pump",
    equipmentId: "BW-06",
    type: "Inspection",
    priority: "High",
    status: "In Progress",
    technician: "Safety Team",
    date: "Today",
    time: "01:30 PM",
    estimatedTime: "2 hrs",
    location: "Lower Deck",
    notes: "Reduced discharge pressure. Check strainer, impeller, and discharge valve.",
  },
  {
    id: "MT-1006",
    equipment: "Air Compressor Unit",
    equipmentId: "AC-05",
    type: "Calibration",
    priority: "Medium",
    status: "Scheduled",
    technician: "Deck Team",
    date: "Jun 05, 2026",
    time: "08:00 AM",
    estimatedTime: "1 hr",
    location: "Workshop Bay",
    notes: "Calibrate pressure switch and verify air receiver safety valve.",
  },
];

export const maintenanceStatusOptions = ["All", "Scheduled", "In Progress", "Completed", "Overdue"] as const;
export const maintenancePriorityOptions = ["All", "Low", "Medium", "High", "Critical"] as const;
export const maintenanceTypeOptions = [
  "All",
  "Inspection",
  "Repair",
  "Servicing",
  "Routine Check",
  "Calibration",
] as const;

export const maintenanceBoardColumns = ["Overdue", "In Progress", "Scheduled", "Completed"] as const;

export const maintenanceTimeline = [
  "Cooling Pump repair is overdue",
  "Bilge Pump inspection is in progress",
  "Generator routine check completed",
  "Fuel Purifier servicing scheduled",
];

export const equipmentSelectOptions = [
  "Main Engine Alpha",
  "Cooling Pump Delta",
  "Fuel Purifier Gamma",
  "Aux Generator Beta",
  "Bilge Water Pump",
  "Air Compressor Unit",
];

export const maintenanceChecklist = [
  "Confirm equipment is isolated safely",
  "Record readings before maintenance",
  "Inspect affected components",
  "Update report after completion",
];
