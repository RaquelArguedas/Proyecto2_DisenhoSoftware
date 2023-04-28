import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';

export default function Actividad() {
    return (
        <Fragment>
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title">Nombre de la actividad</h5>

                    <div className="row">
                        <div className="col">
                            <p id="" class="card-text mb-2">
                                <Icon icon="material-symbols:calendar-month" width="24" height="24" />
                                Fecha: 27/06/2023
                            </p>

                            <p id="" class="card-text mb-2">
                                <Icon icon="mdi:alarm-clock" width="24" height="24" />
                                Hora: 07:00 p.m. Duración: 2 horas
                            </p>

                            <p id="" class="card-text mb-2">
                                <Icon icon="material-symbols:bookmark" width="24" height="24" />
                                Tipo de actividad <a href="https://youtu.be/COpJ52Fl4aU?t=240">enlace</a>
                            </p>

                            <p id="" class="card-text mb-2">
                                <Icon icon="material-symbols:brightness-empty" width="24" height="24" />
                                Estado de la actividad
                            </p>

                            <a id="" class="card-text mb-2">
                                <Icon icon="material-symbols:image-rounded" width="24" height="24" />
                                Afiche
                            </a>
                        </div>
                        <div className="col">
                            <p id="" class="card-text mb-2">
                                <Icon icon="mdi:people-group" width="24" height="24" />
                                Responsables
                            </p>

                            <p id="nombresResponsables" class="card-text mb-2">
                                &emsp; Nombre Apellido Apellido <br/>
                                &emsp; Nombre Apellido Apellido
                            </p>

                            <a href="#" class="btn btn-primary">Ver actividad</a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
