import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "relative flex rounded-2xl border bg-slate-100 p-1 dark:border-slate-700 dark:bg-[#142236]",
        className,
      )}
      role="group"
      aria-label="Theme mode"
    >
      <motion.span
        layout
        transition={spring}
        className="absolute bottom-1 top-1 w-[calc(50%-0.25rem)] rounded-xl bg-white shadow-sm dark:bg-[#03131f]"
        style={{ left: isDark ? "calc(50% + 0.125rem)" : "0.25rem" }}
      />

      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={!isDark}
        aria-label="Light mode"
        className={cn(
          "relative z-10 grid h-9 w-9 place-items-center rounded-xl transition-colors sm:h-10 sm:w-10",
          !isDark ? "text-cyan-700 dark:text-cyan-300" : "text-slate-500 dark:text-slate-400",
        )}
      >
        <Sun className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={isDark}
        aria-label="Dark mode"
        className={cn(
          "relative z-10 grid h-9 w-9 place-items-center rounded-xl transition-colors sm:h-10 sm:w-10",
          isDark ? "text-cyan-700 dark:text-cyan-300" : "text-slate-500 dark:text-slate-400",
        )}
      >
        <Moon className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" />
      </button>
    </div>
  );
}
