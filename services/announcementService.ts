export interface Announcement {

  message: string;

  createdAt: string;
}

export function saveAnnouncement(
  message: string
) {

  const existing =
    JSON.parse(
      localStorage.getItem(
        "platformAnnouncements"
      ) || "[]"
    );

  const updated = [

    {
      message,

      createdAt:
        new Date().toISOString(),
    },

    ...existing,
  ];

  localStorage.setItem(
    "platformAnnouncements",
    JSON.stringify(updated)
  );
}

export function getAnnouncements() {

  return JSON.parse(
    localStorage.getItem(
      "platformAnnouncements"
    ) || "[]"
  );
}