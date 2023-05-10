import React, { Fragment } from 'react'
import { useLocation } from "react-router-dom";
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Navbar } from '../../navegacion/Navbar'
import { FilaEstudiante } from '../../menuAsistentes/AsistenteOpciones/columnasTablas/FilaEstudiante'
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function ConsultarEstudiantesP() {
    const { state } = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();  
        console.log("hola")
        console.log(API)
        const res = await fetch(`${API}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
        });
        const data = await res.json()
        console.log(data)
        // Aquí puedes enviar los datos a tu backend o hacer lo que necesites con ellos
      }
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
                        <form onSubmit={handleSubmit}>
                            <div class="col-12">
                                <label for="inputCarnet" class="form-label">Carnet:</label>
                                <input type="text" class="form-control" id="inputCarnet" placeholder="Ingrese el número de carnet a buscar"/>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"defaultChecked />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Orden alfabético
                                    </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Orden por campus
                                    </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                        Orden por número de carnet
                                    </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                                        Por solo un estudiante
                                    </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" class="btn btn-primary" > <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar</button>
                                </div>
                            
                            </div>
                        </form>

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
