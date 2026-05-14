import { Transaction } from "@/types/transaction";

export function calculateSavingStreak(
  history: Transaction[]
): number {

  if (!history.length) {

    return 0;
  }

  const uniqueDates =
    Array.from(

      new Set(

        history.map((item) => {

          return new Date(
            item.createdAt
          ).toDateString();

        })

      )

    );

  uniqueDates.sort(
    (a, b) => {

      return (
        new Date(b).getTime() -
        new Date(a).getTime()
      );

    }
  );

  let streak = 1;

  for (
    let i = 0;
    i < uniqueDates.length - 1;
    i++
  ) {

    const current =
      new Date(uniqueDates[i]);

    const next =
      new Date(uniqueDates[i + 1]);

    const difference =
      (
        current.getTime() -
        next.getTime()
      ) /
      (1000 * 60 * 60 * 24);

    if (difference === 1) {

      streak++;

    } else {

      break;
    }
  }

  return streak;
}