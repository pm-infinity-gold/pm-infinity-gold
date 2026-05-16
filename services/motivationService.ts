const messages = [

  "Consistency creates wealth.",

  "Every gram saved builds future security.",

  "Small disciplined savings become powerful assets.",

  "Gold ownership grows through patience and discipline.",

  "Financial freedom begins with consistent habits.",

  "Daily savings create long-term strength.",
];

export function getDailyMotivation() {

  const day =
    new Date().getDate();

  return messages[
    day % messages.length
  ];
}