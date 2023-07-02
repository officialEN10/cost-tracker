export interface Attachment {
  _id?: string;
  fileName: string;
  type: string;
  size: number;
  storageLocation: string;
  expenseId: string;
}
