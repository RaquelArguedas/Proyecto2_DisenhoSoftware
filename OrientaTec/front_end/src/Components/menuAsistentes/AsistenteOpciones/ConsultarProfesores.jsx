import React, { Fragment , useRef, useState} from 'react'
import { useLocation } from "react-router-dom";
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { FilaProfesor } from './columnasTablas/FilaProfesor'
import { Icon } from '@iconify/react';

const API =  'http://localhost:5000'; 


export function ConsultarProfesores() {

    const codigoRef = useRef();
    const [profesores, setProfesores] = useState([[]]);

    const clearProfesores = () => {
        setProfesores([[]]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();  

    //    aca se busca un profesor por un codigo
        if(codigoRef.current.value===''){
            console.log(codigoRef.current.value);
            const res = await fetch(`${API}/getAllProfesores`, {  //falta cambiar el codigo por el deseado
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                }
              });
              const data = await res.json()
              setProfesores(() => {
                clearProfesores();
                return [data]
            })
            console.log(data)
        }else{
            console.log(codigoRef.current.value);
            //    aca se buscan todos los profesores del equipo guia
            const res = await fetch(`${API}/getProfesorCodigo/${codigoRef.current.value}`, { 
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                }
            });
            const data = await res.text() //resultado de la consulta
            setProfesores(()=>{
                clearProfesores();
                return(data[0]===['"No existe"\n'] ? [[]] : [[data]])
            } )
        }
        
    }

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
                        <form onSubmit={handleSubmit}>
                            <div className="input-group w-50 my-3">
                                <span className="input-group-text" >Código</span>
                                <input ref={codigoRef} type="text" className="form-control" id='inputCodigo' placeholder='Ingrese el código del profesor a buscar' />
                                <button className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                            </div>
                        </form>
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
                                    {profesores[0].map((profesor) => (
                                        JSON.parse(profesor).codigo != undefined &&
                                        <FilaProfesor
                                            codigo={JSON.parse(profesor).codigo}
                                            cedula={JSON.parse(profesor).cedula}
                                            nombreCompleto={JSON.parse(profesor).nombre + ' ' + JSON.parse(profesor).apellido1 + ' ' + JSON.parse(profesor).apellido2}
                                            telefono={JSON.parse(profesor).numeroCelular}
                                            correo={JSON.parse(profesor).correoElectronico}
                                            oficina={JSON.parse(profesor).numeroOficina}
                                            sede={JSON.parse(profesor).sede} />
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
