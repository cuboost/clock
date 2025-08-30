import { Textarea } from "@/components/ui/textarea";
import { useClockSettings } from "@/context/clock-settings-context";
import { SettingsSection } from "../ui/settings-section";

export function CustomCSSSection() {
  const { settings, updateSetting } = useClockSettings();

  return (
    <SettingsSection
      title="Custom CSS"
      description="Add custom CSS properties to the <html> tag."
    >
      <Textarea
        id="custom"
        value={settings.customCSS}
        onChange={(e) => updateSetting("customCSS", e.target.value)}
        placeholder="opacity: 0.5;"
      />
    </SettingsSection>
  );
}
