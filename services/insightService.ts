export function getSavingsInsight(
  progress: number,
  remainingGold: number
): string {

  if (progress >= 100) {

    return "🎉 Congratulations! You are eligible for redemption.";

  }

  if (progress >= 90) {

    return `🔥 Almost there! Only ${remainingGold.toFixed(2)} g remaining for redemption.`;

  }

  if (progress >= 75) {

    return "💪 Excellent progress toward your gold ownership goal.";

  }

  if (progress >= 50) {

    return "✨ Great consistency! You are halfway toward your milestone.";

  }

  if (progress >= 25) {

    return "📈 Good start! Keep building your gold savings step-by-step.";

  }

  return "🌱 Begin your disciplined gold savings journey today.";
}