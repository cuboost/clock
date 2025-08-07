"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";

const themeOptions = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: SunMoon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-evenly">
      {themeOptions.map(({ value, icon: Icon }) => (
        <Button
          key={value}
          value={value}
          onClick={() => setTheme(value)}
          variant="outline"
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition ${theme === value ? "bg-foreground! text-background!" : ""}`}
        >
          <Icon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      ))}
    </div>
  );
}
