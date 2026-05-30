import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HoverCard, HoverPressable, HoverRow, HoverTab } from "@/components/motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Plug, Save } from "lucide-react";
import { spring } from "@/lib/motion";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Plug },
];

function Toggle({ on }: { on: boolean }) {
  const [enabled, setEnabled] = useState(on);
  return (
    <motion.button
      onClick={() => setEnabled(!enabled)}
      className={`relative h-6 w-11 rounded-full transition ${enabled ? "bg-primary" : "bg-muted"}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={spring}
    >
      <motion.span
        className="absolute top-0.5 size-5 rounded-full bg-card shadow"
        animate={{ left: enabled ? 22 : 2 }}
        transition={spring}
      />
    </motion.button>
  );
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={value}
        className="mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow hover:border-primary/30"
      />
    </label>
  );
}

function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <AppShell title="Settings">
      <div className="grid grid-cols-[220px_1fr] gap-6">
        <HoverCard lift={false} className="bg-card border border-border rounded-2xl p-2 h-fit">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <HoverTab
                key={t.id}
                active={active === t.id}
                onClick={() => setActive(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  active === t.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-4" /> {t.label}
              </HoverTab>
            );
          })}
        </HoverCard>

        <HoverCard className="bg-card border border-border rounded-2xl p-6">
          {active === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Profile</h2>
                <p className="text-sm text-muted-foreground">Update your personal information.</p>
              </div>
              <div className="flex items-center gap-4">
                <motion.div
                  className="size-16 rounded-full bg-gradient-to-br from-primary to-accent-foreground grid place-items-center text-primary-foreground text-xl font-semibold"
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  transition={spring}
                >
                  SO
                </motion.div>
                <HoverPressable>
                  <button className="text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-muted">
                    Change photo
                  </button>
                </HoverPressable>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full name" value="Samson O." />
                <Field label="Role" value="Chief Engineer" />
                <Field label="Email" value="samson@marinemind.ai" type="email" />
                <Field label="Vessel" value="MV Atlantic Voyager" />
              </div>
              <HoverPressable className="inline-block">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90">
                  <Save className="size-4" /> Save changes
                </button>
              </HoverPressable>
            </div>
          )}

          {active === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                <p className="text-sm text-muted-foreground">Choose how you want to be notified.</p>
              </div>
              <ul className="divide-y divide-border">
                {[
                  ["Critical equipment alerts", "Immediate push and email when a critical alert fires.", true],
                  ["Maintenance reminders", "Daily summary of upcoming maintenance tasks.", true],
                  ["Weekly reports", "Performance and health digest every Monday.", false],
                  ["AI recommendations", "Notify when the AI assistant suggests an action.", true],
                ].map(([title, desc, on]) => (
                  <HoverRow
                    key={title as string}
                    className="flex items-center justify-between py-4 list-none rounded-lg px-2 -mx-2"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{title}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                    <Toggle on={on as boolean} />
                  </HoverRow>
                ))}
              </ul>
            </div>
          )}

          {active === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Security</h2>
                <p className="text-sm text-muted-foreground">Manage password and two-factor authentication.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Current password" value="" type="password" />
                <div />
                <Field label="New password" value="" type="password" />
                <Field label="Confirm new password" value="" type="password" />
              </div>
              <HoverRow className="flex items-center justify-between border-t border-border pt-4 list-none">
                <div>
                  <div className="text-sm font-medium text-foreground">Two-factor authentication</div>
                  <div className="text-sm text-muted-foreground">Require a code from your authenticator app.</div>
                </div>
                <Toggle on={true} />
              </HoverRow>
            </div>
          )}

          {active === "integrations" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Integrations</h2>
                <p className="text-sm text-muted-foreground">Connect MarineMind AI with your fleet systems.</p>
              </div>
              <ul className="divide-y divide-border">
                {[
                  ["QuikDB", "Primary database connection.", true],
                  ["OpenAI", "Powers the AI maintenance assistant.", true],
                  ["Inmarsat Fleet Xpress", "Satellite telemetry uplink.", false],
                  ["Slack", "Send alerts to engineering channel.", false],
                ].map(([name, desc, on]) => (
                  <HoverRow
                    key={name as string}
                    className="flex items-center justify-between py-4 list-none rounded-lg px-2 -mx-2"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">{name}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                    <Toggle on={on as boolean} />
                  </HoverRow>
                ))}
              </ul>
            </div>
          )}
        </HoverCard>
      </div>
    </AppShell>
  );
}

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MarineMind AI" }] }),
  component: SettingsPage,
});
