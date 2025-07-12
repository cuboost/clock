"use client";

import { useClockSettings } from "@/context/clock-settings-context";
import { useClock } from "@/hooks/use-clock";

export function ClockDisplay() {
  const time = useClock();
  const { settings, loading } = useClockSettings();

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
