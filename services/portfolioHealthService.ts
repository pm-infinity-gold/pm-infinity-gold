export function getPortfolioHealth(
  goldOwned: number,
  walletBalance: number,
  streak: number
) {

  let score = 0;

  /* GOLD OWNERSHIP */

  if (goldOwned >= 100) {

    score += 40;

  } else if (
    goldOwned >= 20
  ) {

    score += 30;

  } else if (
    goldOwned >= 10
  ) {

    score += 20;

  } else {

    score += 10;
  }

  /* LIQUIDITY */

  if (
    walletBalance >= 10000
  ) {

    score += 30;

  } else if (
    walletBalance >= 5000
  ) {

    score += 20;

  } else {

    score += 10;
  }

  /* DISCIPLINE */

  if (streak >= 30) {

    score += 30;

  } else if (
    streak >= 10
  ) {

    score += 20;

  } else {

    score += 10;
  }

  let status =
    "Emerging Investor";

  let color =
    "text-gray-300";

  if (score >= 90) {

    status =
      "Elite Wealth Builder";

    color =
      "text-purple-400";

  } else if (
    score >= 70
  ) {

    status =
      "Advanced Gold Investor";

    color =
      "text-yellow-400";

  } else if (
    score >= 50
  ) {

    status =
      "Disciplined Wealth Creator";

    color =
      "text-green-400";
  }

  return {

    score,

    status,

    color,
  };
}