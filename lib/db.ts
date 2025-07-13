import Dexie, { Table } from "dexie";

export type BackgroundType = "image" | "color" | "gradient";
export type ThemeType =
  | "default"
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";

export interface ClockSettings {
  id: string;
  showSeconds: boolean;
  twelveHourFormat: boolean;
  showAmPm: boolean;
  showDate: boolean;
  showTimeInTab: boolean;
  customTabTitle: string;
  backgroundType: BackgroundType;
  backgroundValue: string;
  theme: ThemeType;
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
