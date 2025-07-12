"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useClockSettings } from "@/context/clock-settings-context";
import { Settings2 } from "lucide-react";
import { SettingsSwitch } from "./settings-switch";

export function SettingsSheet() {
  const { settings, updateSetting, loading } = useClockSettings();

  if (loading) return null;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="absolute right-4 bottom-4">
          <Settings2 className="h-10 w-10" />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
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

          <h3>Background</h3>
          <div className="grid gap-3">
            <Label htmlFor="image-link">Image Link</Label>
            <Input
              id="image-link"
              placeholder="https://example.com/image.png"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
