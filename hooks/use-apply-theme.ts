"use client";

import { useEffect } from "react";
import { useClockSettings } from "@/context/clock-settings-context";

export function useApplyTheme() {
  const { settings } = useClockSettings();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);

    // Select the root element (usually the `html` or `body` tag)
    const rootElement = document.documentElement;

    // Split the custom CSS string into individual lines
    const cssLines = settings.customCSS.split(";");

    // Loop through each line and apply the CSS variable
    cssLines.forEach((line) => {
      const [variable, value] = line.trim().split(":");

      if (variable && value) {
        // Use `setProperty` to set the custom CSS variable
        rootElement.style.setProperty(variable.trim(), value.trim());
      }
    });
  }, [settings.customCSS, settings.theme]);
}
