import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const animationVariants = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { y: { duration: 0.3 }, opacity: { duration: 0.4 }, filter: { duration: 0.3 } },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        transition: { duration: 0.3 },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
      exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
    },
  },
};

const staggerTimings = { text: 0.06, word: 0.05, character: 0.03, line: 0.06 };

const TextAnimateBase = ({
  children,
  delay = 0,
  duration = 0.3,
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  ...props
}) => {
  const MotionComponent = motion[Component] || motion.p;

  let segments = [];
  if (by === "word") segments = children.split(/(\s+)/);
  else if (by === "character") segments = children.split("");
  else if (by === "line") segments = children.split("\n");
  else segments = [children];

  const preset = animationVariants[animation] || animationVariants.fadeIn;
  const finalVariants = {
    container: {
      ...preset.container,
      show: {
        ...preset.container.show,
        transition: {
          delayChildren: delay,
          staggerChildren: duration / segments.length,
        },
      },
    },
    item: preset.item,
  };

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={finalVariants.container}
        initial="hidden"
        whileInView={startOnView ? "show" : undefined}
        animate={startOnView ? undefined : "show"}
        exit="exit"
        className={cn("whitespace-pre-wrap", className)}
        viewport={{ once }}
        aria-label={children}
        {...props}
      >
        <span className="sr-only">{children}</span>
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={finalVariants.item}
            custom={i * staggerTimings[by]}
            className={cn(
              by === "line" ? "block" : "inline-block whitespace-pre",
              segmentClassName
            )}
            aria-hidden
          >
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  );
};

export const TextAnimate = memo(TextAnimateBase);
