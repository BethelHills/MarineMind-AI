import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  BellRing,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  Eye,
  EyeOff,
  Gauge,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  MonitorCog,
  Moon,
  Save,
  Settings,
  ShieldCheck,
  ShipWheel,
  SlidersHorizontal,
  Sun,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverPressable, HoverRow } from "@/components/motion";
import { useTheme } from "@/components/theme-provider";
import { spring } from "@/lib/motion";
import { themeLabelToMode, themeModeToLabel } from "@/lib/theme";
import {
  aiContextOptions,
  aiModeOptions,
  aiReportStyleOptions,
  aiRiskOptions,
  aiToggles,
  defaultAI,
  defaultCompany,
  defaultNotifications,
  defaultPageOptions,
  defaultProfile,
  defaultSecurity,
  defaultSystem,
  notificationToggles,
  operationTypeOptions,
  refreshOptions,
  securityToggles,
  settingsTabs,
  storageOptions,
  themeOptions,
  timezoneOptions,
  workspaceUserCount,
  type AISettings,
  type CompanySettings,
  type NotificationSettings,
  type ProfileSettings,
  type SecuritySettings,
  type SettingsTabName,
  type SystemSettings,
} from "@/lib/settings-data";

const tabIcons: Record<string, LucideIcon> = {
  UserRound,
  Building2,
  BellRing,
  Bot,
  LockKeyhole,
  MonitorCog,
};

