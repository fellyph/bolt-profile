"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
  href?: string;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  href?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isHovered: boolean) => ({
    gap: isHovered ? ".5rem" : 0,
    paddingLeft: isHovered ? "1rem" : ".5rem",
    paddingRight: isHovered ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { type: "spring", bounce: 0, duration: 0.3 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
}: ExpandableTabsProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-white/20" aria-hidden="true" />
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border border-white/20 bg-black/20 backdrop-blur-sm p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isHovered = hoveredIndex === index;
        
        if (tab.href) {
          return (
            <a
              key={tab.title}
              href={tab.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
                isHovered
                  ? cn("bg-white/10 backdrop-blur-sm", activeColor)
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={20} />
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="ml-2 overflow-hidden whitespace-nowrap"
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          );
        }

        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            custom={isHovered}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              isHovered
                ? cn("bg-white/10 backdrop-blur-sm", activeColor)
                : "text-white/90 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon size={20} />
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="ml-2 overflow-hidden whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}