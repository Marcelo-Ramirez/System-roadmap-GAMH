// components/home/Home.js
import React from 'react';

const Home = () => {
    const username = localStorage.getItem('username'); // Obtener el nombre de usuario de localStorage

    return (
        <div>
            <h1>Bienvenido a la página de inicio, {username}</h1>
        </div>
    );
};

export default Home;
