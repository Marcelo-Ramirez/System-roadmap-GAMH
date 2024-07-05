// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        console.log('Token changed:', token);
        // Almacenar el token en localStorage cuando cambia
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = (newToken) => {
        console.log('Login called with token:', newToken);
        setToken(newToken);
    };

    const logout = () => {
        console.log('Logout called');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
