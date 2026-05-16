import {
  calculateGoldEquivalent,
  DEFAULT_GOLD_RATE,
} from "@/services/goldService";

export function getPortfolioData(
  user: string
) {

  const total =
    Number(
      localStorage.getItem(
        `${user}_total`
      ) || 0
    );

  const goldRate =
    Number(
      localStorage.getItem(
        "goldRate"
      ) ||
        DEFAULT_GOLD_RATE
    );

  const goldOwned =
    calculateGoldEquivalent(
      total,
      goldRate
    );

  const estimatedValue =
    goldOwned *
    goldRate;

  return {

    investedAmount:
      total,

    goldOwned,

    estimatedValue,

    growth:
      estimatedValue -
      total,
  };
}