import Dexie, { Table } from "dexie";

export type BackgroundType = "image" | "color" | "gradient";
export type ClockPositionType =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "custom";

export type ThemeType =
  | "default"
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";

export const themes: ThemeType[] = [
  "default",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
];

export interface ClockSettings {
  id: string;
  showSeconds: boolean;
  twelveHourFormat: boolean;
  showAmPm: boolean;
  showDate: boolean;
  showTimeInTab: boolean;
  customTabTitle: string;
  clockColorValues: {
    light: string;
    dark: string;
  };
  backgroundType: BackgroundType;
  backgroundColorValues: {
    light: string;
    dark: string;
  };
  backgroundGradientValues: {
    light: string;
    dark: string;
  };
  backgroundImageLink: string;
  backgroundImageBlur: number;
  backgroundImageBrightness: number;
  backgroundImageContrast: number;
  backgroundImageGrayscale: number;
  customCSS: string;
  theme: ThemeType;
  clockPosition: {
    preset: ClockPositionType;
    custom: { x: number; y: number };
  };
  // clockFontFamily: string;
  // clockFontWeight: string;
  clockSize: number;
}

class ClockAppDB extends Dexie {
  settings!: Table<ClockSettings, string>;

  constructor() {
    super("ClockAppDB");
    this.version(1).stores({
      settings: "id",
    });
  }
}

export const db = new ClockAppDB();
