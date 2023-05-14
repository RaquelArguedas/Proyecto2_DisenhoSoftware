import React, { Fragment, useState  } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { FilaProfesor } from './columnasTablas/FilaProfesor'
import { Icon } from '@iconify/react';
import { useLocation } from "react-router-dom";

const API = 'http://localhost:5000'; //process.env.REACT_APP_API;

export function ConsultarEquipo() {
    const { state } = useLocation();
    const [profesores, setProfesores] = useState([[]]);

    const clearProfesores = () => {
        setProfesores([[]]);
    };

    //la siguiente llamada obtiene la info del equipo guia
    const handleSubmit = async () => {
        const res = await fetch(`${API}/getEquipoGuia`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json(); //resultado de la consulta

        setProfesores(() => {
            clearProfesores();
            return [data]
        })

        console.log(data); // imprime en consola web
        console.log(data[0]);
        const obj = JSON.parse(data[0]);
        console.log(obj.nombre); //aqui se obtiene el elemento de cada json
    };

    React.useEffect(() => {
        handleSubmit()
    }, []);

    return (
        <Fragment>
            <div className="container">
                <Navbar Navbar linkInicio={state.linkMenu} />
                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Composición del Equipo guía</h4>

                        {/* Tabla de miembros */}
                        <div class="overflow-auto" id="tablaEstudiantes">
                            <h5 className="my-2">Miembros</h5>
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
                                        <th scope="col">Rol</th>
                                    </tr>
                                </thead>
                                <tbody id="tblProfesores" style={{ background: "white" }}>
                                    {profesores[0].map((profesor) => (
                                        <FilaProfesor
                                            codigo={JSON.parse(profesor).codigo}
                                            cedula={JSON.parse(profesor).cedula}
                                            nombreCompleto={JSON.parse(profesor).nombre + ' ' + JSON.parse(profesor).apellido1 + ' ' + JSON.parse(profesor).apellido2}
                                            telefono={JSON.parse(profesor).numeroCelular}
                                            correo={JSON.parse(profesor).correoElectronico} 
                                            oficina={JSON.parse(profesor).numeroOficina}
                                            sede={JSON.parse(profesor).sede}
                                            rol={JSON.parse(profesor).autoridad} />
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
