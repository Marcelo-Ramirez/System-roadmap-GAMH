import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/login/Login';

const LoginWrapper = () => {
    // Obtiene el token del contexto de autenticación
    const { token } = useContext(AuthContext);
    
    // Si el token existe, redirige a /home
    return token ? <Navigate to="/home" /> : <Login />;
};

export default LoginWrapper;
