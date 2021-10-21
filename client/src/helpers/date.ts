import { differenceInMinutes } from 'date-fns';
import { Break, FormBreak } from '../entities/Night';

export const outputMinutes = (mins: number): string => {
  const phours = `${Math.floor(mins / 60)}`.padStart(2, '0');
  const pmins = `${mins % 60}`.padStart(2, '0');
  return mins < 60 ? `${mins} mins` : `${phours}:${pmins} h`;
};

export const sumUpBreaksInMinutes = (breaks: (FormBreak | Break)[] = []): number => {
  return breaks.reduce((a: number, b: Break | FormBreak): number => {
    if (b.end && b.start) {
      return a + differenceInMinutes(b.end, b.start);
    } else {
      return 0;
    }
  }, 0);
};

export const calculateDifferenceInMinutes = (endTime: Date, startTime: Date): number => differenceInMinutes(endTime, startTime);

export const calculateDurationInMinutes = (startTime: Date, endTime: Date, breaks: (FormBreak | Break)[] = []): number => {
  if (!breaks) {
    return startTime && endTime && calculateDifferenceInMinutes(endTime, startTime);
  }
  return startTime && endTime && calculateDifferenceInMinutes(endTime, startTime) - sumUpBreaksInMinutes(breaks);
};
