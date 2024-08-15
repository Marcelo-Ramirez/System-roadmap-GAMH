// PrivateRoute.js
import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { queryValidToken } from '../services/api';

const PrivateRoute = ({ element }) => {
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const fetchToken = async () => {
            try {
                await queryValidToken();
                setIsValid(true);
            } catch (error) {
                console.error('Error:', error);
                setIsValid(false);
            }
        };

        fetchToken();
    }, []);
    

    return isValid ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
