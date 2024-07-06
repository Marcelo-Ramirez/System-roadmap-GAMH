import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Login from './components/login/Login';
import Home from './components/home/Home';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/login" element={<LoginWrapper />} />
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

const LoginWrapper = () => {
    const { token } = useContext(AuthContext);
    return token ? <Navigate to="/home" /> : <Login />;
};

export default App;
