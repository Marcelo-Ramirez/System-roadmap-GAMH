import React, {useEffect, useState} from "react";
import { queryValidToken } from "../services/api";
import Login from "../pages/Login";

const LoginWrapper = ({ element }) => {
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const fetchToken = async () => {
            try {
                await queryValidToken();
                setIsValid(true);
            } catch (error) {
                console.error("Error:", error);
                setIsValid(false);
            }
        };

        fetchToken();
    }, []);

    return isValid ? element : <Login />;
}

export default LoginWrapper;