import React, { Fragment, useState } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
export function ModificarEstudiante() {
    let navigate = useNavigate();

    const gotoMenuProfesor = () => { navigate("/menuProfesor", {}); };
    const [estado, setEstado] = useState("");
    const [name, setName] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [sede, setSede] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar los datos a tu backend o hacer lo que necesites con ellos
    }
    const handleSearch = () => {
        // Aquí podrías agregar la lógica para buscar la información
        // y asignarla 
        setName("Adolfo")
        setApellido1("Corrales")
        setApellido2('Perez')
        setNumeroTelefono(87655432)
        setCorreo('Adolfo23@estudiantec.cr')
        setSede("2")
        setEstado('1')
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
                <Navbar />
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
                            <input id="txtCarnet" type="text" className="form-control" />
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
                                            <option value="1">Cartago</option>
                                            <option value="2">Alajuela</option>
                                            <option value="3">Limon</option>
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
                                    <button type="submit" class="btn btn-primary">Modificar información</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
