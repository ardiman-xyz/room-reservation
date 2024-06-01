import { addHours, startOfDay, endOfDay } from "date-fns";

export const getStartDateAndTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  const date = startOfDay(dateTime);
  const time = addHours(date, dateTime.getHours());

  return { date, time };
};

export const getEndDateAndTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  const date = endOfDay(dateTime);
  const time = addHours(date, dateTime.getHours());

  return { date, time };
};
