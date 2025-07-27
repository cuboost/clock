"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { db, ClockSettings } from "@/lib/db";

const DEFAULT_SETTINGS: ClockSettings = {
  id: "settings",
  showSeconds: true,
  twelveHourFormat: true,
  showAmPm: true,
  showDate: false,
  showTimeInTab: true,
  customTabTitle: "Clock",
  clockColorValues: {
    light: "#000000",
    dark: "#ffffff",
  },
  backgroundType: "color",
  backgroundColorValues: {
    light: "#ffffff",
    dark: "#000000",
  },
  backgroundGradientValues: {
    light: "#ffffff",
    dark: "#000000",
  },
  backgroundImageLink: "",
  backgroundCustomValue: "",
  backgroundImageBlur: 10,
  backgroundImageBrightness: 1,
  backgroundImageContrast: 1,
  backgroundImageGrayscale: 0,
  theme: "default",
  clockPosition: {
    x: "center",
    y: "center",
  },
};

type ClockSettingsContextType = {
  settings: ClockSettings;
  updateSetting: <K extends keyof ClockSettings>(
    key: K,
    value: ClockSettings[K],
  ) => void;
  updateSettings: (values: Partial<ClockSettings>) => void;
  loading: boolean;
  resetSettings: () => void;
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

  return (
    <ClockSettingsContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettings,
        loading,
        resetSettings,
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
