// mockData.ts
export interface MacroBreakdown {
  calories: number;
  protein: number;       // in grams
  carbohydrates: number; // in grams
  fats: number;          // in grams
  fiber: number;         // in grams
  sodium?: number;       // in mg
  sugar?: number;        // in g
}

export interface MealItem {
  id: string;
  name: string;
  portion: string;
  macros: MacroBreakdown;
  time: string;
}

export interface DayIntake {
  day: string;
  shortDay: string;
  date: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  weight: number;      // in kg
  targetWeight: number;// in kg
  height: number;      // in cm
  bmi: number;
  dietPreference: string;
  dailyCalorieTarget: number;
}

export const initialProfile: UserProfile = {
  name: 'Karthik',
  email: 'karthik@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  weight: 68.5,
  targetWeight: 65.0,
  height: 175,
  bmi: 22.4,
  dietPreference: 'Non-Vegetarian / High Protein',
  dailyCalorieTarget: 2100,
};

// 7-day nutritional intake history for graphs and diagnostics
export const weeklyIntakeHistory: DayIntake[] = [
  { day: 'Mon', shortDay: 'M', date: 2, calories: 1780, protein: 74, carbs: 230, fats: 48 },
  { day: 'Tue', shortDay: 'T', date: 3, calories: 2050, protein: 98, carbs: 260, fats: 52 },
  { day: 'Wed', shortDay: 'W', date: 4, calories: 1920, protein: 82, carbs: 245, fats: 56 },
  { day: 'Thu', shortDay: 'T', date: 5, calories: 1680, protein: 68, carbs: 210, fats: 44 },
  { day: 'Fri', shortDay: 'F', date: 6, calories: 1850, protein: 85, carbs: 225, fats: 50 },
  { day: 'Sat', shortDay: 'S', date: 7, calories: 2180, protein: 92, carbs: 275, fats: 58 },
  { day: 'Sun', shortDay: 'S', date: 8, calories: 1540, protein: 62, carbs: 190, fats: 42 },
];

export const initialLoggedMeals: MealItem[] = [
  {
    id: 'm1',
    name: 'Steamed Idli with Sambar & Chutney',
    portion: '3 pieces (150g)',
    macros: { calories: 310, protein: 9.5, carbohydrates: 58, fats: 3.2, fiber: 4.8 },
    time: '8:30 AM',
  },
]