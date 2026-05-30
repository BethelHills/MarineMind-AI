export const AGENT_SECTIONS = [
  "Quick Understanding",
  "Possible Causes",
  "Inspection Checklist",
  "Safety Precautions",
  "Recommended Maintenance Action",
  "Maintenance Fault Report Summary",
] as const;

export const MARINEMIND_SYSTEM_PROMPT = `You are MarineMind AI, a marine equipment diagnostic assistant for vessel maintenance teams.

Always respond using exactly these six numbered sections with these exact headings:

1. Quick Understanding
2. Possible Causes
3. Inspection Checklist
4. Safety Precautions
5. Recommended Maintenance Action
6. Maintenance Fault Report Summary

Rules:
- Keep each section concise and practical.
- Use bullet points in sections 2, 3, and 4 where helpful.
- Prioritize crew safety and safe equipment isolation.
- Tailor guidance to the selected equipment and reported symptoms.
- Section 6 must read like a short fault log entry (equipment, symptom, risk, next action).`;

export function buildSystemMessage(equipment: string) {
  return `${MARINEMIND_SYSTEM_PROMPT}\n\nSelected equipment: ${equipment}`;
}

export function formatAgentResponse(sections: Record<(typeof AGENT_SECTIONS)[number], string>) {
  return AGENT_SECTIONS.map((title, index) => `${index + 1}. ${title}\n${sections[title]}`).join(
    "\n\n",
  );
}

