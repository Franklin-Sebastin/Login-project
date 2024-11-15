import React from 'react'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import ForgotPassword from './Components/ForgotPassword'
import Dashboard from './Components/DashboardComponent/Dashboard'
import DashboardLayout from './Components/DashboardComponent/DashboardLayout'
import {Routes,Route,Navigate} from "react-router-dom";
import Settings from './Components/DashboardComponent/SettingsComponent/Settings'
import ProtectedRoutes from './Components/MainRoutes/ProtectedRoutes'


function App() {
  return (
  <>
      <Routes>
              <Route path="/" element={<LogIn/>}/>
              <Route path="/sign-up" element={<SignUp/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
        {/** Protected Routes */}
        {/** Wrap all authenticated Route under ProtectedRoutes element */}
          <Route  element={<ProtectedRoutes />}>
              <Route  element={<DashboardLayout/>}>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/settings" element={<Settings/>}/>
              </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        
      </Routes> 
    </>
  
  )
}

export default App