import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ThemeType } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThemePrimaryColor(themeName: ThemeType) {
  // Create a temporary element
  const temp = document.createElement("div");
  temp.setAttribute("data-theme", themeName);
  temp.style.display = "none";
  document.body.appendChild(temp);

  // Get computed style
  const color = getComputedStyle(temp).getPropertyValue("--primary");

  // Remove temp element
  document.body.removeChild(temp);

  return color.trim();
}

export function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}
