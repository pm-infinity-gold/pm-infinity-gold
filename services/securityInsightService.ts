export function getSecurityInsight(
  goldOwned: number
) {

  if (
    goldOwned >= 100
  ) {

    return {

      level:
        "Institutional Grade Protection",

      message:
        "High-value gold ownership benefits from advanced operational safeguards.",

      color:
        "text-purple-400",
    };
  }

  if (
    goldOwned >= 20
  ) {

    return {

      level:
        "Enhanced Asset Protection",

      message:
        "Your growing gold portfolio is supported by platform-level tracking and transaction visibility.",

      color:
        "text-green-400",
    };
  }

  return {

    level:
      "Standard Portfolio Protection",

    message:
      "Your digital gold activity is protected through wallet and transaction infrastructure.",

    color:
      "text-cyan-400",
  };
}