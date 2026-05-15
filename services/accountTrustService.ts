interface TrustInput {

  total: number;

  profileCompleted: boolean;

  transactions: number;
}

export function getAccountTrustStatus(
  input: TrustInput
) {

  if (
    input.profileCompleted &&
    input.transactions >= 5 &&
    input.total >= 50000
  ) {

    return {
      badge:
        "🛡 Verified Gold Saver",
      color:
        "text-green-400",
    };
  }

  if (
    input.profileCompleted
  ) {

    return {
      badge:
        "🔒 Secure Account Active",
      color:
        "text-yellow-400",
    };
  }

  return {
    badge:
      "⚠ Complete Profile Verification",
    color:
      "text-red-400",
  };
}