import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TaskList from './TaskList';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <div className="flex-1 flex p-4 h-full">
                    <div className="flex-1 mr-4 overflow-auto">
                        <TaskList />
                    </div>
                    <div className="flex flex-col items-end">
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
