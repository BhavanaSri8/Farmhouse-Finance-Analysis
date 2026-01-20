export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  property: 'Earthy Escape' | 'Millennium Farm House';
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  transactionCount: number;
  byCategory: { [key: string]: number };
}

export type PropertyName = 'Earthy Escape' | 'Millennium Farm House';
