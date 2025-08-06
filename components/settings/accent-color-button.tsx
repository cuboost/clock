import { useClockSettings } from "@/context/clock-settings-context";
import { ThemeType } from "@/lib/db";
import { THEME_COLORS } from "@/lib/theme-colors";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
type AccentColorButtonProps = {
  label: string;
  themeName: ThemeType;
};

export default function AccentColorButton({
  label,
  themeName,
}: AccentColorButtonProps) {
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
      variant="outline"
      onClick={handleThemeChange}
      aria-label={label}
      className={cn(
        "focus-visible:ring-ring relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none",
        isActive
          ? "ring-ring border-none bg-white p-[2px] ring-2" // outer ring + smaller inner circle
          : "bg-white", // fallback bg if not using THEME_COLORS
      )}
      style={{
        backgroundColor: isActive ? undefined : THEME_COLORS[themeName],
      }}
    >
      {/* Inner circle that shrinks when active */}
      <div
        className={cn(
          "h-full w-full rounded-full transition-all duration-200",
          isActive ? "scale-90 bg-[inherit]" : "",
        )}
        style={{ backgroundColor: THEME_COLORS[themeName] }}
      >
        <span className="sr-only">{label}</span>
      </div>
    </Button>
  );
}
