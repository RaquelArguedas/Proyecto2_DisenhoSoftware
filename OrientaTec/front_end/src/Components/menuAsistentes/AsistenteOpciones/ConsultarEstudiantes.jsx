import React, { Fragment } from 'react'
import { useLocation } from "react-router-dom";
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Navbar } from '../../navegacion/Navbar'
import { FilaEstudiante } from './columnasTablas/FilaEstudiante';
import { Icon } from '@iconify/react';

export function ConsultarEstudiantes() {
    const { state } = useLocation();

    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio={state.linkMenu}/>

                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>

                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Información de estudiantes</h4>

                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >Número de carnet</span>
                            <input id="txtCarnet" type="text" className="form-control" />
                            <button className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>

                        {/* Tabla de estudiantes */}
                        <div class="overflow-auto" id="tablaEstudiantes">
                            <table class="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Carnet</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Teléfono</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Sede</th>
                                    </tr>
                                </thead>
                                <tbody id="tblEstudiantes" style={{ background: "white" }}>
                                    <FilaEstudiante />
                                    <FilaEstudiante />
                                    <FilaEstudiante />
                                    <FilaEstudiante />
                                    <FilaEstudiante />
                                    <FilaEstudiante />
                                    <FilaEstudiante />
                                    <FilaEstudiante />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
