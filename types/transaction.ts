export interface Transaction {
  id: string;

  userId: string;

  amount: number;

  goldRate: number;

  goldEquivalent: number;

  status:
    | "pending"
    | "success"
    | "failed"
    | "refunded";

  createdAt: string;
}