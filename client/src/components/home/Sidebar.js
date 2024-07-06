import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-4 flex items-center">
                <img src={`${process.env.PUBLIC_URL}/static/logo.png`} alt="Logo" className="h-8 mr-2" />
                <h1 className="text-2xl font-bold">GAMH</h1>
            </div>
            <nav className="mt-6">
                <ul>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Mis tareas</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Mensajes</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Proyectos</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Reportes</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Contactos</li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;