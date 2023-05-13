import React, { Fragment, useRef, useState } from 'react'
import { useLocation } from "react-router-dom";
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Navbar } from '../../navegacion/Navbar'
import { FilaEstudiante } from '../../menuAsistentes/AsistenteOpciones/columnasTablas/FilaEstudiante'
import { Icon } from '@iconify/react';

const API = 'http://localhost:5000'; //process.env.REACT_APP_API;

export function ConsultarEstudiantesP() {
    const { state } = useLocation();

    const carnetRef = useRef();
    let opcionFiltro = 1;
    const [estudiantes, setEstudiantes] = useState([[]]);

    const setFiltro = (event) => {
        opcionFiltro = event.target.value
    }

    const clearEstudiantes = () => {
        setEstudiantes([[]]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (carnetRef.current.value === '') {
            const res = await fetch(`${API}/consultarEstudiantes/${opcionFiltro}`, { //buscar por enum, 1 es el enum
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json() //resultado de la consulta
            setEstudiantes(() => {
                clearEstudiantes();
                return [data]
            })

        } else {
            const res = await fetch(`${API}/getEstudiante/${carnetRef.current.value}`, { //busca estudiante por carnet, 20198 es el carnet
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.text();
            setEstudiantes(() => {
                clearEstudiantes();
                return (data[0] === ['"No existe"\n'] ? [[]] : [[data]])
            })


        }
    }

    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio={state.linkMenu} />

                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>

                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Información de estudiantes</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="col-12">
                                <label for="inputCarnet" class="form-label">Carnet:</label>
                                <input ref={carnetRef} type="text" class="form-control" id="inputCarnet" placeholder="Ingrese el número de carnet a buscar" />
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" onChange={setFiltro} value={1} type="radio" name="rgFiltro" defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Orden alfabético
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" onChange={setFiltro} value={3} type="radio" name="rgFiltro" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Orden por campus
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <input className="form-check-input" onChange={setFiltro} value={2} type="radio" name="rgFiltro" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                                            Orden por número de carnet
                                        </label>
                                    </div>
                                </div>
                                <div className="my-3">
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
                                    {estudiantes[0].map((estudiante) => (
                                        JSON.parse(estudiante).carnet != undefined &&
                                        <FilaEstudiante
                                            carnet={JSON.parse(estudiante).carnet}
                                            nombreCompleto={JSON.parse(estudiante).nombre + ' ' + JSON.parse(estudiante).apellido1 + ' ' + JSON.parse(estudiante).apellido2}
                                            telefono={JSON.parse(estudiante).numeroCelular}
                                            correo={JSON.parse(estudiante).correoElectronico}
                                            sede={JSON.parse(estudiante).sede} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
