import React, { Fragment } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { FilaProfesor } from './columnasTablas/FilaProfesor'
import { Icon } from '@iconify/react';

export function ConsultarProfesores() {
    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio='/menuAsistente'/>
                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Información de profesores</h4>

                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >Código</span>
                            <input id="txtCarnet" type="text" className="form-control" />
                            <button className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>
                        {/* Tabla de profesores */}
                        <div class="overflow-auto" id="tablaEstudiantes">
                            <table class="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Código</th>
                                        <th scope="col">Cédula</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Teléfono</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Número de oficina</th>
                                        <th scope="col">Sede</th>
                                    </tr>
                                </thead>
                                <tbody id="tblProfesores" style={{ background: "white" }}>
                                    <FilaProfesor />
                                    <FilaProfesor />
                                    <FilaProfesor />
                                    <FilaProfesor />
                                    <FilaProfesor />
                                    <FilaProfesor />
                                    <FilaProfesor />
                                    <FilaProfesor />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
