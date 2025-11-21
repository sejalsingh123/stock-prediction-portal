import { createContext, useState } from "react";

const AuthContext = createContext()
const AuthProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = useState(
     !!localStorage.getItem('accessToken')
    )
    return(
        <>
        <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
        </>
    )
}
export default AuthProvider;
export {AuthContext}
