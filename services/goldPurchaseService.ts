import {
  createWalletTransaction,
  saveWalletTransaction,
} from "@/services/walletService";

import {
  calculateGoldEquivalent,
  DEFAULT_GOLD_RATE,
} from "@/services/goldService";

export function buyGold(
  user: string,
  amount: number
) {

  const wallet =
    JSON.parse(
      localStorage.getItem(
        `${user}_wallet`
      ) || "[]"
    );

  let balance = 0;

  wallet.forEach(
    (item: any) => {

      if (
        item.type ===
        "Credit"
      ) {

        balance +=
          item.amount;
      }

      if (
        item.type ===
        "Debit"
      ) {

        balance -=
          item.amount;
      }
    }
  );

  if (
    balance < amount
  ) {

    return {
      success: false,
      message:
        "Insufficient wallet balance.",
    };
  }

  /* DEBIT WALLET */

  const debitTxn =
    createWalletTransaction(
      "Debit",
      amount
    );

  saveWalletTransaction(
    user,
    debitTxn
  );

  /* GOLD CREDIT */

  const currentTotal =
    Number(
      localStorage.getItem(
        `${user}_total`
      ) || 0
    );

  const updatedTotal =
    currentTotal + amount;

  localStorage.setItem(
    `${user}_total`,
    updatedTotal.toString()
  );

  const goldRate =
    Number(
      localStorage.getItem(
        "goldRate"
      ) ||
        DEFAULT_GOLD_RATE
    );

  const grams =
    calculateGoldEquivalent(
      amount,
      goldRate
    );

  const history =
    JSON.parse(
      localStorage.getItem(
        `${user}_history`
      ) || "[]"
    );

  history.unshift({

    amount,

    goldGrams:
      grams,

    createdAt:
      new Date().toISOString(),

    transactionId:
      "BUY-" +
      Date.now(),
  });

  localStorage.setItem(
    `${user}_history`,
    JSON.stringify(history)
  );

  return {
    success: true,
    message:
      "Gold purchased successfully.",
  };
}