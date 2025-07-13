import Dexie, { Table } from "dexie";

export interface ClockSettings {
  id: string;
  showSeconds: boolean;
  twelveHourFormat: boolean;
  showAmPm: boolean;
  showDate: boolean;
  showTimeInTab: boolean;
  customTabTitle: string;
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
