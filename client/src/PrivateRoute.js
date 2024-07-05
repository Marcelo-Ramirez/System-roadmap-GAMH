// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ element }) => {
    const { token } = useContext(AuthContext);

    console.log('PrivateRoute: token', token);

    return token ? element : <Navigate to="/" />;
};

export default PrivateRoute;
