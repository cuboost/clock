"use client";

import { useClockSettings } from "@/context/clock-settings-context";
import { useClock } from "@/hooks/use-clock";
import { useTabTitle } from "@/hooks/use-tab-title";
import { useThemeColor } from "@/hooks/use-theme-color";
import { positionClasses } from "@/lib/clock-positions";
import { cn } from "@/lib/utils";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export function ClockDisplay() {
  const time = useClock();
  const { settings, loading, updateSetting } = useClockSettings();
  const clockColor = useThemeColor("clock");
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const displayDate = formattedDate.replace(",", " -");

  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useTabTitle();

  useEffect(() => {
    if (settings.clockPosition.preset === "custom") {
      x.set(settings.clockPosition.custom?.x ?? 0);
      y.set(-(settings.clockPosition.custom?.y ?? 0));
    } else {
      x.set(0);
      y.set(0);
    }
  }, [
    settings.clockPosition.preset,
    settings.clockPosition.custom?.x,
    settings.clockPosition.custom?.y,
    x,
    y,
  ]);

  const handleDragEnd = () => {
    if (settings.clockPosition.preset !== "custom") return;

    const container = containerRef.current;
    const clockElement = clockRef.current; // Use the new ref
    if (!container || !clockElement) return;

    const bounds = container.getBoundingClientRect();
    const clockBounds = clockElement.getBoundingClientRect();

    let newX = x.get();
    let newY = y.get();

    const clockHalfWidth = clockBounds.width / 2;
    const clockHalfHeight = clockBounds.height / 2;

    const maxMoveX = bounds.width / 2 - clockHalfWidth;
    const maxMoveY = bounds.height / 2 - clockHalfHeight;

    newX = Math.max(-maxMoveX, Math.min(maxMoveX, newX));
    newY = Math.max(-maxMoveY, Math.min(maxMoveY, newY));

    updateSetting("clockPosition", {
      preset: "custom",
      custom: {
        x: newX,
        y: -newY,
      },
    });
  };

  if (loading) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full transition-all duration-300",
        settings.clockPosition.preset !== "custom" &&
          "flex " + positionClasses[settings.clockPosition.preset],
      )}
    >
      <motion.div
        ref={clockRef}
        drag={settings.clockPosition.preset === "custom"}
        dragConstraints={containerRef}
        dragMomentum={false}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
        layout
        style={{
          x,
          y,
          color: clockColor,
        }}
        transition={{
          type: "spring",
          stiffness: settings.clockPosition.preset === "custom" ? 100 : 300,
          damping: 20,
        }}
        className={cn(
          "flex h-fit flex-col items-center justify-center gap-2 p-2",
          settings.clockPosition.preset === "custom"
            ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
            : "",
        )}
      >
        <h1
          className="flex items-center justify-center tracking-widest tabular-nums select-none"
          style={{
            fontSize: settings.clockSize,
            fontFamily: settings.clockFontFamily,
          }}
        >
          {settings.twelveHourFormat ? time.amPmHours : time.hours}:
          {time.minutes}
          {settings.showSeconds &&
            !(settings.AmPmUnderSeconds && settings.showAmPm) &&
            `:${time.seconds}`}
          {settings.showAmPm && !settings.AmPmUnderSeconds && ` ${time.amPm}`}
          {settings.showAmPm && settings.AmPmUnderSeconds && (
            <div
              className={cn(
                "flex h-full flex-col leading-none",
                settings.AmPmUnderSeconds &&
                  settings.showSeconds &&
                  "text-[40%]",
              )}
              style={{
                marginLeft: `calc(${settings.clockSize}rem * 0.013)`,
              }}
            >
              {settings.showSeconds && <span>{time.seconds}</span>}
              <span>{time.amPm}</span>
            </div>
          )}
        </h1>

        {settings.showDate && (
          <h2
            className="tracking-wider select-none"
            style={{
              fontSize: settings.dateSize,
              fontFamily: settings.dateFontFamily,
            }}
          >
            {displayDate}
          </h2>
        )}
      </motion.div>
    </div>
  );
}
