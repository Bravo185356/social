export function FormatDate(dateStr: string) {
  const dateFromStr = new Date(dateStr);
  const [date, time] = dateFromStr.toLocaleString().split(",");
  return date + time;
}
