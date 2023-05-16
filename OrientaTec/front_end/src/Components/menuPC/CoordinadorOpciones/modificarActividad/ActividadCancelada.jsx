import React, { Fragment, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar } from '../../../navegacion/Navbar'
import { BarraLateral } from '../../../navegacion/BarraLateral'

const API = process.env.REACT_APP_API;

export function ActividadCancelada() {
    const observacionRef = useRef();

    //let navigate = useNavigate();
    const gotoModificar = () => { /*navigate('/modificarActividad', {});*/ }

    const { state } = useLocation();

    const handleAgregarObservacion = async (event) => {
        event.preventDefault();
        alert('Observación agregada')

        const idActividad = state.idActividad
        const detalle = observacionRef.current.value
        const res = await fetch(`${API}/crearObservacion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({idActividad, detalle}),
        });

        gotoModificar();
        /*const data = await res.json() //resultado de la consulta
        setIdProfesor((data === undefined ? 0 : data.id))
        setDatosProfesor(data)*/
    }

    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio='/menuCoordinador' />
                <div className="row">
                    <div className="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div className="col-lg m-3 p-3 bg-light">
                        <h4>Cancelar actividad</h4>
                        

                        <form onSubmit={handleAgregarObservacion}>
                            <div class="form-group my-3">
                                <h6>Adjuntar observación</h6>
                                <textarea ref={observacionRef} class="form-control" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-success mb-2">Confirmar</button>
                        </form>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}