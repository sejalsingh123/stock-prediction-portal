import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Logout = () => {
    const { setLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        toast.success("You have been logged out.");
    };

    return (
        <>
            <button onClick={handleLogout} className="btn btn-outline-danger">
                Logout
            </button>
        </>
    );
};
export default Logout;