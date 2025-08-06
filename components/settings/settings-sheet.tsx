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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

type SettingsSheetProps = {
  children: React.ReactNode;
};

// Define an array of tab objects without a separate 'label' property
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

export function SettingsSheet({ children }: SettingsSheetProps) {
  const { loading } = useClockSettings();
  const [settingTab, setSettingTab] = useState("general");

  if (loading) return null;

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="overflow-scroll will-change-transform">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="text-2xl">Settings</SheetTitle>
        </SheetHeader>

        <div className="p-6 pt-0">
          <Tabs
            value={settingTab}
            onValueChange={setSettingTab}
            className="gap-3"
          >
            <TabsList className="w-full">
              {settingsTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {capitalizeFirstLetter(tab.value)}
                </TabsTrigger>
              ))}
            </TabsList>

            {settingsTabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid flex-1 auto-rows-min gap-3"
              >
                {tab.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
