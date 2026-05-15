interface UserLevelInput {

  total: number;

  transactions: number;
}

export function getUserLevel(
  input: UserLevelInput
) {

  if (
    input.total >= 500000 &&
    input.transactions >= 25
  ) {

    return {
      level:
        "💎 Elite Infinity Saver",
      color:
        "text-cyan-400",
    };
  }

  if (
    input.total >= 100000 &&
    input.transactions >= 10
  ) {

    return {
      level:
        "🥇 Gold Saver",
      color:
        "text-yellow-400",
    };
  }

  if (
    input.total >= 50000
  ) {

    return {
      level:
        "🥈 Silver Saver",
      color:
        "text-gray-300",
    };
  }

  return {
    level:
      "🥉 Bronze Saver",
    color:
      "text-orange-400",
  };
}