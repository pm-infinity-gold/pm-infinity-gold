export interface WalletTransaction {

  id: string;

  type: string;

  amount: number;

  status: string;

  createdAt: string;
}

export function createWalletTransaction(
  type: string,
  amount: number
) : WalletTransaction {

  return {

    id:
      "WALLET-" +
      Date.now(),

    type,

    amount,

    status:
      "Success",

    createdAt:
      new Date().toISOString(),
  };
}

export function saveWalletTransaction(
  user: string,
  transaction:
    WalletTransaction
) {

  const existing =
    JSON.parse(
      localStorage.getItem(
        `${user}_wallet`
      ) || "[]"
    );

  const updated = [

    transaction,
    ...existing,
  ];

  localStorage.setItem(
    `${user}_wallet`,
    JSON.stringify(updated)
  );
}

export function getWalletTransactions(
  user: string
) {

  return JSON.parse(
    localStorage.getItem(
      `${user}_wallet`
    ) || "[]"
  );
}

export function getWalletBalance(
  user: string
) {

  const transactions =
    getWalletTransactions(
      user
    );

  let balance = 0;

  transactions.forEach(
    (item: WalletTransaction) => {

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

  return balance;
}