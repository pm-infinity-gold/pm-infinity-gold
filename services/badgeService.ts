export function getAchievementBadges(
  total: number,
  progress: number
): string[] {

  const badges: string[] = [];

  if (total > 0) {

    badges.push(
      "🌱 First Saving Started"
    );
  }

  if (total >= 1000) {

    badges.push(
      "💰 ₹1,000 Savings Milestone"
    );
  }

  if (progress >= 25) {

    badges.push(
      "📈 25% Gold Goal Achieved"
    );
  }

  if (progress >= 50) {

    badges.push(
      "✨ 50% Gold Goal Achieved"
    );
  }

  if (progress >= 75) {

    badges.push(
      "🔥 75% Gold Goal Achieved"
    );
  }

  if (progress >= 100) {

    badges.push(
      "🏆 Redemption Eligible"
    );
  }

  return badges;
}