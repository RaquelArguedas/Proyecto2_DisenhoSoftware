import React, { Fragment, useRef, useState } from 'react'
import { useLocation } from "react-router-dom";
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function ModificarEstudiante() {
    const carnetRef = useRef()

    const { state } = useLocation();

    const [estado, setEstado] = useState("");
    const [name, setName] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [sede, setSede] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const carnet = carnetRef.current.value;
        const res = await fetch(`${API}/modificarEstudiante`, { //queda pendiente lo de agregar una foto
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                carnet, name, apellido1, apellido2, sede, numeroTelefono, correo, estado
            }),
        });
        const data = await res.text() //resultado de la consulta
        console.log(data) // imprime en consola web
        if (carnet===''||name===''||apellido1===''||apellido2===''||sede===''||numeroTelefono===''||correo===''||estado===''){
            alert("Ha dejado campos en blanco.");
        }else{
            alert("La información del estudiante se ha modificado.");
        }
    }
    const handleSearch = async () => {
        const res = await fetch(`${API}/getEstudiante/${carnetRef.current.value}`); //PENDIENTE : debe de darle el carnet
        const data = await res.json();//resultado de la consulta
        console.log(data.estado) // imprime en consola web

        setName(data.nombre)
        setApellido1(data.apellido1)
        setApellido2(data.apellido2)
        setNumeroTelefono(data.numeroCelular)
        setCorreo(data.correoElectronico)
        setSede(data.sede)
        setEstado(data.estado)
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleApellido1Change = (event) => {
        setApellido1(event.target.value);
    };
    const handleApellido2Change = (event) => {
        setApellido2(event.target.value);
    };
    const handleCelularChange = (event) => {
        setNumeroTelefono(event.target.value);
    };
    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };

    const handleSedeChange = (event) => {
        setSede(event.target.value);
    };
    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };
    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio={state.linkMenu} />
                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Modificar información de un estudiante</h4>
                        {/*La seguiente seccion mostrara un input group donde se introducira el codigo
                         y porsterior se tocara el boton */}
                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >Carnet</span>
                            <input ref={carnetRef} id="txtCarnet" type="text" className="form-control" />
                            <button onClick={handleSearch} className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>
                        {/*La seguiente seccion tendra los formGroupInput, al tocar el boton de buscar 
                        se rellera con la informacion del estudiante que buscar */}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div class="mb-3">
                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputName" class="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su nombre" value={name} onChange={handleNameChange}
                                        />
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputApellido1" class="form-label">Primer Apellido</label>
                                        <input type="text" class="form-control" id="formGroupInputApellido1" placeholder="Ingrese su primer apellido"
                                            value={apellido1} onChange={handleApellido1Change} />
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputApellido2" class="form-label">Segundo Apellido</label>
                                        <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su segundo apellido" value={apellido2} onChange={handleApellido2Change}
                                        />
                                    </div>

                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputNumeroCelular" class="form-label">Número de celular</label>
                                        <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su número de telefono" value={numeroTelefono} onChange={handleCelularChange}
                                        />
                                    </div>

                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputCorreo" class="form-label">Correo</label>
                                        <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su correo" value={correo} onChange={handleCorreoChange}
                                        />
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="autoSizingSelect" class="form-label">Sede: </label>

                                    </div>
                                    <div class="mb-3">
                                        <select id="mySelect" value={sede} onChange={handleSedeChange}>
                                            <option value="">Seleccionar</option>
                                            <option value="1">San José</option>
                                            <option value="2">Cartago</option>
                                            <option value="3">San Carlos</option>
                                            <option value="4">Alajuela</option>
                                            <option value="5">Limón</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="autoSizingEstado" class="form-label">Estado: </label>

                                    </div>
                                    <div class="mb-3">
                                        <select id="mySelect2" value={estado} onChange={handleEstadoChange}>
                                            <option value="">Seleccionar</option>
                                            <option value="1">Activo</option>
                                            <option value="2">Inactivo</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Modificar información</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
