import {
  DEFAULT_SETTINGS,
  useClockSettings,
} from "@/context/clock-settings-context";
import { positionClasses } from "@/lib/clock-positions";
import { ClockPositionType } from "@/lib/db";
import { Calendar, Clock } from "lucide-react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { ColorInput } from "../ui/color-input";
import { SettingsSection } from "../ui/settings-section";
import { SliderInput } from "../ui/slider-input";

export function ClockAppearanceSection() {
  const { settings, updateSetting } = useClockSettings();
  const clockPositions = Object.keys(positionClasses) as ClockPositionType[];
  const axes = ["x", "y"] as const;

  return (
    <SettingsSection title="Clock">
      <ColorInput
        id="clock-color-light"
        label="Light Theme Color"
        value={settings.clockColorValues.light}
        onValueChange={(value) =>
          updateSetting("clockColorValues", {
            light: value,
            dark: settings.clockColorValues.dark,
          })
        }
      />
      <ColorInput
        id="clock-color-dark"
        label="Dark Theme Color"
        value={settings.clockColorValues.dark}
        onValueChange={(value) =>
          updateSetting("clockColorValues", {
            light: settings.clockColorValues.light,
            dark: value,
          })
        }
      />
      <SliderInput
        id="clock-size"
        label="Clock Size"
        onValueChange={(value) => updateSetting("clockSize", value)}
        min={20}
        max={300}
        value={settings.clockSize}
        icon={<Clock />}
        defaultValue={DEFAULT_SETTINGS.clockSize}
      />
      <SliderInput
        id="date-size"
        label="Date Size"
        onValueChange={(value) => updateSetting("dateSize", value)}
        min={10}
        max={300}
        value={settings.dateSize}
        icon={<Calendar />}
        defaultValue={DEFAULT_SETTINGS.dateSize}
      />
      <div className="grid gap-3">
        <Label htmlFor="clock-position">Position</Label>
        <Select
          value={settings.clockPosition.preset}
          onValueChange={(value) => {
            if (value === "custom") {
              updateSetting("clockPosition", {
                preset: "custom",
                custom:
                  settings.clockPosition.preset === "custom"
                    ? settings.clockPosition.custom
                    : { x: 0, y: 0 },
              });
            } else {
              updateSetting(
                "clockPosition",
                value === "custom"
                  ? {
                      preset: "custom",
                      custom:
                        settings.clockPosition.preset === "custom"
                          ? settings.clockPosition.custom
                          : { x: 0, y: 0 },
                    }
                  : {
                      preset: value as ClockPositionType,
                      custom: { x: 0, y: 0 },
                    },
              );
            }
          }}
        >
          <SelectTrigger id="clock-position" className="w-full">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            {clockPositions.map((pos) => (
              <SelectItem key={pos} value={pos}>
                {pos
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {settings.clockPosition.preset === "custom" && (
        <div className="flex items-center justify-center gap-4">
          {axes.map((axis) => (
            <div key={axis} className="grid gap-3">
              <Label htmlFor={axis}>{axis.toUpperCase()} Position</Label>
              <Input
                id={axis}
                type="number"
                step="1"
                value={
                  Math.round(settings.clockPosition.custom[axis] * 10) / 10
                }
                onChange={(e) =>
                  updateSetting("clockPosition", {
                    preset: "custom",
                    custom: {
                      ...settings.clockPosition.custom,
                      [axis]:
                        Math.round((parseFloat(e.target.value) || 0) * 10) / 10,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      )}
    </SettingsSection>
  );
}
