export const spring = { type: "spring" as const, stiffness: 380, damping: 22 };

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: spring,
  },
};

export const rowHover = {
  whileHover: {
    x: 4,
    scale: 1.005,
    backgroundColor: "oklch(0.96 0.01 275 / 0.6)",
  },
  whileTap: { scale: 0.995 },
  transition: spring,
};

export const pressHover = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: spring,
};

export const pageEnter = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};
