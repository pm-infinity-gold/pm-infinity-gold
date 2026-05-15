export function generateTransactionId() {

  const timestamp =
    Date.now();

  const random =
    Math.floor(
      Math.random() * 10000
    );

  return `TXN-${timestamp}-${random}`;
}