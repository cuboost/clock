"use client";

import { createTimeObject, TimeObject } from "@/utils/time";
import { useEffect, useState } from "react";

export function useClock() {
  const [time, setTime] = useState<TimeObject>(createTimeObject(new Date()));

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = createTimeObject(now);
      setTime((prev) => {
        if (
          prev.hours !== next.hours ||
          prev.minutes !== next.minutes ||
          prev.seconds !== next.seconds
        ) {
          return next;
        }
        return prev;
      });
    };

    tick(); // Immediate
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
