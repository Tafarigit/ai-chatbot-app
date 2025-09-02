import { createContext, useState } from "react";

// Create the context with default values
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores the currently logged-in user

  // Function to log in user
  const loginUser = (userData) => setUser(userData);

  // Function to log out user
  const logoutUser = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
