import { createContext, useContext, useMemo, useState } from "react";
import { loginAdmin } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("cinematic_admin_token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cinematic_admin_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    const { data } = await loginAdmin({ email, password });
    localStorage.setItem("cinematic_admin_token", data.token);
    localStorage.setItem("cinematic_admin_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("cinematic_admin_token");
    localStorage.removeItem("cinematic_admin_user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
