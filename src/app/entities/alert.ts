export interface Alert {
  _id?: string;
  name: string;
  condition: string;
  amount: number;
  message: string;
  triggered_at?: Date;
  triggered_history?: Date[];
  status?: string;
  userId?: string;
  categoryId: string;
}
