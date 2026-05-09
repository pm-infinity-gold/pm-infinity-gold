export const DEFAULT_GOLD_RATE = 14050;

export function calculateGoldEquivalent(
  amount: number,
  goldRate: number
) {
  return amount / goldRate;
}