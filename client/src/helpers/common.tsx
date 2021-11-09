import { EntryPayload } from '../components/Chart';
import { Entry } from '../entities/Night';

export const capitalise = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

export const spacePascalCase = (s: string): string => s.replace(/([A-Z])/g, ' $1').trim();

export const countBools = (obj: Entry['observations']): number => {
  return Object.entries(obj).filter(([, v]) => Boolean(v)).length;
};

export const transformObservationsToStringArray = (obj: Entry['observations']): string[] => {
  return Object.entries(obj)
    .filter(([, v]) => v)
    .map((tuple) => tuple[0]);
};

export const transformItemsForChartDisplay = (items: Entry[]): EntryPayload[] => {
  const transformedData = items.map(({ _id, date, observations }) => {
    const problems = countBools(observations);
    const problemsWithNames = transformObservationsToStringArray(observations);
    return { _id, date, problems, problemsWithNames };
  });
  return transformedData;
};
