import React from "react";
import logo_Table from '../assets/images/logo-table.png';

const Table = () => {
    return (
        <div className="w-full grid grid-cols-12 gap-1 place-items-stretch place-content-center text-xs">
            <div className="row-span-5 col-span-4 bg-white text-black text-center border flex flex-col items-center justify-center">
                <img src={logo_Table} alt="logo" className="mx-auto" />
                <div className="text-xs mt-2">
                    GOBIERNO AUTONOMO MUNICIPAL DE LA PAZ<br />
                    CUARTA SECCION - PROVINCIA CAMACHO<br />
                    LA PAZ - BOLIVIA
                </div>
            </div>
            <div className="col-span-8 bg-blue-600 text-white text-center border flex items-center justify-center h-full">HOJA DE RUTA</div>
            <div className="col-span-8 bg-white text-black text-center border flex items-center justify-center h-full">FORMULARIO DE N0100/2024</div>
            <div className="col-span-1 bg-blue-300 text-black text-center border flex items-center justify-center h-full">GESTION</div>
            <div className="col-span-2 bg-blue-300 text-black text-center border flex items-center justify-center h-full">FECHA DE INGRESO</div>
            <div className="col-span-1 bg-blue-300 text-black text-center border flex items-center justify-center h-full">HORA</div>
            <div className="col-span-1 bg-blue-300 text-black text-center border flex items-center justify-center h-full">FOJAS</div>
            <div className="row-span-2 col-span-2 bg-blue-300 text-black text-center border flex items-center justify-center h-full">NUMERO CORRELATIVO <br />(HOJA DE RUTA)</div>
            <div className="row-span-2 col-span-1 text-violet-400 text-center border flex items-center justify-center h-full">620</div>
            <div className="col-span-1 text-black text-center border flex items-center justify-center h-full">2024</div>
            <div className="col-span-2 text-black text-center border flex items-center justify-center h-full">10 de abril de 2024</div>
            <div className="col-span-1 text-black text-center border flex items-center justify-center h-full">14:33</div>
            <div className="col-span-1 text-black text-center border flex items-center justify-center h-full">1</div>
            <div className="col-span-1 bg-blue-300 text-black text-center border flex items-center justify-center h-full">REMITENTE</div>
            <div className="col-span-7 text-black text-center border flex items-center justify-center h-full">EDWIN PAJZI YANA</div>
            <div className="col-span-1 bg-emerald-50 text-black text-center border flex items-center justify-center h-full">HR EXTERNA</div>
            <div className="col-span-1 bg-green-100 text-black text-center border flex items-center justify-center h-full">DIA</div>
            <div className="col-span-1 bg-green-100 text-black text-center border flex items-center justify-center h-full">MES</div>
            <div className="col-span-1 bg-green-100 text-black text-center border flex items-center justify-center h-full">AÑO</div>
            <div className="row-span-2 col-span-1 bg-blue-300 text-black text-center border flex items-center justify-center h-full">REFERENCIA</div>
            <div className="row-span-2 col-span-7 text-black text-center border flex items-center justify-center h-full">SOLICITUD DE COMPRA DE MEDICAMENTOS E INSUMOS 2DO TRIMESTRE GESTION 2024 C.S.C.I HUMANATA</div>
            <div className="col-span-1 text-black text-center border flex items-center justify-center h-full">12</div>
        </div>
    );
};

export default Table;
