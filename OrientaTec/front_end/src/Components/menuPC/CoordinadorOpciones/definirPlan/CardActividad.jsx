import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function CardActividad({datos}) {
    const tipoActividad = (datos.tipoActividad===1 ? "Orientadora" : (datos.tipoActividad===2 ? "Motivacional" : (datos.tipoActividad===3 ? "Apoyo estudiantil": (datos.tipoActividad===4 ? "Orden tecnico": "Recreativa"))))
     //falta el boton para agregar cada actividad al plan
    const handleSubmit = async (event) => {
        event.preventDefault();  

        const res = await fetch(`${API}/definirPlanActividades/${datos.idActividad}`, {  //el 1 es el id de la actividad
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
          });
    }
    return (
        <Fragment>
            <div class="card my-3 w-100">
                <div class="card-body">
                    <div className="row">
                        <div className="col">
                            <h5 id='nombreActividad' class="card-title">Nombre: {datos.nombreActividad}  ID: {datos.idActividad}</h5>
                            <h6 id="tipoActividad" class="card-subtitle mb-2 text-muted">Tipo Actividad: {tipoActividad}</h6>
                        </div>
                        <div className="col-sm-2">
                            <btn 
                            onClick={handleSubmit}
                            class="btn btn-success w-100"><Icon icon="material-symbols:add-circle-outline-rounded" width="24" height="24" /></btn>
                        </div>
                    </div>

                    <p id="fechaActividad" class="card-text mb-2">
                        <Icon icon="material-symbols:calendar-month" width="24" height="24" />
                        Fecha: {datos.fechaActividad}
                    </p>

                    <p id="horaDuracionAct" class="card-text mb-2">
                        <Icon icon="mdi:alarm-clock" width="24" height="24" />
                        Hora Inicio: {datos.horaInicio}    
                    </p>
                    <p id="horaDuracionAct" class="card-text mb-2">
                        <Icon icon="mdi:alarm-clock" width="24" height="24" />
                        Hora fin: {datos.horaFin} 
                    </p>

                    <p id="medioActividad" class="card-text mb-2">
                        <Icon icon="material-symbols:bookmark" width="24" height="24" />
                        Medio <a href={datos.enlace}>enlace</a>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}