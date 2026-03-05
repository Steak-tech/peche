import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import UserService from "../services/UserService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth_data"]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.auth_data && cookies.auth_data.token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Get User Info
  const fetchUser = async () => {
    try {
      const userData = await UserService.getUser();
      setUser(userData);
    } catch (error) {
      console.error("Erreur récupération utilisateur:", error);
      removeCookie("auth_data", { path: "/" });
    } finally {
      setLoading(false);
    }
  };

  // Méthode Login

  const login = async (credentials) => {
    try {
      const data = await UserService.login(credentials);
      setCookie("auth_data", { token: data.token }, { path: "/" });
      if (data.user) {
        setUser(data.user);
      } else {
        await fetchUser();
      }
      return true;
    } catch (error) {
      throw error;
    }
  };

  // Méthode Logout
  const logout = async () => {
    try {
      await UserService.logout();
    } catch (error) {
      console.error("Erreur lors du logout API:", error);
    } finally {
      removeCookie("auth_data", { path: "/" });
      setUser(null);
    }
  };

  // Méthode register
  const register = async (userData) => {
    try {
      const data = await UserService.register(userData);
      setCookie("auth_data", { token: data.token }, { path: "/" });
      if (data.user) {
        setUser(data.user);
      } else {
        await fetchUser();
      }
      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
