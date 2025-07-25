import { useClockSettings } from "@/context/clock-settings-context";
import { useClock } from "./use-clock";
import { useEffect } from "react";

export function useTabTitle() {
  const time = useClock();
  const { settings, loading } = useClockSettings();

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
}
