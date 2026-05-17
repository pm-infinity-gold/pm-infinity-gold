export function getHoldingsBreakdown(
  goldValue: number,
  walletBalance: number
) {

  const totalAssets =
    goldValue +
    walletBalance;

  const goldPercentage =
    totalAssets > 0
      ? (
          (goldValue /
            totalAssets) *
          100
        ).toFixed(1)
      : "0";

  const walletPercentage =
    totalAssets > 0
      ? (
          (walletBalance /
            totalAssets) *
          100
        ).toFixed(1)
      : "0";

  return {

    totalAssets,

    goldPercentage,

    walletPercentage,
  };
}