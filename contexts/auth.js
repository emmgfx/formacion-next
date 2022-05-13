import { createContext, useContext, useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";

import api from "../shared/api";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = cookieCutter.get("token");
      if (token) {
        console.log("token found in cookie, check it");
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLogged(true);
        setCredits(cookieCutter.get("credits") || 0);
        setLoading(false);
      }
    }
    loadUserFromCookies();
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
      setLogged(true);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.error.message);
    }

    // if (token) {
    //   console.log("Got token");
    //   Cookies.set("token", token, { expires: 60 });
    //   api.defaults.headers.Authorization = `Bearer ${token.token}`;
    //   const { data: user } = await api.get("users/me");
    //   setUser(user);
    //   console.log("Got user", user);
    // }
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_OC_APIURL}/login`, {
    //     user: email,
    //     pwd: password,
    //     recaptcha: "12345",
    //   })
    //   .then((response) => {
    //     cookieCutter.set("token", response.data.message.token);
    //     cookieCutter.set("credits", response.data.message.credits);
    //     router.push("/");
    //   })
    //   .catch((error) => {
    //     alert(error.response.data.error.message);
    //   });
  };

  const logout = (email, password) => {
    cookieCutter.set("token", "", { expires: new Date().toUTCString() });
    cookieCutter.set("credits", "", { expires: new Date().toUTCString() });
    setCredits(0);
    setLogged(false);
    delete api.defaults.headers.Authorization;
    window.location.pathname = "/";
  };

  return (
    <AuthContext.Provider
      // value={{ isAuthenticated: !!user, user, login, loading, logout }}
      value={{ isAuthenticated: logged, login, loading, logout, credits }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// export const ProtectRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   if (
//     isLoading ||
//     (!isAuthenticated && window.location.pathname !== "/login")
//   ) {
//     return <LoadingScreen />;
//   }
//   return children;
// };

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  if (!isLoading && !isAuthenticated) {
    window.location.pathname = "/login";
    return <p>meh</p>;
  } else {
    return <>{children}</>;
  }
};
