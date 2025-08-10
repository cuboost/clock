"use client";

import { SettingsSheet } from "@/components/settings/settings-sheet";
import { Button } from "@/components/ui/button";
import { useFullscreen } from "@/context/fullscreen-context";
import { useInactivity } from "@/hooks/use-inactivity";
import { useThemeColor } from "@/hooks/use-theme-color";
import { cn } from "@/lib/utils";
import {
  Clock,
  Heart,
  Maximize2,
  Minimize2,
  Settings2,
  Timer,
} from "lucide-react";
import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { CustomDialog } from "../settings/ui/custom-dialog";
import Link from "next/link";

function AnimatedFloatingButton({
  icon,
  iconWidth = 36,
  label,
  onClick,
  onMouseEnter,
  expandable = true,
  textClassName = "",
  asChild = false, // <-- Add this prop
  href, // <-- Add this prop
}: {
  icon: React.ReactNode;
  iconWidth?: number;
  label?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  expandable?: boolean;
  textClassName?: string;
  asChild?: boolean; // <-- Add this prop
  href?: string; // <-- Add this prop
}) {
  const settingsColor = useThemeColor("clock");
  const [width, setWidth] = useState(iconWidth);

  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (expandable && textRef.current && label) {
      setWidth(iconWidth + textRef.current.offsetWidth + 12);
    } else {
      setWidth(iconWidth);
    }
  }, [label, iconWidth, expandable]);

  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (expandable && label) {
      setExpanded(true);
    }
    if (onMouseEnter) onMouseEnter();
  };

  const buttonContent = (
    <>
      {icon}
      {expandable && label && (
        <motion.span
          ref={textRef}
          className={cn("whitespace-nowrap", textClassName)}
          variants={{
            collapsed: { opacity: 0 },
            expanded: { opacity: 1 },
          }}
        >
          {label}
        </motion.span>
      )}
    </>
  );

  return (
    <motion.div
      className="flex cursor-pointer items-center overflow-hidden"
      initial="collapsed"
      animate={expandable && expanded ? "expanded" : "collapsed"}
      variants={{
        collapsed: { width: iconWidth },
        expanded: { width },
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {asChild && href ? (
        <Button
          asChild
          variant="ghost"
          className="dark:focus-visible:bg-input/50 focus-visible:bg-accent flex items-center justify-center gap-2 p-2 focus-visible:ring-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => expandable && setExpanded(false)}
          onFocus={handleMouseEnter}
          onBlur={() => expandable && setExpanded(false)}
          style={{ color: settingsColor }}
        >
          <Link href={href}>{buttonContent}</Link>
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="dark:focus-visible:bg-input/50 focus-visible:bg-accent flex items-center justify-center gap-2 p-2 focus-visible:ring-0"
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => expandable && setExpanded(false)}
          onFocus={handleMouseEnter}
          onBlur={() => expandable && setExpanded(false)}
          style={{ color: settingsColor }}
        >
          {buttonContent}
        </Button>
      )}
    </motion.div>
  );
}

export function FloatingButtons() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const isInactive = useInactivity(5000);

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "absolute top-8 flex items-center rounded-xl border p-2 transition duration-500",
          isInactive ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <AnimatedFloatingButton
          icon={<Clock className="mt-0.5 h-5! w-5!" strokeWidth={2.25} />}
          label="Clock"
          iconWidth={48}
          textClassName="text-base"
          asChild
          href="/"
        />
        <AnimatedFloatingButton
          icon={<Timer className="h-6! w-6!" />}
          iconWidth={48}
          label="Timer"
          textClassName="text-base"
          asChild
          href="/timer"
        />
      </div>

      <div
        className={cn(
          "absolute right-4 bottom-4 flex items-center gap-2 transition duration-500",
          isInactive ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <CustomDialog
          title="Thank you &hearts;"
          description="Thank you for using Cuboost Clock!"
        >
          <AnimatedFloatingButton
            icon={<Heart />}
            iconWidth={40}
            expandable={false}
          />
        </CustomDialog>

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
    </>
  );
}
