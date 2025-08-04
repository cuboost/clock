"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-evenly">
      <Button
        value="light"
        className={`ring-muted-foreground relative m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ring-offset-3 transition focus:outline-none focus-visible:ring-3 ${theme == "light" ? "ring-3" : "ring-2"}`}
        onClick={() => setTheme("light")}
        variant={"ghost"}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        value="dark"
        className={`ring-muted-foreground relative m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ring-offset-3 transition focus:outline-none focus-visible:ring-3 ${theme == "dark" ? "ring-3" : "ring-2"}`}
        onClick={() => setTheme("dark")}
        variant={"ghost"}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        value="system"
        className={`ring-muted-foreground relative m-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ring-offset-3 transition focus:outline-none focus-visible:ring-3 ${theme == "system" ? "ring-3" : "ring-2"}`}
        onClick={() => setTheme("system")}
        variant={"ghost"}
      >
        <SunMoon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
}
