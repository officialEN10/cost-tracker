import { Alert } from './alert';
import { Category } from './category';
import { Expense } from './expense';

export class User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  categories: Category[];
  expenses: Expense[];
  alerts: Alert[];
}
