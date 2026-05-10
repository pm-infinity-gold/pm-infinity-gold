import { Transaction } from "@/types/transaction";

export function createTransaction(
  userId: string,
  amount: number,
  goldRate: number
): Transaction {
  return {
    id: `TXN-${Date.now()}`,

    userId,

    amount,

    goldRate,

    goldEquivalent: amount / goldRate,

    status: "success",

    createdAt: new Date().toISOString(),
  };
}