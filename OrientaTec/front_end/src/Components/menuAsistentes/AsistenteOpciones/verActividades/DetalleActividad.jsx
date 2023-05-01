import React, { Fragment } from 'react'
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { Navbar } from '../../../navegacion/Navbar';
import { BarraLateral } from '../../../navegacion/BarraLateral';
import { Comentario } from '../../../comentarios/Comentario';
import { FormComentario } from '../../../comentarios/FormComentario';

export function DetalleActividad({ comentarios }) {
    return (
        <Fragment>
            <div className='container'>
                <Navbar />

                <div className="row">
                    <div className="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div className="col-lg m-3 p-3 bg-light">
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">Nombre de la actividad</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Tipo de actividad</h6>

                                <div className="row">
                                    <div className="col">
                                        <p id="" className="card-text mb-2">
                                            <Icon icon="material-symbols:calendar-month" width="24" height="24" />
                                            Fecha: 27/06/2023
                                        </p>

                                        <p id="" className="card-text mb-2">
                                            <Icon icon="mdi:alarm-clock" width="24" height="24" />
                                            Hora: 07:00 p.m. Duración: 2 horas
                                        </p>

                                        <p id="" className="card-text mb-2">
                                            <Icon icon="material-symbols:bookmark" width="24" height="24" />
                                            Tipo de actividad <a href="https://youtu.be/COpJ52Fl4aU?t=240">enlace</a>
                                        </p>

                                        <p id="" className="card-text mb-2">
                                            <Icon icon="material-symbols:brightness-empty" width="24" height="24" />
                                            Estado de la actividad
                                        </p>

                                        <a id="" className="card-text mb-2">
                                            <Icon icon="material-symbols:image-rounded" width="24" height="24" />
                                            Afiche
                                        </a>
                                    </div>
                                    <div className="col">
                                        <p id="" className="card-text mb-2">
                                            <Icon icon="mdi:people-group" width="24" height="24" />
                                            Responsables
                                        </p>

                                        <p id="nombresResponsables" className="card-text mb-2">
                                            &emsp; Nombre Apellido Apellido <br />
                                            &emsp; Nombre Apellido Apellido
                                        </p>
                                    </div>
                                </div>
                                <btn href="#" className="btn btn-primary w-25 my-4">Evidencias</btn>
                            </div>
                        </div>

                        {/*Esta parte aparece cuando se llama de profesores, pero no en asistente*/}

                        {comentarios === true &&
                            <div id="seccionComentarios">
                                <hr />
                                <div className="container bg-light">
                                    <h4>Comentarios</h4>
                                </div>

                                <FormComentario />

                                <div className="overflow-auto" id="listaComentarios">
                                    <Comentario />
                                    <Comentario />
                                    <Comentario />
                                    <Comentario />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
