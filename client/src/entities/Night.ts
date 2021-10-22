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
}

export interface Conditions {
  temperature: number;
  freshAir: boolean;
  fed: boolean;
  mentalStatus: number;
  noDrinks1HourBefore: boolean;
  noCaffeine4HoursBefore: boolean;
  noElectronicDevices: boolean;
}

export interface Break {
  start: Date;
  end: Date;
}

export interface FormBreak {
  start?: Date;
  end?: Date;
}
