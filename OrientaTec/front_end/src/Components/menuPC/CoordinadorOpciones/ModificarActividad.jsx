import React, { Fragment, useState } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';
import { ListaResponsables } from './modificarActividad/ListaResponsables';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function ModificarActividad() {
    const [responsables, setResponsables] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    const handleAddResponsable = () => {
        setResponsables((prevResponsables) => {
            return [...prevResponsables, { nombre: "Nombre Apellido Apellido" }];
        });
    };


    return (
        <Fragment>
            <div className="container">
                <Navbar />
                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Modificar actividad</h4>

                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >ID de la actividad</span>
                            <input id="txtCarnet" type="text" className="form-control" />
                            <button className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>

                        <div className="row">
                            <div className="col ">
                                <div className="input-group w-100 my-3">
                                    <span className="input-group-text" >Nombre</span>
                                    <input id="txtCarnet" type="text" className="form-control" />
                                </div>

                                <div className="input-group w-100 my-3">
                                    <span className="input-group-text">Responsables</span>
                                    <select class="form-select" onChange={handleAddResponsable} aria-label="ProfesSelect">¿
                                        <option value="1">Nombre Apellido Apellido</option>
                                        <option value="2">Nombre Apellido Apellido</option>
                                        <option value="3">Nombre Apellido Apellido</option>
                                    </select>
                                </div>

                                <ListaResponsables responsables={responsables} />
                            </div>
                            <div className="col-lg-6">
                                <div className="input-group w-100 my-3">
                                    <span className="input-group-text w-25">Tipo</span>
                                    <select class="form-select" aria-label="TipoActividad">
                                        <option value="1">Charla</option>
                                        <option value="2">Juego</option>
                                        <option value="3">Taller</option>
                                    </select>
                                </div>

                                <div className="input-group w-100 my-3">
                                    <span className="input-group-text w-25">Modalidad</span>
                                    <select class="form-select" aria-label="ModalidadActividad">
                                        <option value="1">Presencial</option>
                                        <option value="2">Virtual</option>
                                    </select>
                                </div>

                                <div className="input-group w-100 my-3">
                                    <span className="input-group-text w-25">Estado</span>
                                    <select class="form-select" aria-label="EstadoActividad">
                                        <option value="1">Planeada</option>
                                        <option value="2">Publicada</option>
                                        <option value="3">Realizada</option>
                                        <option value="4">Cancelada</option>
                                    </select>
                                </div>

                                <div className="input-group w-100 my-3">
                                    <button className="btn btn-info w-25 text-light">Afiche</button>
                                    <button className="btn btn-success w-25 text-light">Subir Afiche</button>
                                </div>

                                <div className="input-group w-100 my-3">
                                    <p>Fecha y hora</p>
                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date) } showTimeSelect dateFormat="dd/MM/yyyy hh:mm aa"/>
                                </div>

                                <div className="input-group w-100 my-3">
                                    <span className="input-group-text" >Duración</span>
                                    <input id="txtCarnet" type="text" className="form-control" placeholder="horas" />
                                </div>

                                <div className="input-group w-100 my-3">
                                    <button className="btn btn-success w-50">Actualizar</button>
                                    <button className="btn btn-danger w-50">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}