import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { HoverPressable } from "@/components/motion";
import { useTheme } from "@/components/theme-provider";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <HoverPressable>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={cn(
          "rounded-2xl border bg-white p-3 text-slate-700 transition-colors hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:bg-[#142236] dark:text-slate-200 dark:hover:border-cyan-500/50 dark:hover:text-cyan-300",
          className,
        )}
      >
        <motion.span
          key={resolvedTheme}
          initial={{ rotate: -20, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={spring}
          className="grid place-items-center"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.span>
      </button>
    </HoverPressable>
  );
}
