
import React, { useState } from "react";

import AuthContext from './authContext';


const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("data")!=null);

  const userlogin = () => {
    console.log("called")
    setIsLoggedIn(true);

  };

  const userlogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userlogin, userlogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;