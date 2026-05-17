export function getDisciplineScore(
  streak: number,
  totalSavings: number,
  goldOwned: number
) {

  let score = 0;

  /* STREAK */

  if (streak >= 30) {

    score += 40;

  } else if (
    streak >= 10
  ) {

    score += 30;

  } else if (
    streak >= 5
  ) {

    score += 20;

  } else {

    score += 10;
  }

  /* SAVINGS */

  if (
    totalSavings >= 100000
  ) {

    score += 30;

  } else if (
    totalSavings >= 50000
  ) {

    score += 20;

  } else {

    score += 10;
  }

  /* GOLD OWNERSHIP */

  if (
    goldOwned >= 50
  ) {

    score += 30;

  } else if (
    goldOwned >= 10
  ) {

    score += 20;

  } else {

    score += 10;
  }

  let level =
    "Developing Discipline";

  let color =
    "text-gray-300";

  if (score >= 90) {

    level =
      "Elite Financial Discipline";

    color =
      "text-purple-400";

  } else if (
    score >= 70
  ) {

    level =
      "Advanced Saver";

    color =
      "text-yellow-400";

  } else if (
    score >= 50
  ) {

    level =
      "Consistent Wealth Builder";

    color =
      "text-green-400";
  }

  return {

    score,

    level,

    color,
  };
}