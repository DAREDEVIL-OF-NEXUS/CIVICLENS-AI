import { createContext, useContext, useMemo, useState } from "react";

const UserSessionContext = createContext(null);

export function UserSessionProvider({ children }) {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("civiclens_username") || "";
  });

  const updateUsername = (value) => {
    const cleanValue = String(value || "").trim();
    setUsername(cleanValue);

    if (cleanValue) {
      localStorage.setItem("civiclens_username", cleanValue);
    } else {
      localStorage.removeItem("civiclens_username");
    }
  };

  const clearUsername = () => {
    setUsername("");
    localStorage.removeItem("civiclens_username");
  };

  const value = useMemo(
    () => ({
      username,
      setUsername: updateUsername,
      clearUsername,
      hasUserContext: Boolean(username),
    }),
    [username]
  );

  return (
    <UserSessionContext.Provider value={value}>
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error("useUserSession must be used inside UserSessionProvider");
  }

  return context;
}