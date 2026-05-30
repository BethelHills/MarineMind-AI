export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  time: string;
};

export type HistoryItem = {
  title: string;
  time: string;
  status: string;
};

export const equipmentOptions = [
  "Main Engine Alpha",
  "Cooling Pump Delta",
  "Fuel Purifier Gamma",
  "Aux Generator Beta",
  "Bilge Water Pump",
  "Air Compressor Unit",
] as const;

export const quickPrompts = [
  "Main engine temperature is rising after 3 hours of operation.",
  "Cooling pump is vibrating and discharge pressure is low.",
  "Generator output voltage is unstable during load change.",
  "Fuel purifier is producing too much sludge discharge.",
];

export const conversationHistory: HistoryItem[] = [
  { title: "Engine overheating", time: "Today", status: "Warning" },
  { title: "Pump vibration", time: "Yesterday", status: "Critical" },
  { title: "Generator voltage issue", time: "May 24", status: "Resolved" },
  { title: "Fuel purifier sludge", time: "May 22", status: "Warning" },
];

export const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    text: "Hello Bethel. Describe the marine equipment fault and I will suggest possible causes, checks, and maintenance actions.",
    time: "09:20 AM",
  },
  {
    role: "user",
    text: "Main engine temperature is rising after 3 hours of operation.",
    time: "09:21 AM",
  },
  {
    role: "assistant",
    text: "Possible causes: restricted cooling line, dirty heat exchanger, weak cooling pump flow, faulty thermostat, overloaded engine, or fuel injector imbalance. Recommended first checks: cooling water pressure, exhaust temperature trend, coolant level, heat exchanger condition, and engine load record.",
    time: "09:21 AM",
  },
];

export const aiSuggestedChecks = [
  "Confirm safe isolation before inspection",
  "Record temperature, pressure, and vibration readings",
  "Compare with last maintenance log",
  "Check related spare parts availability",
  "Create a maintenance task after diagnosis",
];

export const commonFaultAreas = [
  {
    title: "Temperature",
    text: "Cooling flow, heat exchanger, load condition",
  },
  {
    title: "Pressure",
    text: "Pump output, blockage, suction restriction",
  },
  {
    title: "Mechanical",
    text: "Bearing, coupling, alignment, mountings",
  },
] as const;
