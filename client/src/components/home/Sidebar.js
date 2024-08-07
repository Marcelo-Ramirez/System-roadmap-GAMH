import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Sidebar = ({ setContent, notifications }) => {
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };
    return (
        <div className="w-1/5 h-screen flex flex-col justify-between bg-gray-700 text-white border-r border-gray-200 pr-1">
            <div>
                <div className="p-4 flex items-center justify-center bg-gray-700 text-white pt-9">
                    <img src={`${process.env.PUBLIC_URL}/static/logoDraw.png`} alt="Logo" className="h-8 mr-2" />
                    <h1 className="text-xxxs font-bold tracking-wider">Gobierno Autonomo Municipal de Humanataaa</h1>
                </div>
                <nav className="mt-6 flex-grow">
                    <ul>
                        <li className="p-4 hover:bg-gray-200 cursor-pointer flex justify-between mb-2" onClick={() => setContent('Mis tareas')}>
                            Mis tareas
                            {notifications.tasks > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{notifications.tasks}</span>}
                        </li>
                        <li className="p-4 hover:bg-gray-200 cursor-pointer flex justify-between mb-2" onClick={() => setContent('Mensajes')}>
                            Mensajes
                            {notifications.messages > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{notifications.messages}</span>}
                        </li>
                        <li className="p-4 hover:bg-gray-200 cursor-pointer flex justify-between mb-2" onClick={() => setContent('Process')}>
                            Procesos
                            {notifications.projects > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{notifications.projects}</span>}
                        </li>
                        <li className="p-4 hover:bg-gray-200 cursor-pointer flex justify-between mb-2" onClick={() => setContent('Reportes')}>
                            Reportes
                            {notifications.reports > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{notifications.reports}</span>}
                        </li>
                        <li className="p-4 hover:bg-gray-200 cursor-pointer flex justify-between mb-2" onClick={() => setContent('Contactos')}>
                            Contactos
                            {notifications.contacts > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{notifications.contacts}</span>}
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="p-4">
                <button className="text-xs text-white rounded-lg hover:bg-red-300" onClick={handleLogout}>
                    Cerrar Sesion
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
