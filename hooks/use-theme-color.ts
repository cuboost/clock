import { useClockSettings } from "@/context/clock-settings-context";
import { useTheme } from "next-themes";

export function useThemeColor(key: "clock" | "background") {
  const { resolvedTheme } = useTheme();
  const { settings } = useClockSettings();

  const colorValues = settings[`${key}ColorValues`];

  return resolvedTheme === "light" ? colorValues.light : colorValues.dark;
}
