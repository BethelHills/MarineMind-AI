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
  "Main engine temperature is increasing rapidly.",
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
    text: "Hello Bethel. Describe the equipment fault and I will respond with:\n1. Quick Understanding\n2. Possible Causes\n3. Inspection Checklist\n4. Safety Precautions\n5. Recommended Maintenance Action\n6. Maintenance Fault Report Summary",
    time: "09:20 AM",
  },
  {
    role: "user",
    text: "Main engine temperature is rising after 3 hours of operation.",
    time: "09:21 AM",
  },
  {
    role: "assistant",
    text: `1. Quick Understanding
The operator reports rising temperature on Main Engine Alpha after extended operation. This suggests a developing thermal or cooling-related fault.

2. Possible Causes
- Restricted cooling water flow
- Dirty or fouled heat exchanger
- Low coolant level
- Weak cooling pump performance
- Overload or fuel injector imbalance

3. Inspection Checklist
- Record cooling water inlet/outlet pressure and temperature
- Check coolant level and visible leaks
- Review exhaust temperature trend
- Inspect heat exchanger and cooling lines

4. Safety Precautions
- Reduce load if temperature continues to climb
- Avoid opening hot circuits without isolation
- Use PPE and maintain fire watch where high heat is present

5. Recommended Maintenance Action
Log all readings, inspect cooling flow path, service the heat exchanger if restricted, verify pump output, and create a maintenance task if abnormal values persist.

6. Maintenance Fault Report Summary
Equipment: Main Engine Alpha. Symptom: rising operating temperature. Risk: Medium-High. Next action: verify cooling system performance and schedule corrective maintenance if trend continues.`,
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
