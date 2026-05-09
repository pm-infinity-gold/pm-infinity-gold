export async function mockPayment(amount: number) {
  return {
    success: true,
    transactionId: `TXN-${Date.now()}`,
    amount,
  };
}