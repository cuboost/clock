"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Settings2 } from "lucide-react";
import { SettingsSheet } from "@/components/settings/settings-sheet";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useInactivity } from "@/hooks/use-inactivity";
import { cn } from "@/lib/utils";
import { useFullscreen } from "@/context/fullscreen-context";

function AnimatedFloatingButton({
  icon,
  label,
  onClick,
  onMouseEnter,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
}) {
  const settingsColor = useThemeColor("clock");
  const iconWidth = 36;
  const [width, setWidth] = useState(iconWidth);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      setWidth(iconWidth + textRef.current.offsetWidth + 12);
    }
  }, [label]);

  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setExpanded(true);
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <motion.div
      className="flex cursor-pointer items-center overflow-hidden"
      initial="collapsed"
      animate={expanded ? "expanded" : "collapsed"}
      variants={{
        collapsed: { width: iconWidth },
        expanded: { width },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Button
        variant="ghost"
        className="dark:focus-visible:bg-input/50 focus-visible:bg-accent flex items-center gap-2 p-2 focus-visible:ring-0"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setExpanded(false)}
        onFocus={handleMouseEnter}
        onBlur={() => setExpanded(false)}
        style={{ color: settingsColor }}
      >
        {icon}
        <motion.span
          ref={textRef}
          className="whitespace-nowrap"
          variants={{
            // initial: { opacity: 0 },
            expanded: { opacity: 1 },
          }}
        >
          {label}
        </motion.span>
      </Button>
    </motion.div>
  );
}

export default function FloatingButtons() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const isInactive = useInactivity(5000);

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div
      className={cn(
        "absolute right-4 bottom-4 flex items-center gap-2 transition duration-500",
        isInactive ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <AnimatedFloatingButton
        onMouseEnter={() => import("../settings/settings-sheet")}
        onClick={() => setSettingsOpen(true)}
        icon={<Settings2 />}
        label="Settings"
      />

      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />

      <AnimatedFloatingButton
        icon={isFullscreen ? <Minimize2 /> : <Maximize2 />}
        label={isFullscreen ? "Exit" : "Fullscreen"}
        onClick={toggleFullscreen}
      />
    </div>
  );
}
