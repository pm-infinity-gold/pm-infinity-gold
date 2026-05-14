 import { Transaction } from "@/types/transaction";

import {
  calculateGoldEquivalent,
} from "@/services/goldService";

export function createTransaction(
  userId: string,
  amount: number,
  goldRate: number,
  source: string = "Bank"
): Transaction {

  return {

    id: `TXN-${Date.now()}`,

    userId,

    amount,

    goldRate,

    goldGrams:
      calculateGoldEquivalent(
        amount,
        goldRate
      ),

    source,

    status: "success",

    createdAt:
      new Date().toISOString(),
  };
}