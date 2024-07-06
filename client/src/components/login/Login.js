import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';
import background from './background.jpg';
import { queryLogin, queryRegister } from './api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted:', { username, password, isRegistering });

        try {
            const response = isRegistering 
                ? await queryRegister(username, password) 
                : await queryLogin(username, password);

            console.log('API response:', response);

            if (response.message) {
                alert(response.message);
            } else if (response.token) {
                document.cookie = `token=${response.token}; path=/`; // Guardar el token en una cookie
                login(response.token);
                alert('Login exitoso');
                navigate('/home');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);   
        }
    };

    return (
        <div
            className="login-container min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
                <div className="logo-container flex justify-center items-center mb-6">
                    <img className="login-logo" src={`${process.env.PUBLIC_URL}/static/logo.png`} alt="logo" />
                </div>
                <h2 className="text-2xl font-bold mb-6">{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-left">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Ingresa nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 text-left">
                        <label className="block text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Ingresa contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                <button
                    className="w-full mt-4 text-blue-500"
                    onClick={() => setIsRegistering(!isRegistering)}
                > 
                    {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
                </button>
            </div>
        </div>
    );
};

export default Login;
