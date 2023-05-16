import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';

export function CardActPlan({datos}) {
    const tipoActividad = (datos.tipoActividad===1 ? "Orientadora" : (datos.tipoActividad===2 ? "Motivacional" : (datos.tipoActividad===3 ? "Apoyo estudiantil": (datos.tipoActividad===4 ? "Orden tecnico": "Recreativa"))))
    
    return (
        <Fragment>
            <div class="card my-3 w-100">
                <div class="card-body">
                    <h5 id='nombreActividad' class="card-title">Nombre: {datos.nombreActividad}  ID: {datos.idActividad}</h5>
                    <h6 id="tipoActividad" class="card-subtitle mb-2 text-muted">Tipo Actividad: {tipoActividad}</h6>

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
        </Fragment >
    )
}