import React from "react";
import { useLocation } from "react-router-dom";

const RouterCapture = () => {
    const location = useLocation();
    return (
        <div>
            <h2>La ruta {location.pathname} no existe</h2>
        </div>
    );
}

export default RouterCapture;