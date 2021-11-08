export interface FormEntry {
  _id?: string;
  date?: Date;
  conditions?: FormConditions;
  observations?: Observations;
}

export interface Entry {
  readonly _id: string;
  readonly date: Date;
  readonly conditions: Conditions;
  readonly observations: Observations;
}

export interface Observations {
  bloating: boolean;
  nausea: boolean;
  cramps: boolean;
  diarrhoea: boolean;
  flatulence: boolean;
  diffusePain: boolean;
}
export interface Conditions {
  readonly fluidIntake: number;
  readonly medication: string;
  readonly meals: Meal[];
  readonly activities: string;
  readonly stressLevel: number;
  readonly stoolPerDay: number;
  readonly wellbeing: number;
}

export interface FormConditions {
  fluidIntake?: number;
  medication?: string;
  meals?: Meal[];
  activities?: string;
  stressLevel?: number;
  stoolPerDay?: number;
  wellbeing?: number;
}

export interface Meal {
  readonly name: string;
  readonly mealType: string;
}

export interface FormMeal {
  name?: string;
  mealType?: MealType;
}

export type MealType = 'fresh' | 'eat_out' | 'processed';
