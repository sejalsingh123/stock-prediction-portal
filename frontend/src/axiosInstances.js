import axios from "axios";


const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})


// Request Interceptor
axiosInstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        // If no response (network error)
        if (!error.response) {
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(error);
            }

            try {
                // IMPORTANT: use raw axios, not axiosInstance
                const response = await axios.post(
                    `${baseURL}/refresh/`,
                    { refresh: refreshToken }
                )
                const newAccessToken = response.data.access
                localStorage.setItem("accessToken", newAccessToken)

                // Update the header for the failed request
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                // Retry the original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.log("Refresh failed, logging out...");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;