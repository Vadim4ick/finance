export type Transaction = {
  id: string;
  category?: string | null;
  // name: string;
  date: Date;
  payee: string;
  amount: number;
  account?: string | null;
  accountId: string;
  notes?: string;
  categoryId?: string;
};

export interface BodyTransaction extends Omit<Transaction, "id"> {}
