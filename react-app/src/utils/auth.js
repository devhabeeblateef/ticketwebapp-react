import { SESSION_KEY } from "../context/AppContext";

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function requireAuth(navigate, addToast) {
  const session = getSession();
  if (!session) {
    addToast("Your session has expired — please log in again.", "error");
    navigate("/auth/login");
    return false;
  }
  return true;
}
