import { useClockSettings } from "@/context/clock-settings-context";
import { ThemeType } from "@/lib/db";
import { THEME_COLORS } from "@/lib/theme-colors";
import { Button } from "../ui/button";
type ThemeButtonProps = {
  label: string;
  themeName: ThemeType;
};

export default function ThemeButton({ label, themeName }: ThemeButtonProps) {
  const { settings, updateSettings } = useClockSettings();
  const isActive = settings.theme === themeName;

  function handleThemeChange() {
    const newColor = THEME_COLORS[themeName];
    updateSettings({
      theme: themeName,
      clockColorValues: {
        light: newColor,
        dark: themeName == "default" ? "oklch(0.985 0 0)" : newColor,
      },
    });
  }

  return (
    <Button
      variant="ghost"
      onClick={handleThemeChange}
      aria-label={label}
      className={`focus-visible:border-ring focus-visible:ring-ring/50 relative flex h-10 w-10 items-center justify-center rounded-full transition focus-within:ring-[3px] ${isActive ? "ring-3" : ""}`}
      style={{ backgroundColor: THEME_COLORS[themeName] }}
    >
      <span className="sr-only">{label}</span>
    </Button>
  );
}
