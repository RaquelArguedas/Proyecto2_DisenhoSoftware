import React, { Fragment, useRef, useState } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';
import { CardProf } from './asignarQuitarCoord/CardProfesor';

const API = process.env.REACT_APP_API;

export function DarBajaProfesor() {
    const codigoRef = useRef();
    const [datosProfesor, setDatosProfesor] = useState({});
    const [idProfesor, setIdProfesor] = useState(undefined);

    const handleBuscarProfesor = async (event) => {
        event.preventDefault();

        //aca se busca un profesor por un codigo
        const res = await fetch(`${API}/getProfesorCodigo/${(codigoRef.current.value === '' ? 0 : codigoRef.current.value)}`, {  
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json() //resultado de la consulta
        setIdProfesor((data === undefined ? 0 : data.id))
        setDatosProfesor(data)
    }

    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio='/menuAsistente' />
                <div className="row">
                    <div className="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div className="col-lg m-3 p-3 bg-light">
                        <h4>Dar de baja a un profesor</h4>

                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >Código</span>
                            <input ref={codigoRef} id="txtCarnet" type="text" className="form-control" />
                            <button onClick={handleBuscarProfesor} className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>

                        {/* Esto aparece sólo luego de darle a Buscar */}

                        {idProfesor !== undefined && <div>
                            <CardProf
                                codigo={datosProfesor.codigo}
                                cedula={datosProfesor.cedula}
                                nombreCompleto={datosProfesor.nombre+' '+datosProfesor.apellido1+' '+datosProfesor.apellido2}
                                telefono={datosProfesor.numeroCelular}
                                correo={datosProfesor.correoElectronico}
                                oficina={datosProfesor.numeroOficina}
                                sede={datosProfesor.sede} 
                                btnColor={"danger"} 
                                btnText={"Dar de baja"} 
                                id={idProfesor}
                            />
                            
                        </div>
                        }


                    </div>
                </div>
            </div>
        </Fragment>
    )
}