import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

const API = 'http://localhost:5000'; //process.env.REACT_APP_API;

export function CardProf({ btnColor, btnText, nombreCompleto, telefono, correo, oficina, sede, id }) {

    const handleBtnAccion = async (event) => {
        event.preventDefault();

        if (btnColor === "danger") {
            //aqui se le da de baja
            const res = await fetch(`${API}/darBajaProfesor/${id}`, {  //falta cambiar el idProfesor por el deseado
                mode: "no-cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log('dado de baja');
        } else {
            //aca se le asigna como cordinador
            const res = await fetch(`${API}/designarCoordinador/${id}`, {  //falta cambiar el idProfesor por el deseado
                mode: "no-cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json() //resultado de la consulta
            console.log(data) // imprime en consola web
        }
    }

    return (
        <Fragment>
            <div className="card m-3">
                <div className="card-body">
                    <h5 className="card-title m-2">Datos del profesor</h5>

                    <p id="nombre" className='card-text m-2'> {nombreCompleto} </p>

                    <p id="sede" className="card-text m-2">
                        <Icon icon="mdi:office-building" width="24" height="24" />
                        {sede}
                    </p>

                    <p id="telef" className="card-text m-2">
                        <Icon icon="mdi:telephone-outline" width="24" height="24" />
                        {telefono}
                    </p>

                    <p id="correo" className="card-text m-2">
                        <Icon icon="ic:baseline-email" width="24" height="24" />
                        {correo}
                    </p>

                    <p id="oficina" className="card-text m-2">
                        <Icon icon="material-symbols:location-on" width="24" height="24" />
                        {oficina}
                    </p>

                    <button onClick={handleBtnAccion} class={"mx-3 btn btn-" + btnColor}> {btnText} </button>
                </div>
            </div>
        </Fragment>
    )
}
