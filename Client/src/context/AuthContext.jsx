import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from backend using cookie token
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("http://localhost:5000/user", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user || null);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  // ✅ call after successful signin
  const login = (userData) => {
    setUser(userData);
  };

  // ✅ logout from backend + clear frontend state
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/user/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      // ignore
    } finally {
      setUser(null);
      localStorage.removeItem("userInfo"); // optional
      localStorage.removeItem("token"); // optional
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
