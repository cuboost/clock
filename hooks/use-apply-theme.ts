"use client";

import { useEffect } from "react";
import { useClockSettings } from "@/context/clock-settings-context";

export function useApplyTheme() {
  const { settings } = useClockSettings();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings.theme]);
}
