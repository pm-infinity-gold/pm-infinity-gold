export function getAchievements(
  goldOwned: number,
  streak: number,
  totalSavings: number
) {

  const achievements = [];

  if (goldOwned >= 1) {

    achievements.push(
      "🥇 First Gram Achieved"
    );
  }

  if (goldOwned >= 10) {

    achievements.push(
      "🪙 10g Gold Owner"
    );
  }

  if (goldOwned >= 50) {

    achievements.push(
      "👑 Premium Gold Holder"
    );
  }

  if (streak >= 7) {

    achievements.push(
      "🔥 7-Day Discipline"
    );
  }

  if (streak >= 30) {

    achievements.push(
      "🚀 30-Day Consistency"
    );
  }

  if (totalSavings >= 50000) {

    achievements.push(
      "💎 Wealth Builder"
    );
  }

  return achievements;
}