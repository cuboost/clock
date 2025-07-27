export function createTimeObject(date: Date) {
  const hours = date.getHours();
  return {
    hours: hours.toString().padStart(2, "0"),
    amPmHours: (hours % 12 || 12).toString().padStart(2, "0"),
    amPm: hours >= 12 ? "PM" : "AM",
    minutes: date.getMinutes().toString().padStart(2, "0"),
    seconds: date.getSeconds().toString().padStart(2, "0"),
    day: date.getDate().toString().padStart(2, "0"),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    year: date.getFullYear().toString(),
    toLocaleDateString: (
      locales?: string | string[],
      options?: Intl.DateTimeFormatOptions,
    ) => {
      return date.toLocaleDateString(locales, options);
    },
  };
}

export type TimeObject = ReturnType<typeof createTimeObject>;
