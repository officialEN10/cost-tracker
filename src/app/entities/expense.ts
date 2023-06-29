import { Attachment } from './attachment';

export interface Expense {
  _id: string;
  concept: string;
  amount: number;
  date: Date;
  userId: string;
  categoryId: string;
  attachment: Attachment;
}
