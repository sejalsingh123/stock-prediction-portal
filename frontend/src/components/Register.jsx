import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async(e) => {
        e.preventDefault() 
        setLoading(true)
        const userData = {
            username,
            email,
            password
        }
        try {
           const response = await axios.post(" http://127.0.0.1:8000/api/v1/register/", userData)
            setError({})
            setSuccess(true)
            navigate("/login")
        } catch (error) {
         setError(error.response.data)
            console.log("Error creating account",error.response.data);
        } finally {
            setLoading(false)
        }
    }
    return(
        <>
           <div className="container">
              <div className="row justify-content-center">
                 <div className="col-md-6 mt-5 p-4 border rounded-3 shadow bg-light-dark">
                    <h3 className="text-info text-center mb-4">Create an Account</h3>
                    <form onSubmit={handleRegister}>
                       <div className="mb-3">
                          <label htmlFor="username" className="form-label text-info">Username</label>
                          <input type="text" className="form-control" placeholder="Enter your username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                          <small>{error.username && <span className="text-danger">{error.username}</span>}</small>
                       </div>
                       <div className="mb-3">
                          <label htmlFor="email" className="form-label text-info">Email</label>
                          <input type="email" className="form-control" placeholder="Enter your email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          <small>{error.email && <span className="text-danger">{error.email}</span>}</small>
                       </div>
                       <div className="mb-3">
                          <label htmlFor="password" className="form-label text-info">Password</label>
                          <input type="password" className="form-control" placeholder="Enter your password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          <small>{error.password && <span className="text-danger">{error.password}</span>}</small>
                       </div>
                       {success && <div className="alert alert-success" role="alert">Account created successfully! You can now log in.</div>}
                       {loading ? (
                          <button type="submit" className="btn btn-info d-block mx-auto" disabled>Please wait....</button>
                       ):(
                         <button type="submit" className="btn btn-info d-block mx-auto">Register</button>
                       )}
                       
                    </form>
                 </div>
              </div>
           </div>
        </>
    )
}
export default Register