import Button from "./Button";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import Logout from "./Logout";

const Header = () => {
    const { loggedIn , setLoggedIn} = useContext(AuthContext);
    return (
        <>
         <div className="navbar container pt-3 pb-3 align-items-start">
            <Link className="navbar-brand text-info" to="/">Stock Prediction Portal</Link>
            <div>
                {loggedIn ? (
                  <>
                     <Logout/>
                      &nbsp;
                     <Link className="btn btn-info" to="/dashboard">Dashboard</Link>
                  </>
                ) : (
                  <> 
                    <Button text='Login' class='btn-outline-info' url='/login'/>
                    &nbsp;
                   <Button text='Register' class='btn-info' url='/register'/>
                  </>
                )}
            </div>
         </div>
        </>
    );
};

export default Header;
