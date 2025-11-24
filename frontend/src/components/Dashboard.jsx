import { useEffect, useState} from "react"
import axios from "axios";
import axiosInstance from "../axiosInstances";
const Dashboard = () => {
    const [ticker, setTicker] = useState("")
    const [error,setError] = useState(null)
    const [loading, setLoading]= useState(false)
    const [plot, setPlot] = useState()
    const [plot100, setPlot100] = useState()
    const [plot200, setPlot200] = useState()
    const [finalPlot, setFinalPLot] = useState()
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
               const response = await axiosInstance.get('/protected/')
            } catch (error) {
                console.error("Error fetching protected data:", error)
            }
        }
        fetchProtectedData()
    }, []);

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post('/predict/', {ticker:ticker});

            // seting plots
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const plotUrl = `${backendRoot}${response.data.plot_image}`
            setPlot(plotUrl)
            const plot100Url = `${backendRoot}${response.data.plot_image_100_MA}`
            setPlot100(plot100Url)
            const plot200Url = `${backendRoot}${response.data.plot_image_200_MA}`
            setPlot200(plot200Url)
            const finalPlotUrl = `${backendRoot}${response.data.plot_image_test}`
            setFinalPLot(finalPlotUrl)

           if(response.data.error){
            setError(response.data.error)
           }
        } catch (error) {
            console.error("Error making prediction:", error);
        }finally{
            setLoading(false)
        }
    }

    return(
        <>
          <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="form-control" placeholder="Enter Stock Ticker" value={ticker}onChange={(e)=> setTicker(e.target.value)}/>
                        {error && <div className="text-danger mt-1">{error}</div>}

                        {loading ? (
                            <button type="submit" className="btn btn-info d-block mx-auto" disabled>Please wait....</button>
                        ):(
                            <button type="submit" className="btn btn-info mt-3">Predict</button>
                        )}
                    </form>
                </div>
                {/* print prediction plots */}
                <div className="predicyion mt-5">
                    <div className="p-3">
                        {plot && <img src={plot} alt="Prediction Plot" className="img-fluid" />}
                    </div>
                    <div className="p-3">
                        {plot100 && <img src={plot100} alt="Prediction Plot 100 MA" className="img-fluid" />}
                    </div>
                    <div className="p-3">
                        {plot200 && <img src={plot200} alt="Prediction Plot 200 MA" className="img-fluid" />}
                    </div>
                    <div className="p-3">
                        {plot200 && <img src={finalPlot} alt="Prediction Plot 200 MA" className="img-fluid" />}
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}
export default Dashboard

