import Button from "./Button"
import { useContext } from "react"
import { AuthContext } from "../AuthProvider";

const Main = () => {
    const { loggedIn } = useContext(AuthContext);

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="p-5 text-center bg-light-dark mt-4 rounded-3 w-100">
                    <h1 className="text-info">Welcome to the Stock Prediction Portal</h1>
                    <p className="text-light lead">Get insights and predictions on stock market trends.</p>
                    {loggedIn ? (
                        <>
                            <Button text='Explore now' class='btn-outline-warning' url='/dashboard' />  
                        </>
                    ) : (
                        <Button text='Login' class='btn-outline-warning' url='/login' />
                    )}
                </div>
            </div>
        </>
    );
};

export default Main;

