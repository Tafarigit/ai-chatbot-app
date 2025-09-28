// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export const useAuth = () => useContext(AuthContext);
