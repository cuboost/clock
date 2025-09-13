"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useClockSettings } from "@/context/clock-settings-context";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AppearanceSettings } from "./pages/appearance-settings";
import { GeneralSettings } from "./pages/general-settings";
import { MoreSettings } from "./pages/more-settings";

type SettingsSheetProps = {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const settingsTabs = [
  {
    value: "general",
    component: <GeneralSettings />,
  },
  {
    value: "appearance",
    component: <AppearanceSettings />,
  },
  {
    value: "more",
    component: <MoreSettings />,
  },
];

export function SettingsSheet({
  children,
  open,
  onOpenChange,
}: SettingsSheetProps) {
  const { loading } = useClockSettings();
  const [settingTab, setSettingTab] = useState("general");

  if (loading) return null;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col sm:rounded-l-xl">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="text-2xl">Settings</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden pt-0">
          <Tabs
            value={settingTab}
            onValueChange={setSettingTab}
            className="flex flex-1 flex-col overflow-hidden"
          >
            {/* Tabs list stays fixed */}
            <div className="mx-6">
              <TabsList className="w-full flex-shrink-0">
                {settingsTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {capitalizeFirstLetter(tab.value)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Scrollable content */}
            <div
              className="flex-1 overflow-y-auto px-6 pt-3 pb-6"
              style={{ scrollbarGutter: "stable" }}
            >
              {settingsTabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="grid auto-rows-min gap-4"
                >
                  {tab.component}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
