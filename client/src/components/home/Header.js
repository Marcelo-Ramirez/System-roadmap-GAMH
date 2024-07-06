import React from 'react';

const Header = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
            <h2 className="text-xl font-bold">Proceso</h2>
            <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Nuevo</button>
            </div>
        </div>
    );
};

export default Header;
