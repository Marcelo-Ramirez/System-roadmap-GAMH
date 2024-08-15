import React from 'react';
import { Link } from 'react-router-dom';
import { queryLogout } from '../services/api'; // Importa la función de logout desde api.js

const Sidebar = ({ notifications }) => {
    const handleLogout = async () => {
        try {
            await queryLogout(); // Llama a la función queryLogout para manejar el logout
            // Puedes agregar lógica adicional aquí si necesitas limpiar el estado de la aplicación o redirigir al usuario
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="w-1/5 h-screen flex flex-col justify-between bg-gray-700 text-white border-r border-gray-200 pr-1">
            <div>
                <Link to="/inicio">
                    <div className="p-4 flex items-center justify-center bg-gray-700 text-white pt-9">
                        <img src={`${process.env.PUBLIC_URL}/static/logoDraw.png`} alt="Logo" className="h-8 mr-2" />
                        <h1 className="text-xxxs font-bold tracking-wider">Gobierno Autonomo Municipal de Humanataaa</h1>
                    </div>
                </Link>
                <nav className="mt-6 flex-grow">
                    <ul>
                        <li className="p-4 hover:bg-gray-200 cursor-pointer flex justify-between mb-2">
                            <Link to="/pendientes" className="flex justify-between w-full">
                                Pendientes
                                {notifications.tasks > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{notifications.tasks}</span>}
                            </Link>
                        </li>
                        <li className="p-4 hover:bg-gray-200 cursor-pointer flex justify-between mb-2">
                            <Link to="/procesos" className="flex justify-between w-full">
                                Procesos
                                {notifications.projects > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{notifications.projects}</span>}
                            </Link>
                        </li>
                        <li className="p-4 hover:bg-gray-200 cursor-pointer flex justify-between mb-2">
                            <Link to="/carpetas" className="flex justify-between w/full">
                                Carpetas
                                {notifications.folders > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{notifications.folders}</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="p-4">
                <button className="text-xs text-white rounded-lg hover:bg-red-300" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
