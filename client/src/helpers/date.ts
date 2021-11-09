import { differenceInMinutes } from 'date-fns';

export const outputMinutes = (mins: number): string => {
  const phours = `${Math.floor(mins / 60)}`.padStart(2, '0');
  const pmins = `${mins % 60}`.padStart(2, '0');
  return mins < 60 ? `${mins} mins` : `${phours}:${pmins} h`;
};

export const calculateDifferenceInMinutes = (endTime: Date, startTime: Date): number => differenceInMinutes(endTime, startTime);
