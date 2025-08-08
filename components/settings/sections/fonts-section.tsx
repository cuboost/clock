import { FontSelect } from "../ui/font-select";
import { SettingsSection } from "../ui/settings-section";

export function FontsSection() {
  return (
    <SettingsSection title="Fonts">
      <FontSelect label="Clock" id="clock-font" setting="clockFontFamily" />
      <FontSelect label="Date" id="date-font" setting="dateFontFamily" />
    </SettingsSection>
  );
}
