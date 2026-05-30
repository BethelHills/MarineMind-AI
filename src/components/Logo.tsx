import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import logoUrl from "../../assets/image/marinemind-ai-logo.png";

const sizes = {
  sm: "h-11 w-11",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

type LogoProps = {
  size?: keyof typeof sizes;
  className?: string;
  animated?: boolean;
};

export function Logo({ size = "md", className, animated = true }: LogoProps) {
  const image = (
    <img
      src={logoUrl}
      alt="MarineMind AI"
      className={cn("h-full w-full object-contain", className)}
    />
  );

  if (!animated) {
    return <div className={cn("shrink-0", sizes[size])}>{image}</div>;
  }

  return (
    <motion.div
      whileHover={{ rotate: 6, scale: 1.06 }}
      transition={spring}
      className={cn("shrink-0 overflow-hidden rounded-2xl", sizes[size])}
    >
      {image}
    </motion.div>
  );
}
