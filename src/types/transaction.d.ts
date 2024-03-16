export type TransactionForm = {
  total: number;
  inputType: string;
  moneyType: string;
  description: string;
};

// type Transaction inherits from TransactionForm
export type Transaction = TransactionForm & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
