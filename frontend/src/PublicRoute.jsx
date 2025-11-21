import { useContext } from "react"
import {AuthContext} from './AuthProvider'
import {Navigate} from 'react-router-dom'

const PublicRoute = ({children}) => {
    const {loggedIn} = useContext(AuthContext)
    return !loggedIn ? (
       children
    ) : (
      <Navigate to='/dashboard' />
    )
}
export default PublicRoute