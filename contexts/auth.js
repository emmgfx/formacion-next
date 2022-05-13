import { createContext, useContext, useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";

import api from "../shared/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // COMPROBAR COOKIES
    async function loadUserFromCookie() {
      const token = cookieCutter.get("token");
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLogged(true);
        setCredits(cookieCutter.get("credits") || 0);
        setLoading(false);
      }
    }
    loadUserFromCookie();
  }, []);

  const login = async ({ email, password, recaptcha }) => {
    try {
      const { data } = await api.post("/login", {
        user: email,
        pwd: password,
        recaptcha,
      });

      cookieCutter.set("token", data.message.token);
      cookieCutter.set("credits", data.message.credits);

      api.defaults.headers.Authorization = `Bearer ${data.message.token}`;

      setCredits(data.message.credits);
      setToken(data.message.token);
      setLogged(true);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };

  const logout = () => {
    // eliminar las cookies
    cookieCutter.set("token", "", { expires: new Date().toUTCString() });
    cookieCutter.set("credits", "", { expires: new Date().toUTCString() });
    // sets
    setCredits(0);
    setLogged(false);
    // configurar api
    delete api.defaults.headers.Authorization;
    // redirigir
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: logged,
        loading,
        credits,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
