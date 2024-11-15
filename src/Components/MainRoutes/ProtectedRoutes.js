import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

    const isLoggedIn=localStorage.getItem("isLoggedIn")==="true";
    console.log("ProtectedRoutes isLoggedin: ",isLoggedIn);
    
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;

}

export default ProtectedRoutes