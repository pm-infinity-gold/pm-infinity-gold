 import {
  generateReceiptNumber,
} from "@/services/receiptService";

export interface RedemptionRequest {

  id: string;

  receiptNumber: string;

  userId: string;

  grams: number;

  status:
    | "requested"
    | "approved"
    | "processing"
    | "dispatched"
    | "delivered"
    | "rejected";

  createdAt: string;
}

export function createRedemptionRequest(
  userId: string,
  grams: number
): RedemptionRequest {

  return {

    id:
      `RED-${Date.now()}`,

    receiptNumber:
      generateReceiptNumber(),

    userId,

    grams,

    status: "requested",

    createdAt:
      new Date().toISOString(),
  };
}