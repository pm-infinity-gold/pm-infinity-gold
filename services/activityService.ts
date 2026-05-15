interface ActivityItem {

  type: string;

  message: string;

  createdAt: string;
}

export function generateActivities(
  history: any[],
  redemptions: any[]
): ActivityItem[] {

  const activities:
    ActivityItem[] = [];

  /* SAVINGS */

  history.forEach((item) => {

    activities.push({

      type: "saving",

      message:
        `✅ Savings added: ₹${item.amount}`,

      createdAt:
        item.createdAt,
    });

  });

  /* REDEMPTIONS */

  redemptions.forEach(
    (item) => {

      activities.push({

        type: "redemption",

        message:
          `🎉 Redemption request submitted for ${item.grams.toFixed(3)} g`,

        createdAt:
          item.createdAt,
      });

      activities.push({

        type: "status",

        message:
          `📦 Redemption status: ${item.status}`,

        createdAt:
          item.createdAt,
      });

    }
  );

  return activities.sort(
    (a, b) =>
      new Date(
        b.createdAt
      ).getTime() -
      new Date(
        a.createdAt
      ).getTime()
  );
}