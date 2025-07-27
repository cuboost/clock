import Dexie, { Table } from "dexie";

export type BackgroundType = "image" | "color" | "gradient";
export type ClockPositionXType = "left" | "center" | "right";
export type ClockPositionYType = "top" | "center" | "bottom";
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
  backgroundCustomValue: string;
  theme: ThemeType;
  clockPosition: {
    x: ClockPositionXType;
    y: ClockPositionYType;
  };
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
