import React, { Fragment, useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import Clock from './Clock';
import 'react-calendar/dist/Calendar.css';
const API = process.env.REACT_APP_API;

export function BarraLateral() {
    const [date, setDate] = useState(new Date());
    const [nombreUsuario, setNombreUsuario] = useState('');

    const handleDateChange = (newDate) => {
        fetch(`${API}/setFechaSimulada/${newDate}`, {  
            method: "POST"
        });
        console.log("Nueva fecha seleccionada:", newDate);
        setDate(newDate);

    };

    // const tileClassName = ({ date, view }) => {
    //     if (view === 'month' && date.toDateString() === date.toDateString()) {
    //         return 'selected-date';
    //     }
    //     return null;
    // };

    useEffect(() => {
        const obtenerNombreUsuario = async () => {
        try {
            const response = await fetch(`${API}/getInfoUsuarioSesionActual`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            });

            if (response.ok) {
            const data = await response.json();
            setNombreUsuario(data.nombre + " " + data.apellido1 + " " +  data.apellido2);
            } else {
            console.log("Error al obtener el nombre de usuario");
            }
        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }
        };

        const obtenerFechaSimulada= async () => {
            try {
                const response = await fetch(`${API}/getFechaSimulada`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                });
    
                const data = await response.json();
                const fecha = new Date(data)
                console.log(fecha)
                const month = fecha.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
                const day = fecha.getDate() + 1 ; // Obtener el día
                const year = fecha.getFullYear(); // Obtener el año
                const formattedDate = `${month}/${day}/${year}`;
                //setFechaRecordatorioB(formattedDate);
                setDate(formattedDate);
            } catch (error) {
                console.log("Error al tomar la fecha:", error);
            }
            };
        obtenerFechaSimulada();
        obtenerNombreUsuario();
    }, []);
    //console.log("barra")
    //console.log(nombreUsuario);
    return (
        <Fragment>
            <div className="m-3 p-2 bg-light">
                <p className="text-center" >{nombreUsuario}</p>
                <div className="text-center">
                    <div className="my-3"><Clock/></div>
                    <div className="my-2"> <Calendar onChange={handleDateChange} value={date} /></div>
                </div>
            </div>
        </Fragment>
    )
}