import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { ListaResponsables } from './modificarActividad/ListaResponsables';
import { Icon } from '@iconify/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API = process.env.REACT_APP_API;

export function CrearActividad() {
    let navigate = useNavigate();
    const gotoMenu = () => { navigate('/menuCoordinador', {}); }

    const [periodicidad, setPeriodicidad] =  useState(0);
    const [fechaRecordatorio, setFechaRecordatorio] = useState(new Date());
    const [fechaRecordatorioB, setFechaRecordatorioB] = useState('');


    const [startDate, setStartDate] = useState(new Date());
    const [esVirtual, setVirtual] = useState(false);

    const [profesores, setProfesores] = useState([[]]);
    const clearProfesores = () => {
        setProfesores([[]]);
    };

    const [nombre, setNombre] = useState(''); const handleNombreChange = (event) => { setNombre(event.target.value); };
    const [tipo, setTipo] = useState(0); const handleTipoChange = (event) => { setTipo(event.target.value); };
    const [medio, setModalidad] = useState(0); const handleModalidadChange = (event) => { setModalidad(event.target.value); setVirtual(Boolean(event.target.value - 1)); };
    const [enlaceR, setEnlace] = useState(''); const handleEnlaceChange = (event) => { setEnlace(event.target.value); };
    const [estado, setEstado] = useState(0); const handleEstadoChange = (event) => { setEstado(event.target.value); };
    const [fecha, setFecha] = useState(''); const handleFechaChange = (event) => { setFecha(event.target.value); };
    const [horaInicio, setHoraInicio] = useState('');

    const [horaFin, setHoraFin] = useState('');
    const [image, setImage] = useState(null);

    const handleHoraFinChange = (event) => {
        setHoraInicio(startDate.getHours() + ':' + (startDate.getMinutes() === 0 ? '00' : startDate.getMinutes()));
        const subHoraFin = Number(startDate.getHours()) + Number(event.target.value);
        setHoraFin(((subHoraFin < 24) ? subHoraFin : subHoraFin - 24) + ':' + (startDate.getMinutes() == 0 ? '00' : startDate.getMinutes()));
        console.log("FECHAAAAAAAAAA")
        console.log((startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear());
        setFecha((startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear())
    };

    const [recordatorio, setRecordatorios] = useState(0); const handleRecordatoriosChange = (event) => { setRecordatorios(event.target.value); };
    const [responsables, setResponsables] = useState([]);

    const handleAddResponsable = (event) => {
        setResponsables((prevResponsables) => {
            return [...prevResponsables, {
                id: event.target.value,
                nombre: event.target[event.target.selectedIndex].innerText
            }];
        });

        event.target.value = 0;
    };

    const handleLlenarProfesores = async () => {
        const res = await fetch(`${API}/getEquipoGuia`, {  //falta cambiar el codigo por el deseado
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

    };

    const handlePeriodicidadChange = (event) => {
        setPeriodicidad(event.target.value);
    };
      
    const handleFechaRecordatorioChange = (date) => {
        setFechaRecordatorio(date);

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año

        // Construir la cadena en el formato deseado (mm/dd/aaaa)
        const formattedDate = `${month}/${day}/${year}`;

        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));

        setFechaRecordatorioB(formattedDate);
    };
      

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (responsables.length <= 0) {
            alert("Debe registrar responsables.")
        } else if (nombre === '' || horaFin === horaInicio || recordatorio === '') {
            alert("Faltan datos por registrar.")
        } else {
            alert("Actividad ingresada correctamente")
            console.log(responsables)

            const formData = new FormData();
            formData.append('image', image);
            formData.append('nombre', nombre);
            formData.append('tipo', tipo);
            formData.append('fecha', fecha);
            formData.append('horaInicio', horaInicio);
            formData.append('horaFin', horaFin);
            formData.append('periodicidad', periodicidad);
            formData.append('fechaRecordatorioB', fechaRecordatorioB);
            formData.append('recordatorio', recordatorio);
            formData.append('responsables', JSON.stringify(responsables));
            formData.append('medio', medio);
            formData.append('estado', estado);

            console.log("TIPOOOOOOOOOOOO")
            console.log(periodicidad, fechaRecordatorioB)

            const enlace = (esVirtual) ? enlaceR : ''
            formData.append('enlace', enlace);

            const res = await fetch(`${API}/crearActividad`, { //queda pendiente lo de agregar una foto
                method: "POST",
                body: formData
            });

            const data = await res.json();
            console.log(data);


        }
    }

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const handleDeleteResponsable = async (event) => {
        event.preventDefault();
        setResponsables(()=> responsables.filter(responsable => responsable.id !== event.target.id))
        forceUpdate();
    }
    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        console.log("desde handleImage:")
        console.log(image)
        
    };

    React.useEffect(() => {
        handleLlenarProfesores()
    }, []);

    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio='/menuCoordinador' />
                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Definir actividad</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col ">
                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text" >Nombre</span>
                                        <input id="txtCarnet" type="text" className="form-control" onChange={handleNombreChange} />
                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text">Responsables</span>
                                        <select class="form-select" onChange={handleAddResponsable} aria-label="ProfesSelect">
                                            <option value="0"></option>
                                            {profesores[0].map((profesor) => (
                                                <option value={JSON.parse(profesor).id}>
                                                    {JSON.parse(profesor).nombre + ' ' + JSON.parse(profesor).apellido1 + ' ' + JSON.parse(profesor).apellido2}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input-group my-3">
                                        {responsables.map((responsable) => (
                                            <Fragment>
                                                <ul class="list-group list-group-horizontal w-100">
                                                    <li class="list-group-item w-100"> {responsable.nombre} </li>
                                                    <button onClick={handleDeleteResponsable} className="btn btn-danger btn-sm" id={responsable.id} > <Icon icon="ic:baseline-delete" width="24" height="24" />
                                                    </button>
                                                </ul>
                                            </Fragment>
                                        ))}
                                    </div >
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text w-25">Tipo</span>
                                        <select class="form-select" aria-label="TipoActividad" onChange={handleTipoChange}>
                                            <option value="0"></option>
                                            <option value="1">Orientadora</option>
                                            <option value="2">Motivacional</option>
                                            <option value="3">Apoyo estudiantil</option>
                                            <option value="4">Orden técnico</option>
                                            <option value="5">Recreativa</option>
                                        </select>
                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text w-25">Modalidad</span>
                                        <select class="form-select" aria-label="ModalidadActividad" onChange={handleModalidadChange}>
                                            <option value="0"></option>
                                            <option value="1">Presencial</option>
                                            <option value="2">Virtual</option>
                                        </select>
                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text w-25">Estado</span>
                                        <select class="form-select" aria-label="EstadoActividad" onChange={handleEstadoChange}>
                                            <option value="0"></option>
                                            <option value="1">Planeada</option>
                                            <option value="2">Notificada</option>
                                            <option value="3">Realizada</option>
                                            <option value="4">Cancelada</option>
                                        </select>
                                    </div>

                                    <div className="input-group w-100 my-3">
                                    <div className="mb-3">
                                            {image && (
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt="Selected Image"
                                                    style={{ width: '30%', height: 'auto' }}
                                                />
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </div>

                                        {esVirtual &&
                                            <input type="text" className="form-control" placeholder="Enlace a la actividad" onChange={handleEnlaceChange} />
                                        }

                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <div className='row'>
                                            <div className='col-sm-5'><span className="input-group-text w-100" >Fecha y hora</span></div>
                                            <div className='col-sm-7'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="dd/MM/yyyy hh:mm aa" className="form-control w-100" /></div>
                                        </div>
                                    </div>

                                    <div className="input-group w-50 my-3">
                                        <span className="input-group-text" >Duración</span>
                                        <input id="txtCarnet" type="text" className="form-control" placeholder="horas" onChange={handleHoraFinChange} />
                                    </div>

                                    <div className="input-group w-100 my-3">
                                    <span className="input-group-text">Periodicidad</span>
                                    <input
                                        id="txtPeriodicidad"
                                        type="text"
                                        className="form-control"
                                        onChange={handlePeriodicidadChange}
                                    />
                                    </div>

                                    <div className="input-group w-100 my-3">
                                    <div className="row">
                                        <div className="col-sm-6">
                                        <span className="input-group-text w-100">Fecha del recordatorio</span>
                                        </div>
                                        <div className="col-sm-5">
                                        <DatePicker
                                            selected={fechaRecordatorio}
                                            onChange={handleFechaRecordatorioChange}
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control w-100"
                                        />
                                        </div>
                                    </div>
                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text" >Cantidad de recordatorios</span>
                                        <input id="txtCarnet" type="number" min={0} className="form-control" onChange={handleRecordatoriosChange} />
                                    </div>

                                    <br /><br /><br /><br /><br />

                                    <div className="input-group w-100 my-3">
                                        <button className="btn btn-success w-50" type='submit'>Agregar</button>
                                        <button className="btn btn-danger w-50" onClick={gotoMenu}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}