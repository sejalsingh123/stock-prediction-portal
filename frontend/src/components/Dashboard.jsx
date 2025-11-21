import { useEffect, useState} from "react"
import axios from "axios";
import axiosInstance from "../axiosInstances";
const Dashboard = () => {
    const [ticker, setTicker] = useState("")
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                
               const response = await axiosInstance.get('/protected/')
               
                console.log("Protected data fetched successfully:", response.data)

            } catch (error) {
                console.log("Error fetching protected data:", error)
            }
        }
        fetchProtectedData()
    }, []);

    return(
        <>
          <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form >
                        <input type="text" className="form-control" placeholder="Enter Stock Ticker" onChange={(e)=> setTicker(e.target.value)}/>
                        <button type="submit" className="btn btn-info mt-3">Predict</button>
                    </form>
                </div>
            </div>
          </div>
        </>
    )
}
export default Dashboard

