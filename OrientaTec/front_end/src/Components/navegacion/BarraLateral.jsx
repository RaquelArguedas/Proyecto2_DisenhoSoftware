import React, { Fragment, useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import Clock from './Clock';
import 'react-calendar/dist/Calendar.css';
const API = process.env.REACT_APP_API;

export function BarraLateral() {
    const [date, setDate] = useState(new Date());
    const [nombreUsuario, setNombreUsuario] = useState('');

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
            console.log("......................", data)
            } else {
            console.log("Error al obtener el nombre de usuario");
            }
        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }
        };

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
                    <div className="my-2"><Calendar onChange={setDate} value={date} /></div>
                </div>
            </div>
        </Fragment>
    )
}