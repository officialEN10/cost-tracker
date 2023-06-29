import { Alert } from './alert';
import { Category } from './category';
import { Expense } from './expense';

export interface User {
  _id?: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  role?: string;
  categories?: Category[];
  expenses?: Expense[];
  alerts?: Alert[];
}
