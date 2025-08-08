import { useClockSettings } from "@/context/clock-settings-context";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { SwitchInput } from "../ui/switch-input";
import { ThemeToggle } from "../../theme/theme-toggle";
import { SettingsSection } from "../ui/settings-section";

export function GeneralSettings() {
  const { settings, updateSetting } = useClockSettings();
  return (
    <>
      <SettingsSection title="Theme">
        <ThemeToggle />
      </SettingsSection>

      <SettingsSection title="Elements">
        <SwitchInput
          id="show-seconds"
          label="Seconds"
          checked={settings.showSeconds}
          onChange={(value) => updateSetting("showSeconds", value)}
        />
        <SwitchInput
          id="show-date"
          label="Date"
          checked={settings.showDate}
          onChange={(value) => updateSetting("showDate", value)}
        />
      </SettingsSection>

      <SettingsSection title="Time Format">
        <SwitchInput
          id="twelve-hour-format"
          label="12h Format"
          checked={settings.twelveHourFormat}
          onChange={(value) => updateSetting("twelveHourFormat", value)}
        />
        <SwitchInput
          id="show-am-pm"
          label="Show AM/PM"
          checked={settings.showAmPm}
          onChange={(value) => updateSetting("showAmPm", value)}
        />
        {settings.showAmPm && settings.showSeconds && (
          <SwitchInput
            id="am-pm-under-seconds"
            label="AM/PM Under Seconds"
            checked={settings.AmPmUnderSeconds}
            onChange={(value) => updateSetting("AmPmUnderSeconds", value)}
          />
        )}
      </SettingsSection>

      <SettingsSection title="Tab">
        <SwitchInput
          id="show-time-in-tab"
          label="Show Time in Tab"
          checked={settings.showTimeInTab}
          onChange={(value) => updateSetting("showTimeInTab", value)}
        />
        {!settings.showTimeInTab && (
          <div className="grid gap-3">
            <Label htmlFor="custom-tab-title">Custom Tab Title</Label>
            <Input
              id="custom-tab-title"
              value={settings.customTabTitle ?? ""}
              onChange={(e) => updateSetting("customTabTitle", e.target.value)}
            />
          </div>
        )}
      </SettingsSection>
    </>
  );
}
