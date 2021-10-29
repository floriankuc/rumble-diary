export interface FormNight {
  _id?: string;
  date?: Date | null;
  startTime?: Date;
  endTime?: Date;
  breaks?: FormBreak[];
  nightmares: boolean;
  noise: boolean;
  quality: number;
  notes: string;
  conditions: Conditions;
  sleepless: boolean;
}

export interface Night {
  readonly _id: string;
  readonly date: Date;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly breaks?: Break[];
  readonly nightmares: boolean;
  readonly noise: boolean;
  readonly quality: number;
  readonly notes: string;
  readonly conditions: Conditions;
  readonly sleepless: boolean;
  readonly duration: number;
}

export interface Conditions {
  readonly temperature: number;
  readonly freshAir: boolean;
  readonly fed: boolean;
  readonly mentalStatus: number;
  readonly noDrinks1HourBefore: boolean;
  readonly noCaffeine4HoursBefore: boolean;
  readonly noElectronicDevices: boolean;
}

export interface Break {
  readonly start: Date;
  readonly end: Date;
}

export interface FormBreak {
  start?: Date;
  end?: Date;
}
