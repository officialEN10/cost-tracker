import { Attachment } from './attachment';

export class Expense {
  id: string;
  concept: string;
  amount: number;
  date: Date;
  userId: string;
  categoryId: string;
  attachment: Attachment;
}
