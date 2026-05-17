export function getNextGoal(
  goldOwned: number
) {

  const goals = [
    10,
    20,
    50,
    100,
    250,
  ];

  const nextGoal =
    goals.find(
      (goal) =>
        goal >
        goldOwned
    ) || 500;

  const remaining =
    nextGoal -
    goldOwned;

  const progress =
    (
      (goldOwned /
        nextGoal) *
      100
    ).toFixed(1);

  return {

    nextGoal,

    remaining,

    progress,
  };
}