import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverPressable, HoverTableRow } from "@/components/motion";
import { spring } from "@/lib/motion";

export function StatCard({
  icon: Icon,
  title,
  value,
  note,
  tone,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  note: string;
  tone: string;
}) {
  return (
    <HoverCard className="rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">{title}</p>
              <motion.h3
                className="mt-2 text-3xl font-black text-slate-950"
                whileHover={{ scale: 1.04, color: "#0ea5e9" }}
                transition={spring}
              >
                {value}
              </motion.h3>
              <p className="mt-2 text-sm text-slate-500">{note}</p>
            </div>
            <motion.div
              className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}
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

export function PageShell({
  title,
  subtitle,
  button,
  children,
}: {
  title: string;
  subtitle: string;
  button: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <HoverCard lift={false} className="rounded-3xl bg-[#03131f] shadow-lg">
        <div className="flex flex-col justify-between gap-4 p-6 text-white sm:flex-row sm:items-center">
          <div>
            <h3 className="text-2xl font-black">{title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{subtitle}</p>
          </div>
          <HoverPressable>
            <Button className="rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300">
              <Plus className="mr-2 h-4 w-4" />
              {button}
            </Button>
          </HoverPressable>
        </div>
      </HoverCard>
      {children}
    </div>
  );
}

export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <HoverCard lift={false} className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  {headers.map((header) => (
                    <th key={header} className="px-4 py-4 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </HoverCard>
  );
}

export function MarineCard({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <HoverCard className={`rounded-3xl border-0 bg-white shadow-sm ${className}`}>
      <Card className="rounded-3xl border-0 bg-transparent shadow-none">
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </HoverCard>
  );
}

export { HoverTableRow };
