export function getNotifications(
  total: number,
  gold: number,
  streak: number
): string[] {

  const notifications: string[] = [];

  /* REDEMPTION */

  if (gold >= 10) {

    notifications.push(
      "🎉 You are now eligible for gold redemption."
    );
  }

  /* STREAK */

  if (streak >= 5) {

    notifications.push(
      `🔥 Excellent consistency! You maintained a ${streak}-day saving streak.`
    );
  }

  /* MILESTONES */

  if (total >= 100000) {

    notifications.push(
      "👑 Congratulations on crossing ₹1 Lakh savings."
    );
  }

  if (gold >= 5) {

    notifications.push(
      "🥇 You successfully crossed 5g gold ownership."
    );
  }

  return notifications;
}