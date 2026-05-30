export function historyStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Warning: "bg-amber-500/15 text-amber-700 border-amber-200",
    Critical: "bg-red-500/15 text-red-700 border-red-200",
    Resolved: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
  };
  return styles[status] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function generateAIResponse(prompt: string, equipment: string) {
  const text = prompt.toLowerCase();

  if (text.includes("temperature") || text.includes("overheat") || text.includes("hot")) {
    return `Analysis for ${equipment}: temperature rise may be linked to poor cooling flow, blocked heat exchanger, low coolant level, heavy load, or fuel injector imbalance. Start by checking cooling water pressure, coolant level, exhaust temperature reading, heat exchanger cleanliness, and engine load history. Suggested action: reduce load if needed, inspect cooling lines, and log readings before restarting full operation.`;
  }

  if (text.includes("vibration") || text.includes("shake")) {
    return `Analysis for ${equipment}: vibration can come from bearing wear, shaft misalignment, loose foundation bolts, cavitation, damaged coupling, or imbalance. Check bearing temperature, mounting bolts, alignment marks, suction pressure, and vibration trend. Suggested action: isolate the unit if vibration is increasing and inspect before continuous operation.`;
  }

  if (text.includes("voltage") || text.includes("generator") || text.includes("load")) {
    return `Analysis for ${equipment}: unstable voltage may be caused by automatic voltage regulator fault, unstable load, loose wiring, poor fuel supply, or governor issue. Check load changes, wiring terminals, AVR readings, fuel pressure, and generator frequency. Suggested action: record voltage trend and inspect control panel before adding more load.`;
  }

  if (text.includes("sludge") || text.includes("purifier") || text.includes("fuel")) {
    return `Analysis for ${equipment}: high sludge discharge may indicate dirty fuel, incorrect temperature, wrong gravity disc, poor separation, or bowl contamination. Check fuel temperature, bowl condition, sludge interval, sealing water, and purifier settings. Suggested action: clean the bowl and confirm the correct operating parameters.`;
  }

  return `Analysis for ${equipment}: based on the fault description, start with safe isolation, visual inspection, operating readings, last maintenance record, and abnormal sound, temperature, pressure, or vibration data. Suggested action: document the fault, inspect related components, and create a maintenance task for follow-up.`;
}
