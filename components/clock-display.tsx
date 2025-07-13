"use client";

import { useEffect } from "react";
import { useClock } from "@/hooks/use-clock";
import { useClockSettings } from "@/context/clock-settings-context";

export function ClockDisplay() {
  const time = useClock();
  const { settings, loading } = useClockSettings();

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
    <div>
      <h1 className="select-none text-5xl tracking-widest">
        {settings.twelveHourFormat ? time.amPmHours : time.hours}:{time.minutes}
        {settings.showSeconds && `:${time.seconds}`}
        {settings.showAmPm && ` ${time.amPm}`}
      </h1>

      {settings.showDate && (
        <h2 className="tracking-wider text-xl">
          {time.day}/{time.month}/{time.year}
        </h2>
      )}
    </div>
  );
}
