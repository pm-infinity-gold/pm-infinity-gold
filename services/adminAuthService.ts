const ADMIN_PASSWORD =
  "pmgoldadmin";

export function loginAdmin(
  password: string
) {

  if (
    password ===
    ADMIN_PASSWORD
  ) {

    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );

    return true;
  }

  return false;
}

export function isAdminLoggedIn() {

  return (
    localStorage.getItem(
      "adminLoggedIn"
    ) === "true"
  );
}

export function logoutAdmin() {

  localStorage.removeItem(
    "adminLoggedIn"
  );
}