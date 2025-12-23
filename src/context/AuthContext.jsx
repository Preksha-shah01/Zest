import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(); // If this is missing, it crashes!

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("zestUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const dummyUser = { name: "Test User", email }; 
    setUser(dummyUser);
    localStorage.setItem("zestUser", JSON.stringify(dummyUser));
  };

  const signup = (name, email, password) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("zestUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zestUser");
  };

  // Ensure 'user' is passed here
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);