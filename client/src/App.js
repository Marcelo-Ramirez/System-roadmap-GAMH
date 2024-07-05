// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Login from './components/login/Login';
import Home from './components/home/Home';

function App() {
    console.log('App component rendered');

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                    {/* Ruta para manejar todas las rutas desconocidas */}
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
