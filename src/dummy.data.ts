export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
export interface DataType {
  report: {
    id: string;
    source: string;
    amount: number;
    type: ReportType;
    created_at: Date;
    updated_at: Date;
  }[];
}

export const data: DataType = {
  report: [
    {
      id: '4b3a036b-3017-4d2e-9a1c-f6ab17bb0e43',
      source: 'Salary',
      amount: 40000,
      type: ReportType.INCOME,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'edc92cbd-a094-4ac3-8a33-60685518c223',
      source: 'Rent',
      amount: 20000,
      type: ReportType.EXPENSE,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'cbd695f4-6fed-4831-b920-791b60630ed0',
      source: 'Groceries',
      amount: 1000,
      type: ReportType.EXPENSE,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '06d26071-27c2-4d8b-9d37-318cf742ae05',
      source: 'Tution',
      amount: 5000,
      type: ReportType.INCOME,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
