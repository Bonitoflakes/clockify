import { findMonday } from "@utils";

export const groupByDate = (data: any[]): { string: IEntry[] } => {
  const dates = data.reduce((acc, curr) => {
    const key = curr.date;
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, curr] };
  }, {});
  return dates;
};

export const groupByWeek = (obj: any) => {
  const dates = Object.entries(obj).reduce((prev: any, curr) => {
    //
    const curDate = new Date(curr[0]);
    const startDate = findMonday(curDate.toString());
    const startDateStr = startDate.toISOString().slice(0, 10);

    if (!prev[startDateStr]) {
      prev[startDateStr] = [];
    }

    prev[startDateStr].push(curr);

    return prev;
  }, {});
  return dates;
};