function SummaryCard({
  icon: Icon,
  label,
  value,
  note,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  note: string;
  className: string;
}) {
  return (
    <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <motion.h3
                className="mt-2 text-2xl font-black text-slate-950"
                whileHover={{ scale: 1.04, color: "#0ea5e9" }}
                transition={spring}
              >
                {value}
              </motion.h3>
              <p className="mt-2 text-sm text-slate-500">{note}</p>
            </div>
            <motion.div
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${className}`}
              whileHover={{ scale: 1.12, rotate: -8 }}
              transition={spring}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function SectionHeader({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-xl font-black text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
      <motion.div
        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700"
        whileHover={{ scale: 1.1, rotate: -6 }}
        transition={spring}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: LucideIcon;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <motion.div
        className="mt-2 flex items-center gap-3 rounded-2xl border bg-slate-50 px-4 py-3 focus-within:border-cyan-300"
        whileHover={{ scale: 1.01 }}
        transition={spring}
      >
        {Icon && <Icon className="h-5 w-5 text-slate-400" />}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
      </motion.div>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[] | string[];
  icon?: LucideIcon;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <div className="relative mt-2">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-2xl border bg-slate-50 py-3 pr-10 text-sm outline-none transition hover:border-cyan-300 focus:border-cyan-300 ${Icon ? "pl-12" : "pl-4"}`}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </label>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <HoverRow className="flex list-none items-center justify-between gap-4 rounded-3xl border bg-white p-4">
      <div>
        <p className="font-bold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <motion.button
        onClick={onToggle}
        className={`relative h-8 w-14 shrink-0 rounded-full transition ${enabled ? "bg-cyan-500" : "bg-slate-300"}`}
        whileTap={{ scale: 0.95 }}
        transition={spring}
        aria-pressed={enabled}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${enabled ? "left-7" : "left-1"}`}
        />
      </motion.button>
    </HoverRow>
  );
}

function ProfileSettings({
  profile,
  setProfile,
}: {
  profile: ProfileSettings;
  setProfile: (profile: ProfileSettings) => void;
}) {
  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5 sm:p-6">
          <SectionHeader
            icon={UserRound}
            title="Profile Settings"
            text="Manage your engineer profile and contact information."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field
              label="Full Name"
              value={profile.name}
              onChange={(value) => setProfile({ ...profile, name: value })}
              icon={UserRound}
            />
            <Field
              label="Email Address"
              value={profile.email}
              onChange={(value) => setProfile({ ...profile, email: value })}
              icon={Mail}
            />
            <Field
              label="Role"
              value={profile.role}
              onChange={(value) => setProfile({ ...profile, role: value })}
              icon={Wrench}
            />
            <Field
              label="Phone"
              value={profile.phone}
              onChange={(value) => setProfile({ ...profile, phone: value })}
              icon={Globe2}
            />
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function CompanySettings({
  company,
  setCompany,
}: {
  company: CompanySettings;
  setCompany: (company: CompanySettings) => void;
}) {
  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5 sm:p-6">
          <SectionHeader
            icon={Building2}
            title="Company Information"
            text="Set vessel, company, and operation details."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field
              label="Company Name"
              value={company.name}
              onChange={(value) => setCompany({ ...company, name: value })}
              icon={Building2}
            />
            <Field
              label="Vessel Name"
              value={company.vessel}
              onChange={(value) => setCompany({ ...company, vessel: value })}
              icon={ShipWheel}
            />
            <SelectField
              label="Operation Type"
              value={company.operation}
              onChange={(value) => setCompany({ ...company, operation: value })}
              icon={Gauge}
              options={operationTypeOptions}
            />
            <SelectField
              label="Timezone"
              value={company.timezone}
              onChange={(value) => setCompany({ ...company, timezone: value })}
              icon={Clock}
              options={timezoneOptions}
            />
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function NotificationSettings({
  notifications,
  setNotifications,
}: {
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
}) {
  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5 sm:p-6">
          <SectionHeader
            icon={BellRing}
            title="Notification Settings"
            text="Choose when MarineMind should notify your team."
          />
          <div className="mt-6 space-y-4">
            {notificationToggles.map(({ key, title, description }) => (
              <ToggleRow
                key={key}
                title={title}
                description={description}
                enabled={notifications[key]}
                onToggle={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function AISettingsPanel({ ai, setAi }: { ai: AISettings; setAi: (ai: AISettings) => void }) {
  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5 sm:p-6">
          <SectionHeader
            icon={Bot}
            title="AI Preferences"
            text="Control how MarineMind AI responds and prepares maintenance guidance."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <SelectField
              label="AI Response Mode"
              value={ai.mode}
              onChange={(value) => setAi({ ...ai, mode: value })}
              icon={Bot}
              options={aiModeOptions}
            />
            <SelectField
              label="Risk Sensitivity"
              value={ai.risk}
              onChange={(value) => setAi({ ...ai, risk: value })}
              icon={ShieldCheck}
              options={aiRiskOptions}
            />
            <SelectField
              label="Default Equipment Context"
              value={ai.context}
              onChange={(value) => setAi({ ...ai, context: value })}
              icon={Gauge}
              options={aiContextOptions}
            />
            <SelectField
              label="Report Style"
              value={ai.reportStyle}
              onChange={(value) => setAi({ ...ai, reportStyle: value })}
              icon={Settings}
              options={aiReportStyleOptions}
            />
          </div>
          <div className="mt-5 space-y-4">
            {aiToggles.map(({ key, title, description }) => (
              <ToggleRow
                key={key}
                title={title}
                description={description}
                enabled={ai[key]}
                onToggle={() => setAi({ ...ai, [key]: !ai[key] })}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function SecuritySettings({
  security,
  setSecurity,
}: {
  security: SecuritySettings;
  setSecurity: (security: SecuritySettings) => void;
}) {
  const [showKey, setShowKey] = useState(false);

  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5 sm:p-6">
          <SectionHeader
            icon={LockKeyhole}
            title="Security"
            text="Manage access, API safety, and account protection."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field
              label="Account Email"
              value={security.email}
              onChange={(value) => setSecurity({ ...security, email: value })}
              icon={Mail}
            />
            <div>
              <span className="text-sm font-semibold text-slate-600">API Key Status</span>
              <motion.div
                className="mt-2 flex items-center justify-between rounded-2xl border bg-slate-50 px-4 py-3"
                whileHover={{ scale: 1.01 }}
                transition={spring}
              >
                <div className="flex items-center gap-3">
                  <KeyRound className="h-5 w-5 text-slate-400" />
                  <span className="text-sm font-bold text-slate-800">
                    {showKey ? "sk-demo-hidden-key" : "••••••••••••••••"}
                  </span>
                </div>
                <motion.button
                  onClick={() => setShowKey(!showKey)}
                  className="text-slate-500 hover:text-cyan-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                >
                  {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.button>
              </motion.div>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {securityToggles.map(({ key, title, description }) => (
              <ToggleRow
                key={key}
                title={title}
                description={description}
                enabled={security[key]}
                onToggle={() => setSecurity({ ...security, [key]: !security[key] })}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

function SystemSettings({ system, setSystem }: { system: SystemSettings; setSystem: (system: SystemSettings) => void }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const ThemeIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5 sm:p-6">
          <SectionHeader
            icon={MonitorCog}
            title="System Preferences"
            text="Control dashboard display, data sync, and storage behavior."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <SelectField
              label="Theme"
              value={themeModeToLabel(theme)}
              onChange={(value) => setTheme(themeLabelToMode(value))}
              icon={ThemeIcon}
              options={themeOptions}
            />
            <SelectField
              label="Dashboard Refresh"
              value={system.refresh}
              onChange={(value) => setSystem({ ...system, refresh: value })}
              icon={Clock}
              options={refreshOptions}
            />
            <SelectField
              label="Data Storage"
              value={system.storage}
              onChange={(value) => setSystem({ ...system, storage: value })}
              icon={Database}
              options={storageOptions}
            />
            <SelectField
              label="Default Landing Page"
              value={system.defaultPage}
              onChange={(value) => setSystem({ ...system, defaultPage: value })}
              icon={SlidersHorizontal}
              options={defaultPageOptions}
            />
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

export function SettingsPageContent() {
  const [activeTab, setActiveTab] = useState<SettingsTabName>("Profile");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState<ProfileSettings>(defaultProfile);
  const [company, setCompany] = useState<CompanySettings>(defaultCompany);
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotifications);
  const [ai, setAi] = useState<AISettings>(defaultAI);
  const [security, setSecurity] = useState<SecuritySettings>(defaultSecurity);
  const [system, setSystem] = useState<SystemSettings>(defaultSystem);

  const summary = useMemo(
    () => ({
      users: workspaceUserCount,
      aiMode: ai.mode,
      alerts: notifications.critical ? "On" : "Off",
      security: security.restrictAi ? "Protected" : "Open",
    }),
    [ai.mode, notifications.critical, security.restrictAi],
  );

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  const activeContent = {
    Profile: <ProfileSettings profile={profile} setProfile={setProfile} />,
    Company: <CompanySettings company={company} setCompany={setCompany} />,
    Notifications: (
      <NotificationSettings notifications={notifications} setNotifications={setNotifications} />
    ),
    "AI Preferences": <AISettingsPanel ai={ai} setAi={setAi} />,
    Security: <SecuritySettings security={security} setSecurity={setSecurity} />,
    System: <SystemSettings system={system} setSystem={setSystem} />,
  }[activeTab];

  return (
    <>
      <section className="relative overflow-hidden rounded-[2rem] bg-[#03131f] p-6 text-white shadow-xl sm:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/8 px-4 py-2 text-sm text-cyan-100"
              whileHover={{ scale: 1.04 }}
              transition={spring}
            >
              <Anchor className="h-4 w-4 text-cyan-300" />
              MarineMind AI Settings
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Control your workspace, AI behavior, and vessel preferences.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Manage profile, company details, notifications, AI report style, security, and dashboard
              system settings.
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 sm:grid-cols-2 lg:w-80">
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">AI Mode</p>
              <p className="mt-2 text-2xl font-black text-cyan-300">{summary.aiMode}</p>
            </motion.div>
            <motion.div className="rounded-2xl bg-white/8 p-4" whileHover={{ scale: 1.03 }} transition={spring}>
              <p className="text-xs text-slate-400">Security</p>
              <p className="mt-2 text-2xl font-black text-emerald-300">{summary.security}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={UsersRound}
          label="Team Users"
          value={summary.users}
          note="Workspace members"
          className="bg-cyan-500/15 text-cyan-700"
        />
        <SummaryCard
          icon={Bot}
          label="AI Mode"
          value={summary.aiMode}
          note="Current response style"
          className="bg-violet-500/15 text-violet-700"
        />
        <SummaryCard
          icon={BellRing}
          label="Critical Alerts"
          value={summary.alerts}
          note="Notification status"
          className="bg-amber-500/15 text-amber-700"
        />
        <SummaryCard
          icon={ShieldCheck}
          label="Access"
          value={summary.security}
          note="AI access control"
          className="bg-emerald-500/15 text-emerald-700"
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[300px_1fr]">
        <HoverCard lift={false} className="rounded-3xl border-0 bg-white shadow-sm">
          <Card className="rounded-3xl border-0 bg-transparent shadow-none">
            <CardContent className="p-4">
              <div className="mb-4 rounded-3xl bg-[#03131f] p-5 text-white">
                <ShipWheel className="mb-3 h-8 w-8 text-cyan-300" />
                <h3 className="font-black">Workspace Settings</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Update how MarineMind AI works for your vessel team.
                </p>
              </div>

              <div className="space-y-2">
                {settingsTabs.map((tab) => {
                  const Icon = tabIcons[tab.icon] ?? UserRound;
                  const active = activeTab === tab.name;
                  return (
                    <motion.button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={spring}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                        active
                          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.name}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </HoverCard>

        <div className="space-y-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeContent}
          </motion.div>

          <HoverCard lift={false} className="rounded-3xl border bg-white shadow-sm">
            <Card className="rounded-3xl border-0 bg-transparent shadow-none">
              <CardContent className="flex flex-col items-stretch justify-between gap-3 p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-black text-slate-950">Save workspace changes</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Changes are stored locally for now and can later connect to your database.
                  </p>
                </div>
                <HoverPressable>
                  <Button
                    onClick={handleSave}
                    className="h-12 rounded-2xl bg-cyan-500 px-6 font-bold text-white hover:bg-cyan-600"
                  >
                    {saved ? (
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                    ) : (
                      <Save className="mr-2 h-5 w-5" />
                    )}
                    {saved ? "Saved" : "Save Changes"}
                  </Button>
                </HoverPressable>
              </CardContent>
            </Card>
          </HoverCard>
        </div>
      </section>
    </>
  );
}
