 import { Transaction } from "@/types/transaction";

export function generateSavingsReport(
  history: Transaction[]
): string {

  if (!history.length) {

    return "No savings history available.";
  }

  let report =
    "PM Infinity Gold - Savings Report\n\n";

  history.forEach(
    (item, index) => {

      report +=
        `#${index + 1}\n`;

      report +=
        `Transaction ID: ${item.transactionId || "N/A"}\n`;

      report +=
        `Amount: ₹${item.amount}\n`;

      report +=
        `Gold Added: ${item.goldGrams?.toFixed(3)} g\n`;

      report +=
        `Status: ${item.status}\n`;

      report +=
        `Date: ${new Date(
          item.createdAt
        ).toLocaleDateString()}\n`;

      report += "\n";
    }
  );

  return report;
}