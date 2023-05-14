import React, { Fragment } from 'react'
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
//A ver
export function Actividad() {
    let navigate = useNavigate();

    const { state } = useLocation();
    //state.datosactividad.nombre

    const gotoDetalleActividad = () => { navigate('/verplan/detalle', {state:{comentarios: state.comentarios, linkMenu: state.linkMenu}}); }
    const horaInicio = new Date(state.datos.horaInicio);
    const horaFin = new Date(state.datos.horaFin);

    const duracion = new Date(horaFin - horaInicio);

    const duracionHoras = duracion.getUTCHours();
    const duracionMinutos = duracion.getUTCMinutes();
    console.log(duracion)
    return (
        <Fragment>
            <div class="card my-3">
                <div class="card-body">
                    <h5 id='nombreActividad' class="card-title">{state.datos.nombreActividad} </h5>
                    <h6 id="tipoActividad" class="card-subtitle mb-2 text-muted">{state.datos.tipoActividad}</h6>

                    <div className="row">
                        <div className="col">
                            <p id="fechaActividad" class="card-text mb-2">
                                <Icon icon="material-symbols:calendar-month" width="24" height="24" />
                                Fecha: {state.datos.fechaActividad}
                            </p>

                            <p id="horaDuracionAct" class="card-text mb-2">
                                <Icon icon="mdi:alarm-clock" width="24" height="24" />
                                Hora: {state.datos.horaInicio} Duración en horas: {duracionHoras}
                            </p>

                            <p id="medioActividad" class="card-text mb-2">
                                <Icon icon="material-symbols:bookmark" width="24" height="24" />
                                Medio <a href={state.datos.enlace}>enlace</a>
                            </p>

                            <p id="estadoActividad" class="card-text mb-2">
                                <Icon icon="material-symbols:brightness-empty" width="24" height="24" />
                                Estado: {state.datos.estado}
                            </p>

                            <a id="afiche" class="card-text mb-2">
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
                            

                            <btn onClick={gotoDetalleActividad} class="btn btn-primary">Ver actividad</btn>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
