export function getGoalPrediction(
  total: number,
  targetAmount: number = 100000
): string {

  if (total <= 0) {

    return "Start saving today to begin your gold ownership journey.";
  }

  const estimatedMonths =
    Math.ceil(
      (targetAmount - total) /
      Math.max(total, 1000)
    );

  if (estimatedMonths <= 1) {

    return "🔥 You are very close to reaching your gold goal.";
  }

  if (estimatedMonths <= 3) {

    return `📈 At your current pace, you may reach your goal within ${estimatedMonths} months.`;
  }

  if (estimatedMonths <= 6) {

    return `💪 Consistent saving may help you reach your goal within ${estimatedMonths} months.`;
  }

  return "🌱 Continue disciplined savings to steadily build your gold ownership.";
}