 interface AdminAnalytics {

  totalUsers: number;

  totalSavings: number;

  totalGoldLiability: number;

  pendingRedemptions: number;
}

export function getAdminAnalytics() :
  AdminAnalytics {

  let totalUsers = 0;

  let totalSavings = 0;

  let totalGoldLiability = 0;

  let pendingRedemptions = 0;

  for (
    let i = 0;
    i < localStorage.length;
    i++
  ) {

    const key =
      localStorage.key(i);

    if (!key) continue;

    /* USERS */

    if (
      key.endsWith("_total")
    ) {

      totalUsers++;

      const amount =
        Number(
          localStorage.getItem(
            key
          ) || 0
        );

      totalSavings += amount;
    }

    /* REDEMPTIONS */

    if (
      key.endsWith(
        "_redemptions"
      )
    ) {

      const redemptions =
        JSON.parse(
          localStorage.getItem(
            key
          ) || "[]"
        );

      redemptions.forEach(
        (item: any) => {

          totalGoldLiability +=
            item.grams || 0;

          if (
            item.status ===
            "Pending"
          ) {

            pendingRedemptions++;
          }
        }
      );
    }
  }

  return {

    totalUsers,

    totalSavings,

    totalGoldLiability,

    pendingRedemptions,
  };
}