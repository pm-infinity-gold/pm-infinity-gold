 export interface Transaction {

  id: string;

  userId: string;

  amount: number;

  goldGrams: number;

  goldRate: number;

  source: string;

  status:
    | "success"
    | "pending"
    | "failed";

  createdAt: string;
}