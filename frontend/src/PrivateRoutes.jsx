import { useContext } from "react"
import {AuthContext} from './AuthProvider'
import {Navigate} from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {loggedIn} = useContext(AuthContext)
    return loggedIn ? (
       children
    ) : (
        <Navigate to="/login" />
    )
}
export default PrivateRoutes