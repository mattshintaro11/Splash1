// types.ts
export interface Event {
  date: dayjs.Dayjs | null;
  duration: number;
  locations: number[];
  symptomes: number[];
  medications: number[];
  count: number;
}