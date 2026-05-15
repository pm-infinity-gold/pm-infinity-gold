export function saveLoginSession(
  user: string
) {

  localStorage.setItem(
    `${user}_lastLogin`,
    new Date().toISOString()
  );
}

export function getLastLogin(
  user: string
): string {

  const value =
    localStorage.getItem(
      `${user}_lastLogin`
    );

  if (!value) {

    return "First login";
  }

  return new Date(
    value
  ).toLocaleString();
}