export function getRewardStatus(
  goldOwned: number,
  streak: number
) {

  let reward =
    "Starter Saver";

  let benefit =
    "Basic platform participation benefits.";

  if (
    goldOwned >= 10
  ) {

    reward =
      "Verified Gold Member";

    benefit =
      "Priority redemption processing eligibility.";
  }

  if (
    goldOwned >= 25 &&
    streak >= 10
  ) {

    reward =
      "Premium Gold Circle";

    benefit =
      "Enhanced rewards and promotional eligibility.";
  }

  if (
    goldOwned >= 50 &&
    streak >= 30
  ) {

    reward =
      "Elite Wealth Club";

    benefit =
      "Priority support and premium ecosystem access.";
  }

  return {

    reward,

    benefit,
  };
}