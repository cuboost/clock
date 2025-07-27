import { useClockSettings } from "@/context/clock-settings-context";
import { ThemeType } from "@/lib/db";
import { THEME_COLORS } from "@/lib/theme-colors";
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
    <button
      type="button"
      onClick={handleThemeChange}
      aria-label={label}
      className={`ring-muted-foreground relative m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ring-offset-3 transition focus:outline-none focus-visible:ring-3 ${isActive ? "ring-3" : "ring-2"}`}
      style={{ backgroundColor: THEME_COLORS[themeName] }}
    >
      <span className="sr-only">{label}</span>
    </button>
  );
}
