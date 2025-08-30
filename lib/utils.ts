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

export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

export function formatTime(
  totalSeconds: number,
  milliseconds?: number,
  showHours = true,
  showCentiseconds = false,
) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  const parts = [];
  if (showHours || h > 0) {
    parts.push(h.toString().padStart(2, "0"));
  }
  parts.push(m.toString().padStart(2, "0"));
  parts.push(s.toString().padStart(2, "0"));

  const base = parts.join(":");
  if (showCentiseconds && milliseconds) {
    const centiseconds = Math.floor(milliseconds / 10)
      .toString()
      .padStart(2, "0");
    return `${base}.${centiseconds}`;
  } else {
    return base;
  }
}

/**
 * Parses a flexible time input.
 * Supports:
 * - "45" => 45s
 * - "3:15" => 3m 15s
 * - "1:02:30" => 1h 2m 30s
 */
export function parseFlexibleTimeInput(input: string): number | null {
  const parts = input.split(":").map((p) => p.trim());
  if (parts.some((p) => p === "" || isNaN(Number(p)))) return null;

  const nums = parts.map(Number);

  if (nums.length === 1) {
    return nums[0]; // seconds only
  } else if (nums.length === 2) {
    return nums[0] * 60 + nums[1];
  } else if (nums.length === 3) {
    return nums[0] * 3600 + nums[1] * 60 + nums[2];
  }

  return null; // invalid
}

export function formatEndTime(secondsLeft: number) {
  return new Date(Date.now() + secondsLeft * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
