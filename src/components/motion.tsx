import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { cardHover, pressHover, rowHover, spring } from "@/lib/motion";

export function PageEnter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({
  className,
  children,
  lift = true,
  ...props
}: HTMLMotionProps<"div"> & { lift?: boolean }) {
  return (
    <motion.div
      initial="rest"
      whileHover={lift ? "hover" : undefined}
      whileTap={{ scale: 0.995 }}
      variants={lift ? cardHover : undefined}
      className={cn(
        "transition-[box-shadow,border-color] hover:border-primary/25 hover:shadow-[0_16px_40px_oklch(0.55_0.22_275/0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HoverRow({ className, children, ...props }: HTMLMotionProps<"li">) {
  return (
    <motion.li className={cn("cursor-default", className)} {...rowHover} {...props}>
      {children}
    </motion.li>
  );
}

export function HoverTableRow({ className, children, ...props }: HTMLMotionProps<"tr">) {
  return (
    <motion.tr className={cn("cursor-default", className)} {...rowHover} {...props}>
      {children}
    </motion.tr>
  );
}

export function HoverPressable({
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div className={className} {...pressHover} {...props}>
      {children}
    </motion.div>
  );
}

export function HoverTab({
  active,
  className,
  children,
  ...props
}: HTMLMotionProps<"button"> & { active?: boolean }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={cn(className, !active && "hover:text-foreground")}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function HoverIcon({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.span
      className={cn("inline-flex", className)}
      whileHover={{ scale: 1.12, rotate: -6 }}
      transition={spring}
    >
      {children}
    </motion.span>
  );
}
