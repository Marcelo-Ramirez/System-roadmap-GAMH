import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo Sidebar

const Layout = () => {
    // Definición del objeto notifications dentro del componente Layout
    const notifications = {
        tasks: 3,    // Número de tareas pendientes
        projects: 5, // Número de procesos en curso
        folders: 2   // Número de carpetas nuevas o no vistas
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar notifications={notifications} />
            <main style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
                <header>
                    <h1>Mi Aplicación</h1>
                </header>
                <section>
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Layout;
