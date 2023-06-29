import { Alert } from './alert';
import { Expense } from './expense';

export interface Category {
  _id: string;
  name: string;
  maxValue: number;
  minValue: number;
  userId: string;
  current_value: number;
  alerts: Alert[];
  expenses: Expense[];
}
