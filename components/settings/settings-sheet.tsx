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

export function SettingsSheet({ children }: SettingsSheetProps) {
  const { loading } = useClockSettings();
  const [settingTab, setSettingTab] = useState("general");

  if (loading) return null;
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <Tabs
            value={settingTab}
            onValueChange={(value) =>
              setSettingTab(value as "general" | "appearance" | "more")
            }
          >
            <TabsList className="w-full">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>
            <TabsContent
              value="general"
              className="mb-4 grid flex-1 auto-rows-min gap-6"
            >
              <GeneralSettings />
            </TabsContent>
            <TabsContent
              value="appearance"
              className="mb-4 grid flex-1 auto-rows-min gap-6"
            >
              <AppearanceSettings />
            </TabsContent>
            <TabsContent
              value="more"
              className="mb-4 grid flex-1 auto-rows-min gap-6"
            >
              <MoreSettings />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