export function generateStructuredFallback(prompt: string, equipment: string) {
  const text = prompt.toLowerCase();

  if (text.includes("temperature") || text.includes("overheat") || text.includes("hot")) {
    return formatAgentResponse({
      "Quick Understanding": `The operator reports rising temperature on ${equipment} after extended operation. This suggests a developing thermal or cooling-related fault that needs prompt review before load increases.`,
      "Possible Causes": `- Restricted cooling water flow\n- Dirty or fouled heat exchanger\n- Low coolant level\n- Weak cooling pump performance\n- Faulty thermostat\n- Overload or fuel injector imbalance`,
      "Inspection Checklist": `- Record cooling water inlet/outlet pressure and temperature\n- Check coolant level and visible leaks\n- Review exhaust temperature trend\n- Inspect heat exchanger and cooling lines\n- Confirm engine load and operating hours`,
      "Safety Precautions": `- Reduce load if temperature continues to climb\n- Avoid opening hot circuits without isolation\n- Use PPE and confirm safe access in the engine room\n- Keep fire watch ready where high heat is present`,
      "Recommended Maintenance Action": `Log all readings, inspect cooling flow path, clean or service the heat exchanger if restricted, verify pump output, and create a maintenance task if abnormal values persist after corrective checks.`,
      "Maintenance Fault Report Summary": `Equipment: ${equipment}. Symptom: rising operating temperature. Risk: Medium-High. Next action: verify cooling system performance, record readings, and schedule corrective maintenance if trend continues.`,
    });
  }

  if (text.includes("vibration") || text.includes("shake")) {
    return formatAgentResponse({
      "Quick Understanding": `The operator reports abnormal vibration on ${equipment}, which may indicate mechanical wear, misalignment, or flow-related instability.`,
      "Possible Causes": `- Bearing wear or overheating\n- Shaft misalignment\n- Loose foundation or mounting bolts\n- Cavitation or suction restriction\n- Damaged coupling or impeller imbalance`,
      "Inspection Checklist": `- Measure vibration trend and compare with baseline\n- Check bearing temperature and noise\n- Inspect mountings, coupling, and alignment marks\n- Verify suction/discharge pressure\n- Review recent maintenance history`,
      "Safety Precautions": `- Do not continue operation if vibration is increasing rapidly\n- Isolate and lock out equipment before mechanical inspection\n- Keep hands and tools clear of rotating parts`,
      "Recommended Maintenance Action": `Document vibration readings, inspect bearings and alignment, tighten mountings, check suction conditions, and plan bearing or alignment correction if defect is confirmed.`,
      "Maintenance Fault Report Summary": `Equipment: ${equipment}. Symptom: abnormal vibration. Risk: Medium-High. Next action: inspect mechanical condition and restrict operation until root cause is verified.`,
    });
  }

  if (text.includes("voltage") || text.includes("generator") || text.includes("load")) {
    return formatAgentResponse({
      "Quick Understanding": `The operator reports unstable voltage on ${equipment}, often linked to load changes, control system issues, or fuel/governor instability.`,
      "Possible Causes": `- AVR fault or unstable regulator settings\n- Sudden load changes\n- Loose electrical connections\n- Poor fuel supply or governor response\n- Frequency instability under load`,
      "Inspection Checklist": `- Record voltage and frequency during load changes\n- Inspect terminal connections and control panel alarms\n- Check AVR readings and governor response\n- Verify fuel pressure and load distribution`,
      "Safety Precautions": `- Do not add heavy load while voltage is unstable\n- Follow electrical isolation procedures before panel work\n- Use insulated tools and approved PPE`,
      "Recommended Maintenance Action": `Capture voltage trends, inspect control panel and wiring, test AVR/governor response, and avoid additional load until output stabilizes.`,
      "Maintenance Fault Report Summary": `Equipment: ${equipment}. Symptom: unstable output voltage. Risk: Medium. Next action: inspect electrical control systems and monitor under controlled load.`,
    });
  }

  if (text.includes("sludge") || text.includes("purifier") || text.includes("fuel")) {
    return formatAgentResponse({
      "Quick Understanding": `The operator reports excessive sludge discharge or fuel separation issues on ${equipment}, indicating possible contamination or incorrect purifier operation.`,
      "Possible Causes": `- Dirty or incompatible fuel\n- Incorrect fuel temperature\n- Wrong gravity disc selection\n- Bowl contamination or seal issues\n- Poor sealing water supply`,
      "Inspection Checklist": `- Check fuel temperature and inlet quality\n- Inspect bowl, seals, and sludge discharge interval\n- Verify gravity disc and operating settings\n- Confirm sealing water flow and pressure`,
      "Safety Precautions": `- Follow hot surface and fuel handling procedures\n- Ventilate the space and prevent ignition sources\n- Isolate fuel lines before opening the bowl`,
      "Recommended Maintenance Action": `Clean the bowl, confirm operating temperature and gravity disc settings, inspect seals, and monitor separation performance after restart.`,
      "Maintenance Fault Report Summary": `Equipment: ${equipment}. Symptom: high sludge discharge / poor separation. Risk: Medium. Next action: clean bowl and verify purifier operating parameters.`,
    });
  }

  return formatAgentResponse({
    "Quick Understanding": `The operator reported a fault on ${equipment}: "${prompt}". Initial review should focus on safe assessment and gathering operating data.`,
    "Possible Causes": `- Mechanical wear or misalignment\n- Flow, pressure, or temperature deviation\n- Control or electrical instability\n- Missed or overdue maintenance\n- Abnormal operating load or environment`,
    "Inspection Checklist": `- Confirm safe isolation where required\n- Record temperature, pressure, vibration, and sound\n- Compare readings with normal baseline\n- Review last maintenance and spare parts status\n- Inspect visible leaks, mounts, and connections`,
    "Safety Precautions": `- Follow vessel isolation and lock-out procedures\n- Use appropriate PPE for the machinery space\n- Do not force operation if condition is worsening`,
    "Recommended Maintenance Action": `Document findings, inspect affected components, escalate if risk increases, and create a maintenance task for follow-up repair or monitoring.`,
    "Maintenance Fault Report Summary": `Equipment: ${equipment}. Symptom: ${prompt}. Risk: Medium. Next action: complete initial inspection, log readings, and assign corrective maintenance.`,
  });
}
