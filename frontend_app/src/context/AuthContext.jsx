import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fakeAuthApi } from "../services/authApi";

/**
 * PUBLIC_INTERFACE
 * AuthContext provides user state and auth actions across the app.
 */
const AuthContext = createContext(undefined);

/**
 * PUBLIC_INTERFACE
 * useAuth hook to access auth state and actions.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * PUBLIC_INTERFACE
   * Manages user state, persists to localStorage for preview sessions,
   * and exposes login, signup, and logout methods.
   */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Restore user from localStorage (preview only, not secure)
    const raw = window.localStorage.getItem("ds_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        // ignore parse errors
      }
    }
    setInitializing(false);
  }, []);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("ds_user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("ds_user");
    }
  }, [user]);

  const login = async (email, password) => {
    const res = await fakeAuthApi.login({ email, password });
    setUser(res.user);
    return res.user;
  };

  const signup = async (name, email, password) => {
    const res = await fakeAuthApi.signup({ name, email, password });
    setUser(res.user);
    return res.user;
  };

  const logout = async () => {
    await fakeAuthApi.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, initializing, login, signup, logout }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
