export function generateReceiptNumber() {

  const timestamp =
    Date.now();

  const random =
    Math.floor(
      Math.random() * 10000
    );

  return `PMIG-${timestamp}-${random}`;
}