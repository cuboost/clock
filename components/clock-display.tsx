"use client";

import { useClockSettings } from "@/context/clock-settings-context";
import { useClock } from "@/hooks/use-clock";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ClockDisplay() {
  const time = useClock();
  const { settings, loading } = useClockSettings();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    if (loading) {
      document.title = "...";
      return;
    }

    if (settings.showTimeInTab) {
      const timeString = settings.twelveHourFormat
        ? `${time.amPmHours}:${time.minutes}${
            settings.showSeconds ? `:${time.seconds}` : ""
          }${settings.showAmPm ? ` ${time.amPm}` : ""}`
        : `${time.hours}:${time.minutes}${
            settings.showSeconds ? `:${time.seconds}` : ""
          }`;

      document.title = timeString;
    } else {
      document.title = settings.customTabTitle || "Clock";
    }
  }, [time, settings, loading]);

  if (loading) return null;

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="flex h-full w-full items-center justify-center"
      style={{
        color:
          resolvedTheme == "light"
            ? settings.clockColorValues.light
            : settings.clockColorValues.dark,
      }}
    >
      <h1 className="text-5xl tracking-widest select-none">
        {settings.twelveHourFormat ? time.amPmHours : time.hours}:{time.minutes}
        {settings.showSeconds && `:${time.seconds}`}
        {settings.showAmPm && ` ${time.amPm}`}
      </h1>

      {settings.showDate && (
        <h2 className="text-xl tracking-wider">
          {time.day}/{time.month}/{time.year}
        </h2>
      )}
    </motion.div>
  );
}
