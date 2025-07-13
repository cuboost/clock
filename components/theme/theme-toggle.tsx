"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Tabs
        value={theme}
        onValueChange={(value) =>
          setTheme(value as "light" | "dark" | "system")
        }
      >
        <TabsList className="w-full">
          <TabsTrigger value="light">
            <Sun className="h-[1.2rem] w-[1.2rem]" /> Light
          </TabsTrigger>
          <TabsTrigger value="dark">
            <Moon className="h-[1.2rem] w-[1.2rem]" /> Dark
          </TabsTrigger>
          <TabsTrigger value="system">
            <SunMoon className="h-[1.2rem] w-[1.2rem]" /> System
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
