import React, { Fragment } from 'react'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Navbar } from '../../navegacion/Navbar'
import { FilaEstudiante } from './columnasTablas/FilaEstudiante';
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function ConsultarEstudiantes() {

    // comente lo siguiente porque no esta la funcion del boton

    // const handleSubmit = async (event) => {
    //     event.preventDefault();  
        
    //     // const res = await fetch(`${API}/getEstudiante/${20198}`, { //busca estudiante por carnet, 20198 es el carnet
    //     //     method: "GET",
    //     //     headers: {
    //     //       "Content-Type": "application/json",
    //     //     }
    //     // });

    //     const res = await fetch(`${API}/consultarEstudiantes/${1}`, { //buscar por enum, 1 es el enum
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //         }
    //     });

    //     const data = await res.json() //resultado de la consulta
    //     console.log(data) // imprime en consola web
    //     console.log(data[0])
    //     const obj = JSON.parse(data[0]); 
    //     console.log(obj.nombre) //aqui se obtiene el elemento de cada json
    // }
    
    return (
        <Fragment>
            <div className="container">
                <Navbar />

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
