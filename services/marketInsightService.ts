export function getMarketInsight(
  goldRate: number
): string {

  if (goldRate >= 8000) {

    return "📈 Gold market remains strong. Long-term disciplined ownership may provide stability.";
  }

  if (goldRate >= 7000) {

    return "✨ Gold prices are holding steady with moderate strength.";
  }

  if (goldRate >= 6000) {

    return "📊 Gold market appears relatively balanced today.";
  }

  return "📉 Gold prices appear softer. Some savers may consider accumulation opportunities.";
}