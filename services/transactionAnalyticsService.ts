export function getTransactionAnalytics(
  history: any[]
) {

  let totalBuys = 0;

  let totalSells = 0;

  let totalSavings = 0;

  history.forEach(
    (item) => {

      if (
        item.amount > 0
      ) {

        totalBuys +=
          item.amount;

        totalSavings +=
          item.amount;
      }

      if (
        item.amount < 0
      ) {

        totalSells +=
          Math.abs(
            item.amount
          );
      }
    }
  );

  return {

    totalBuys,

    totalSells,

    netInvestment:
      totalSavings -
      totalSells,
  };
}