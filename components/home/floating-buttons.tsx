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
  Hourglass,
  Maximize2,
  Minimize2,
  Settings2,
  // Timer,
} from "lucide-react";
import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { CustomDialog } from "../settings/ui/custom-dialog";
import Link from "next/link";
import Image from "next/image";

function AnimatedFloatingButton({
  icon,
  iconWidth = 36,
  label,
  onClick,
  onMouseEnter,
  expandable = true,
  textClassName = "",
  asChild = false,
  href,
}: {
  icon: React.ReactNode;
  iconWidth?: number;
  label?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  expandable?: boolean;
  textClassName?: string;
  asChild?: boolean;
  href?: string;
}) {
  const settingsColor = useThemeColor("clock");
  const [width, setWidth] = useState<number>();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (expandable && buttonRef.current && label) {
      setWidth(buttonRef.current.getBoundingClientRect().width);
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
      <Button
        ref={buttonRef}
        asChild={asChild}
        variant="ghost"
        className="dark:focus-visible:bg-input/50 focus-visible:bg-accent flex items-center justify-center gap-2 p-2 focus-visible:ring-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => expandable && setExpanded(false)}
        onFocus={handleMouseEnter}
        onBlur={() => expandable && setExpanded(false)}
        style={{ color: settingsColor }}
        onClick={onClick}
      >
        {href ? <Link href={href}>{buttonContent}</Link> : buttonContent}
      </Button>
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
        {/* <AnimatedFloatingButton
          icon={<Timer className="h-6! w-6!" />}
          iconWidth={48}
          label="Stopwatch"
          textClassName="text-base"
          asChild
          href="/stopwatch"
        /> */}
        <AnimatedFloatingButton
          icon={<Hourglass className="mt-0.5 h-5! w-5!" strokeWidth={2.25} />}
          label="Timer"
          iconWidth={48}
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
          description={
            <>
              Thanks for choosing Cuboost Clock! I believe in privacy, so
              you&apos;ll never find any trackers or ads here. It&apos;s also
              open source, so you can see for yourself on{" "}
              <a
                href="https://github.com/cuboost/clock"
                className="font-medium focus-visible:underline focus-visible:underline-offset-4"
              >
                Github
              </a>
              . If you enjoy the clean experience, please consider supporting me
              with &quot;Buy me a coffee&quot; or sharing it with friends and
              family.
              <span className="mt-3 flex items-center justify-center gap-2 md:justify-start">
                <a
                  href="https://www.buymeacoffee.com/cuboost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-visible:border-ring focus-visible:ring-ring/50 relative inline-block h-[34px] w-40 rounded-md focus-visible:ring-[3px]"
                >
                  <Image
                    src={`https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=cuboost&button_colour=737373&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=ffffff`}
                    alt="Buy me a coffee"
                    fill
                    unoptimized
                    priority
                  />
                </a>
                <a
                  href="https://github.com/cuboost/clock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-[34px] w-[34px] items-center justify-center rounded-md focus-visible:ring-[3px]"
                >
                  <Image
                    height="20"
                    width="20"
                    src="https://cdn.simpleicons.org/github/ffffff"
                    alt="GitHub Logo"
                    unoptimized
                    priority
                  />
                </a>
              </span>
            </>
          }
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
