export type EquipmentItem = {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  health: number;
  runningHours: string;
  lastMaintenance: string;
  nextMaintenance: string;
  assignedTo: string;
  issue: string;
};

export const initialEquipment: EquipmentItem[] = [
  {
    id: "ME-01",
    name: "Main Engine Alpha",
    type: "Engine",
    location: "Engine Room",
    status: "Warning",
    health: 72,
    runningHours: "4,820 hrs",
    lastMaintenance: "May 21, 2026",
    nextMaintenance: "May 27, 2026",
    assignedTo: "Engr. Bethel",
    issue: "Temperature rising after long operation",
  },
  {
    id: "AG-02",
    name: "Aux Generator Beta",
    type: "Generator",
    location: "Deck 2",
    status: "Healthy",
    health: 91,
    runningHours: "2,310 hrs",
    lastMaintenance: "May 18, 2026",
    nextMaintenance: "Jun 02, 2026",
    assignedTo: "Power Team",
    issue: "No active fault",
  },
  {
    id: "CP-04",
    name: "Cooling Pump Delta",
    type: "Pump",
    location: "Engine Room",
    status: "Critical",
    health: 44,
    runningHours: "6,110 hrs",
    lastMaintenance: "May 10, 2026",
    nextMaintenance: "Today",
    assignedTo: "Team Alpha",
    issue: "High vibration detected",
  },
  {
    id: "FP-03",
    name: "Fuel Purifier Gamma",
    type: "Purifier",
    location: "Fuel Room",
    status: "Due",
    health: 68,
    runningHours: "3,750 hrs",
    lastMaintenance: "May 12, 2026",
    nextMaintenance: "May 29, 2026",
    assignedTo: "Marine Ops",
    issue: "Routine service required",
  },
  {
    id: "AC-05",
    name: "Air Compressor Unit",
    type: "Compressor",
    location: "Workshop Bay",
    status: "Healthy",
    health: 87,
    runningHours: "1,940 hrs",
    lastMaintenance: "May 17, 2026",
    nextMaintenance: "Jun 05, 2026",
    assignedTo: "Deck Team",
    issue: "No active fault",
  },
  {
    id: "BW-06",
    name: "Bilge Water Pump",
    type: "Pump",
    location: "Lower Deck",
    status: "Warning",
    health: 63,
    runningHours: "5,430 hrs",
    lastMaintenance: "May 09, 2026",
    nextMaintenance: "May 28, 2026",
    assignedTo: "Safety Team",
    issue: "Reduced discharge pressure",
  },
];

export const statusOptions = ["All", "Healthy", "Warning", "Critical", "Due"] as const;
export const typeOptions = ["All", "Engine", "Generator", "Pump", "Purifier", "Compressor"] as const;

export const liveActivities = [
  "Cooling Pump marked critical",
  "Generator health improved to 91%",
  "Fuel Purifier service scheduled",
  "Main Engine inspection note added",
];
