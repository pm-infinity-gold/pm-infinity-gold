export function getWealthStatus(
  goldOwned: number
) {

  if (
    goldOwned >= 100
  ) {

    return {

      title:
        "Elite Gold Holder",

      color:
        "text-purple-400",
    };
  }

  if (
    goldOwned >= 50
  ) {

    return {

      title:
        "Premium Gold Investor",

      color:
        "text-yellow-400",
    };
  }

  if (
    goldOwned >= 20
  ) {

    return {

      title:
        "Advanced Gold Saver",

      color:
        "text-cyan-400",
    };
  }

  if (
    goldOwned >= 10
  ) {

    return {

      title:
        "Verified Gold Owner",

      color:
        "text-green-400",
    };
  }

  return {

    title:
      "Emerging Gold Saver",

    color:
      "text-gray-300",
  };
}