import { createContext, useState, useContext, useCallback } from "react";

const AppContext = createContext();
export const SESSION_KEY = "ticketapp_session";

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg, type = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3500);
  }, []);

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem(SESSION_KEY);
  };

  return (
    <AppContext.Provider value={{ addToast, clearSession, isLoggedIn, toasts }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
