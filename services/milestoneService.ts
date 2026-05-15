export function getMilestones(
  total: number,
  gold: number
): string[] {

  const milestones: string[] = [];

  /* MONEY */

  if (total >= 1000) {

    milestones.push(
      "🎉 First ₹1,000 Saved"
    );
  }

  if (total >= 10000) {

    milestones.push(
      "🏆 ₹10,000 Savings Milestone"
    );
  }

  if (total >= 50000) {

    milestones.push(
      "💰 ₹50,000 Wealth Builder"
    );
  }

  if (total >= 100000) {

    milestones.push(
      "👑 ₹1 Lakh Gold Saver"
    );
  }

  /* GOLD */

  if (gold >= 1) {

    milestones.push(
      "✨ 1g Gold Ownership Achieved"
    );
  }

  if (gold >= 5) {

    milestones.push(
      "🥇 5g Gold Ownership Milestone"
    );
  }

  if (gold >= 10) {

    milestones.push(
      "💎 Redemption Goal Achieved"
    );
  }

  return milestones;
}