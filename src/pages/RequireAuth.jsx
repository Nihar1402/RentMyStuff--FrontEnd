import { BASE_URL } from '../services/helper';
import React, { Children, useContext } from "react";
import AuthContext from "../services/authContext";
import { Navigate, useLocation } from "react-router-dom";

export  function RequireAuth({children}) {
    const {isLoggedIn}=useContext(AuthContext);
    let location=useLocation();
  return isLoggedIn?children:<Navigate to={`/Login`} state={{from:location}}/>
}
