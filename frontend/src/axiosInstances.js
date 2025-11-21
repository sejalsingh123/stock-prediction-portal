import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_BASE_API;
const axiosInstance = axios.create({
    baseURL: baseURL,
})

// Request interceptor
axiosInstance.interceptors.request.use(
    function (config){
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    }, 
    function (error){
        return Promise.reject(error)
    }
)

// reponse interceptor
axiosInstance.interceptors.response.use(
      function(response){
        return response
      },
      async function(error){
        const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true
            const refreshToken = localStorage.getItem('refreshToken')
            try {
            const response = await axiosInstance.post('/refresh/', {refresh: refreshToken})
            console.log("new access token==>", response.data.access)
            localStorage.setItem('accessToken', response.data.access)
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
            return axiosInstance(originalRequest)
            } catch (error) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem("refreshToken")
            }
        }
        return Promise.reject(error)

      }
)

export default axiosInstance;