 export interface Transaction {

  transactionId?: string;

  amount: number;

  goldGrams?: number;

  source?: string;

  status:
    | "success"
    | "pending"
    | "failed";

  createdAt: string;
}