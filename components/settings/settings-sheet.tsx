"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useClockSettings } from "@/context/clock-settings-context";
import AppearanceSettings from "./appearance-settings";
import GeneralSettings from "./general-settings";
import MoreSettings from "./more-settings";

type SettingsSheetProps = {
  children: React.ReactNode;
};

export function SettingsSheet({ children }: SettingsSheetProps) {
  const { loading } = useClockSettings();

  if (loading) return null;
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="mb-4 grid flex-1 auto-rows-min gap-6 px-5">
          <GeneralSettings />
          <AppearanceSettings />
          <MoreSettings />
        </div>
      </SheetContent>
    </Sheet>
  );
}
