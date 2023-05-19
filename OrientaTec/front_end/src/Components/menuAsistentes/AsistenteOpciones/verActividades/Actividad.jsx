import React, { Fragment, useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
//A ver


export function Actividad({ datos }) {
    let navigate = useNavigate();

    const { state } = useLocation();

    const [responsables, setResponsables] = useState([]);

    useEffect(() => {
        const responsablesJSON = JSON.parse(datos.responsables);
        setResponsables(responsablesJSON.map(responsable => ({
            id: JSON.parse(responsable).id,
            nombre: JSON.parse(responsable).nombre + ' ' +
                JSON.parse(responsable).apellido1 + ' ' +
                JSON.parse(responsable).apellido2
        })));
    }, []);

    const tipoActividad = (datos.tipoActividad === 1 ? "Orientadora" : (datos.tipoActividad === 2 ? "Motivacional" : (datos.tipoActividad === 3 ? "Apoyo estudiantil" : (datos.tipoActividad === 4 ? "Orden tecnico" : "Recreativa"))))
    const estado = (datos.estado === 1 ? "Planeada" : (datos.estado === 2 ? "Notificada" : (datos.estado === 3 ? "Realizada" : "Cancelada")))
    const gotoDetalleActividad = () => { navigate('/verplan/detalle', { state: { comentarios: state.comentarios, linkMenu: state.linkMenu, datosActividad: datos } }); }

    return (
        <Fragment>
            <div class="card my-3">
                <div class="card-body">
                    <h5 id='nombreActividad' class="card-title">Nombre: {datos.nombreActividad}  ID: {datos.idActividad}</h5>
                    <h6 id="tipoActividad" class="card-subtitle mb-2 text-muted"> Tipo Actividad: {tipoActividad}</h6>

                    <div className="row">
                        <div className="col">
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

                            <p id="estadoActividad" class="card-text mb-2">
                                <Icon icon="material-symbols:brightness-empty" width="24" height="24" />
                                Estado: {estado}
                            </p>

                            {/* <a id="afiche" class="card-text mb-2">
                                <Icon icon="material-symbols:image-rounded" width="24" height="24" />
                                Afichon
                            </a> */}
                        </div>
                        <div className="col">
                            <p id="" class="card-text mb-2">
                                <Icon icon="mdi:people-group" width="24" height="24" />
                                Responsables
                            </p>

                            {responsables.length > 0 &&
                                responsables.map((responsable) =>
                                (
                                    <p>
                                        {responsable.nombre}
                                    </p>
                                )
                                )
                            }

                            <btn onClick={gotoDetalleActividad} class="btn btn-primary">Ver actividad</btn>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
