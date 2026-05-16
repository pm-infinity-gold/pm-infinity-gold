import {
  createWalletTransaction,
  saveWalletTransaction,
} from "@/services/walletService";

import {
  DEFAULT_GOLD_RATE,
} from "@/services/goldService";

export function sellGold(
  user: string,
  grams: number
) {

  const totalSavings =
    Number(
      localStorage.getItem(
        `${user}_total`
      ) || 0
    );

  const goldRate =
    Number(
      localStorage.getItem(
        "goldRate"
      ) ||
        DEFAULT_GOLD_RATE
    );

  const ownedGold =
    totalSavings /
    goldRate;

  if (
    ownedGold < grams
  ) {

    return {

      success: false,

      message:
        "Insufficient gold balance.",
    };
  }

  const amount =
    grams * goldRate;

  /* REDUCE GOLD */

  const updatedTotal =
    totalSavings -
    amount;

  localStorage.setItem(
    `${user}_total`,
    updatedTotal.toString()
  );

  /* CREDIT WALLET */

  const creditTxn =
    createWalletTransaction(
      "Credit",
      amount
    );

  saveWalletTransaction(
    user,
    creditTxn
  );

  /* HISTORY */

  const history =
    JSON.parse(
      localStorage.getItem(
        `${user}_history`
      ) || "[]"
    );

  history.unshift({

    amount:
      -amount,

    goldGrams:
      -grams,

    createdAt:
      new Date().toISOString(),

    transactionId:
      "SELL-" +
      Date.now(),
  });

  localStorage.setItem(
    `${user}_history`,
    JSON.stringify(history)
  );

  return {

    success: true,

    message:
      "Gold sold successfully.",
  };
}