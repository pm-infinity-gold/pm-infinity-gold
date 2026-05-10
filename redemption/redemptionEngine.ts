export function isEligibleForRedemption(
  currentGold: number,
  targetGold: number = 10
) {
  return currentGold >= targetGold;
}

export function gramsRemaining(
  currentGold: number,
  targetGold: number = 10
) {
  return Math.max(targetGold - currentGold, 0);
}