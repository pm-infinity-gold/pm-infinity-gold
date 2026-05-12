import { RedemptionRequest }
from "@/types/redemption";

export function createRedemptionRequest(
  userId: string,
  grams: number
): RedemptionRequest {

  return {

    id: `RED-${Date.now()}`,

    userId,

    grams,

    status: "requested",

    createdAt: new Date().toISOString(),

  };
}