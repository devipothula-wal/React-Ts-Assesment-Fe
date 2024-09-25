//using enum to store constants
export enum TransactionType {
    Expense = 'Expense',
    Income = 'Income'
}

// using interface for reusing Transaction type 
export interface Transaction {
    _id?: string;
    title: string;
    amount: number;
    traType: TransactionType;
    category: string;
    date: string,
    userId?: string | null
  
}

  
  // Type guard to check if an object is of type 'Transaction'
  export function isValidItem(item: any): item is Transaction {
      return (
        typeof item._id === 'string' &&
        typeof item.title === 'string' &&
        typeof item.amount === 'number' &&
        typeof item.traType === 'string' && // assuming `TransactionType` is a string enum or type
        typeof item.category === 'string' &&
        typeof item.date === 'string'
    );
  }
  
