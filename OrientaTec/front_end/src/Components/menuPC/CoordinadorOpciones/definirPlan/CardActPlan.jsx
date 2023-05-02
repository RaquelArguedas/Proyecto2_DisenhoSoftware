import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';

export function CardActPlan() {

    return (
        <Fragment>
            <div class="card my-3 w-100">
                <div class="card-body">
                    <h5 id='nombreActividad' class="card-title">Nombre de la actividad</h5>
                    <h6 id="tipoActividad" class="card-subtitle mb-2 text-muted">Tipo de actividad</h6>

                    <p id="fechaActividad" class="card-text mb-2">
                        <Icon icon="material-symbols:calendar-month" width="24" height="24" />
                        Fecha: 27/06/2023
                    </p>

                    <p id="horaDuracionAct" class="card-text mb-2">
                        <Icon icon="mdi:alarm-clock" width="24" height="24" />
                        Hora: 07:00 p.m. Duración: 2 horas
                    </p>

                    <p id="medioActividad" class="card-text mb-2">
                        <Icon icon="material-symbols:bookmark" width="24" height="24" />
                        Medio <a href="https://youtu.be/COpJ52Fl4aU?t=240">enlace</a>
                    </p>
                </div>
            </div>
        </Fragment >
    )
}