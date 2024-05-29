export type Transaction = {
  id: string;
  // name: string;
  date: Date;
  payee: string;
  amount: number;
  notes: string | null;
  accountId: string;
  categoryId: string | null;
  account?: string | null;
  category?: string | null;
};

export interface BodyTransaction extends Omit<Transaction, "id"> {}
