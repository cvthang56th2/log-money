export type TransactionForm = {
  id?: string;
  total: number;
  inputType: string;
  moneyType: string;
  description: string;
  spentAt: date;
};

// type Transaction inherits from TransactionForm
export type Transaction = TransactionForm & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
