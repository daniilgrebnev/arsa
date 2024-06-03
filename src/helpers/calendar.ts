import { DateTime } from "ts-luxon";

export const getNeedDisplayedPrev = (
  array: any[]
): {
  needDisplayedCount: number;
} => {
  if (array[0].dayOfWeekNumber === 1) {
    return {
      needDisplayedCount: 0,
    };
  }
  return {
    needDisplayedCount: array[0].dayOfWeekNumber - 1,
  };
};

export const getNeedDisplayedNext = (
  array: any[]
): {
  needDisplayedCount: number;
} => {
  return {
    needDisplayedCount: 7 - array[array.length - 1].dayOfWeekNumber,
  };
};

export const generateMonthDays = (
  month: number,
  year: number
): Array<{ dayOfMonth: number; month: number; dayOfWeekNumber: number }> => {
  const daysInMonth = DateTime.local(year, month).daysInMonth;
  const monthDays: Array<{
    dayOfMonth: number;
    month: number;
    dayOfWeekNumber: number;
  }> = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = DateTime.local(year, month, day);
    monthDays.push({
      dayOfMonth: day,
      month: date.month,
      dayOfWeekNumber: date.weekday,
    });
  }

  return monthDays;
};
