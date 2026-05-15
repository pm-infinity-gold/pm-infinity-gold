import { Transaction } from "@/types/transaction";

export function getFinancialSummary(
  history: Transaction[]
) {

  const totalTransactions =
    history.length;

  const totalSaved =
    history.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  const highestSaving =
    history.reduce(
      (max, item) =>
        item.amount > max
          ? item.amount
          : max,
      0
    );

  const averageSaving =
    totalTransactions > 0
      ? totalSaved /
        totalTransactions
      : 0;

  const totalGold =
    history.reduce(
      (sum, item) =>
        sum +
        (item.goldGrams || 0),
      0
    );

  return {

    totalTransactions,

    totalSaved,

    highestSaving,

    averageSaving,

    totalGold,
  };
}