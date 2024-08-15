import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.css';
import background from '../assets/images/background.jpg';
import { queryLogin, queryRegister } from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [area, setArea] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const areas = [
        "MAE",
        "STRIO. MUNICIPAL",
        "D.A.F.",
        "D.I.U.D.",
        "U. ACTIVOS FIJOS",
        "A. SALUD Y EDUC.",
        "LEGAL",
        "CONTADOR Y TESORERO",
        "RES. DNA Y SLIM",
        "UNI. DE CONTRATACION",
        "UNI. DE AGUA Y AGROP.",
        "COR. DESPACHO",
        "ASIS. ADMI."
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Formulario enviado:', { username, password, area, isRegistering });

        try {
            const response = isRegistering 
                ? await queryRegister(username, password, area) 
                : await queryLogin(username, password);

            console.log('Respuesta de la API:', response);

            if (response.message) {
                alert(response.message);
            } else if (response.token) {
                document.cookie = `token=${response.token}; path=/`; // Guardar el token en una cookie
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
                    {isRegistering && (
                        <div className="mb-4 text-left">
                            <label className="block text-gray-700">Área</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                            >
                                <option value="">Selecciona un área</option>
                                {areas.map((area, index) => (
                                    <option key={index} value={area}>
                                        {area}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        {isRegistering ? 'Registrar' : 'Login'}
                    </button>
                </form>
                <button
                    className="w-full mt-4 text-blue-500"
                    onClick={() => setIsRegistering(!isRegistering)}
                > 
                    {isRegistering ? '¿Ya tienes una cuenta? Login' : '¿No tienes una cuenta? Regístrate'}
                </button>
            </div>
        </div>
    );
};

export default Login;
