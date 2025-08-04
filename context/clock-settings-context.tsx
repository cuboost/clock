"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { db, ClockSettings } from "@/lib/db";
import { toast } from "sonner";

const DEFAULT_SETTINGS: ClockSettings = {
  id: "settings",
  showSeconds: true,
  twelveHourFormat: false,
  showAmPm: false,
  showDate: true,
  showTimeInTab: true,
  customTabTitle: "Clock",
  clockColorValues: { light: "#000000", dark: "#ffffff" },
  backgroundType: "color",
  backgroundColorValues: { light: "#ffffff", dark: "#000000" },
  backgroundGradientValues: { light: "#ffffff", dark: "#000000" },
  backgroundImageLink: "",
  backgroundCustomValue: "",
  backgroundImageBlur: 10,
  backgroundImageBrightness: 1,
  backgroundImageContrast: 1,
  backgroundImageGrayscale: 0,
  theme: "default",
  clockPosition: { preset: "center", custom: { x: 0, y: 0 } },
  clockSize: 70,
};

type ClockSettingsContextType = {
  settings: ClockSettings;
  updateSetting: <K extends keyof ClockSettings>(
    key: K,
    value: ClockSettings[K],
  ) => void;
  updateSettings: (values: Partial<ClockSettings>) => void;
  resetSettings: () => void;
  generateShareLink: () => Promise<string>;
  loading: boolean;
};

const ClockSettingsContext = createContext<ClockSettingsContextType | null>(
  null,
);

export function ClockSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<ClockSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get("settings");

      if (encoded) {
        try {
          const decoded = JSON.parse(atob(encoded));
          setSettings(decoded);
          await db.settings.put(decoded);

          setLoading(false);
          return;
        } catch (err) {
          console.error("Failed to decode settings:", err);
          setTimeout(() => toast.error("Invalid shared settings"), 100);
        } finally {
          // Clear the URL parameter
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }
      }

      const saved = await db.settings.get("settings");
      if (saved) {
        setSettings(saved);
      } else {
        await db.settings.put(DEFAULT_SETTINGS);
        setSettings(DEFAULT_SETTINGS);
      }
      setLoading(false);
    };

    load();
  }, []);

  const updateSetting = async <K extends keyof ClockSettings>(
    key: K,
    value: ClockSettings[K],
  ) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await db.settings.put(updated);
  };

  const updateSettings = async (values: Partial<ClockSettings>) => {
    const updated = { ...settings, ...values };
    setSettings(updated);
    await db.settings.put(updated);
  };

  const resetSettings = async () => {
    setSettings(DEFAULT_SETTINGS);
    await db.settings.put(DEFAULT_SETTINGS);
  };

  const generateShareLink = async () => {
    const saved = await db.settings.get("settings");
    const toEncode = saved || settings;
    return `${window.location.origin}?settings=${btoa(JSON.stringify(toEncode))}`;
  };

  return (
    <ClockSettingsContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettings,
        resetSettings,
        generateShareLink,
        loading,
      }}
    >
      {children}
    </ClockSettingsContext.Provider>
  );
}

export function useClockSettings() {
  const context = useContext(ClockSettingsContext);
  if (!context)
    throw new Error(
      "useClockSettings must be used within ClockSettingsProvider",
    );
  return context;
}
