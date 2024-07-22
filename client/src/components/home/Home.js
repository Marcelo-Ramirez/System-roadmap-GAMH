import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TaskList from './TaskList';
import Process from './Process';

const Home = () => {
    const [content, setContent] = useState('Mis tareas');
    const notifications = {
        tasks: 2, // Añadido para Mis tareas
        messages: 3,
        projects: 0,
        reports: 5,
        contacts: 1,
    };

    const renderContent = () => {
        switch (content) {
            case 'Mis tareas':
                return <TaskList />;
            case 'Mensajes':
                return <div>Contenido de Mensajes</div>;
            case 'Process':
                return <Process />
            case 'Reportes':
                return <div>Contenido de Reportes</div>;
            case 'Contactos':
                return <div>Contenido de Contactos</div>;
            default:
                return <TaskList />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar setContent={setContent} notifications={notifications} />
            <div className="flex flex-col flex-1">
                <div className="flex-1 flex p-4 h-full">
                    <div className="flex-1 mr-4 overflow-auto custom-scrollbar">
                        {renderContent()}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;
