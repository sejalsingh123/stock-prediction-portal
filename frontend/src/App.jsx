import "./assets/style.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from './components/Main'
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import AuthProvider from "./AuthProvider"
import PrivateRoutes from "./PrivateRoutes"
import PublicRoute from "./PublicRoute"

function App() {
  

  return (
   <>
   <AuthProvider>
   <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoutes><Dashboard/></PrivateRoutes>} />
      </Routes>
    <Footer/>
   </BrowserRouter>
   </AuthProvider>
   <ToastContainer />
   </>
  )
}

export default App
