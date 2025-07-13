"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useClockSettings } from "@/context/clock-settings-context";
import { Settings2 } from "lucide-react";
import { ConfirmationDialog } from "./confirmation-dialog";
import { SettingsSwitch } from "./settings-switch";

export function SettingsSheet() {
  const { settings, updateSetting, loading, resetSettings } =
    useClockSettings();

  if (loading) return null;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="absolute right-4 bottom-4">
          <Settings2 className="h-10 w-10" />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-5 mb-4">
          <h3>Elements</h3>
          <SettingsSwitch
            id="show-seconds"
            label="Seconds"
            checked={settings.showSeconds}
            onChange={(value) => updateSetting("showSeconds", value)}
          />
          <SettingsSwitch
            id="show-date"
            label="Date"
            checked={settings.showDate}
            onChange={(value) => updateSetting("showDate", value)}
          />

          <h3>Format</h3>
          <SettingsSwitch
            id="twelve-hour-format"
            label="12h Format"
            checked={settings.twelveHourFormat}
            onChange={(value) => updateSetting("twelveHourFormat", value)}
          />
          <SettingsSwitch
            id="show-am-pm"
            label="Show AM/PM"
            checked={settings.showAmPm}
            onChange={(value) => updateSetting("showAmPm", value)}
          />

          <h3>Tab</h3>
          <SettingsSwitch
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
                onChange={(e) =>
                  updateSetting("customTabTitle", e.target.value)
                }
              />
            </div>
          )}

          <h3>Background</h3>
          <div className="grid gap-3">
            <Label htmlFor="image-link">Image Link</Label>
            <Input
              id="image-link"
              placeholder="https://example.com/image.png"
            />
          </div>

          <h3>Reset</h3>
          <p>Remove all your custom settings stored locally on this device.</p>
          <ConfirmationDialog
            title="Reset Settings?"
            description="This action is irreversible and will remove all your custom settings stored locally on this device."
            trigger={<Button variant="destructive">Reset to Defaults</Button>}
            onConfirm={() => {
              resetSettings();
            }}
            confirmText="Reset"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
