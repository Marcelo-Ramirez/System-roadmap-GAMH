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
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <div className="p-4 flex justify-between items-center">
                    <TaskList />
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
