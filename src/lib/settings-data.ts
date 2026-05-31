export type ProfileSettings = {
  name: string;
  email: string;
  role: string;
  phone: string;
};

export type CompanySettings = {
  name: string;
  vessel: string;
  operation: string;
  timezone: string;
};

export type NotificationSettings = {
  critical: boolean;
  maintenance: boolean;
  reports: boolean;
  weekly: boolean;
};

export type AISettings = {
  mode: string;
  risk: string;
  context: string;
  reportStyle: string;
  safety: boolean;
  summary: boolean;
};

export type SecuritySettings = {
  email: string;
  twoFactor: boolean;
  restrictAi: boolean;
};

export type SystemSettings = {
  theme: string;
  refresh: string;
  storage: string;
  defaultPage: string;
};

export const defaultProfile: ProfileSettings = {
  name: "Bethel Hillary",
  email: "bettybella777@gmail.com",
  role: "Marine Engineer",
  phone: "+234 000 000 0000",
};

export const defaultCompany: CompanySettings = {
  name: "MarineMind Operations",
  vessel: "Vessel Alpha",
  operation: "Cargo Vessel",
  timezone: "Africa/Lagos",
};

export const defaultNotifications: NotificationSettings = {
  critical: true,
  maintenance: true,
  reports: true,
  weekly: false,
};

export const defaultAI: AISettings = {
  mode: "Practical",
  risk: "Normal",
  context: "Selected Equipment",
  reportStyle: "Professional",
  safety: true,
  summary: true,
};

export const defaultSecurity: SecuritySettings = {
  email: "bettybella777@gmail.com",
  twoFactor: false,
  restrictAi: true,
};

export const defaultSystem: SystemSettings = {
  theme: "Light",
  refresh: "Every 1 minute",
  storage: "Local + Cloud",
  defaultPage: "Dashboard",
};

export const settingsTabs = [
  { name: "Profile", icon: "UserRound" as const },
  { name: "Company", icon: "Building2" as const },
  { name: "Notifications", icon: "BellRing" as const },
  { name: "AI Preferences", icon: "Bot" as const },
  { name: "Security", icon: "LockKeyhole" as const },
  { name: "System", icon: "MonitorCog" as const },
] as const;

export type SettingsTabName = (typeof settingsTabs)[number]["name"];

export const operationTypeOptions = [
  "Cargo Vessel",
  "Offshore Vessel",
  "Passenger Vessel",
  "Tanker",
  "Workboat",
];

export const timezoneOptions = [
  "Africa/Lagos",
  "UTC",
  "Europe/London",
  "America/New_York",
  "Asia/Dubai",
];

export const aiModeOptions = ["Practical", "Detailed", "Brief", "Report Format"];
export const aiRiskOptions = ["Normal", "High", "Strict"];
export const aiContextOptions = ["Selected Equipment", "All Equipment", "Engine Room", "Deck Equipment"];
export const aiReportStyleOptions = ["Professional", "Technical", "Simple", "Audit Ready"];

export const themeOptions = ["Light", "Dark", "System"];
export const refreshOptions = ["Every 30 seconds", "Every 1 minute", "Every 5 minutes", "Manual"];
export const storageOptions = ["Local + Cloud", "Cloud Only", "Local Only"];
export const defaultPageOptions = ["Dashboard", "Equipment", "Maintenance", "AI Assistant", "Reports"];

export const notificationToggles = [
  {
    key: "critical" as const,
    title: "Critical alert notifications",
    description: "Notify when equipment enters critical status.",
  },
  {
    key: "maintenance" as const,
    title: "Maintenance due reminders",
    description: "Send reminders before scheduled maintenance dates.",
  },
  {
    key: "reports" as const,
    title: "AI report completion",
    description: "Notify when AI-generated reports are ready.",
  },
  {
    key: "weekly" as const,
    title: "Weekly summary email",
    description: "Send weekly health and maintenance summary.",
  },
];

export const aiToggles = [
  {
    key: "safety" as const,
    title: "Always include safety precautions",
    description: "AI responses will include safety steps for fault analysis.",
  },
  {
    key: "summary" as const,
    title: "Generate report summaries",
    description: "AI will add a clean maintenance fault summary when needed.",
  },
];

export const securityToggles = [
  {
    key: "twoFactor" as const,
    title: "Two-factor authentication",
    description: "Add extra security to your MarineMind workspace.",
  },
  {
    key: "restrictAi" as const,
    title: "Restrict AI access to authorized users",
    description: "Only approved team members can use AI diagnostics.",
  },
];

export const workspaceUserCount = 4;
