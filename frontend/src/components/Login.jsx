import axios from "axios";
import { useState ,useContext} from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../AuthProvider";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const {loggedIn, setLoggedIn} = useContext(AuthContext)

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        const userdata = {username, password}
        try {
            const response = await axios.post(" http://127.0.0.1:8000/api/v1/login/", userdata)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken',response.data.refresh)
            console.log("Login successful", response.data)
            setLoggedIn(true)
            navigate('/dashboard')

        } catch (error) {
            console.log("Error logging in", error)
            setError('Invalid username or password')
        }finally {
            setLoading(false)
        }

    }
    return(
        <>
           <div className="container">
              <div className="row justify-content-center">
                 <div className="col-md-6 mt-5 p-4 border rounded-3 shadow bg-light-dark">
                    <h3 className="text-info text-center mb-4">Login to the portal</h3>
                    <form onSubmit={handleLogin}>
                       <div className="mb-3">
                          <label htmlFor="username" className="form-label text-info">Username</label>
                          <input type="text" className="form-control" placeholder="Enter your username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                       </div>
                       <div className="mb-3">
                          <label htmlFor="password" className="form-label text-info">Password</label>
                          <input type="password" className="form-control" placeholder="Enter your password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                       </div>
                       {error && <div className="text-danger">{error}</div>}
                       {loading ? (
                          <button type="submit" className="btn btn-info d-block mx-auto" disabled>Please wait....</button>
                       ):(
                         <button type="submit" className="btn btn-info d-block mx-auto">Login</button>
                       )}
                    </form>
                 </div>
              </div>
           </div>
        </>
    )
}
export default Login

