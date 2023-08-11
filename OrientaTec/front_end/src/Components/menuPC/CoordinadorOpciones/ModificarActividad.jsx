import React, { Fragment, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const API = process.env.REACT_APP_API;

export function ModificarActividad() {
    let navigate = useNavigate();
    const gotoMenu = () => { navigate('/menuCoordinador', {}); }
    //const gotoRealizada = () => { navigate('/menuCoordinador', {}); }
    const gotoCancelada = () => { navigate('/cancelarActividad', {state: {idActividad: idActRef.current.value}}); }
    const gotoEvidencias = () => { navigate('/insertarEvidencias', {state: {idActividad: idActRef.current.value}}); }

    const [periodicidad, setPeriodicidad] =  useState('');
    const [fechaRecordatorio, setFechaRecordatorio] = useState(new Date());
    const [fechaRecordatorioB, setFechaRecordatorioB] = useState('');

    const [startDate, setStartDate] = useState(new Date());
    const [esVirtual, setVirtual] = useState(false);

    const [profesores, setProfesores] = useState([[]]);
    const clearProfesores = () => {
        setProfesores([[]]);
    };

    const idActRef = useRef();
    const [nombre, setNombre] = useState(''); const handleNombreChange = (event) => { setNombre(event.target.value); };
    const [tipo, setTipo] = useState(0); const handleTipoChange = (event) => { setTipo(event.target.value); };
    const [medio, setModalidad] = useState(0); const handleModalidadChange = (event) => { setModalidad(event.target.value); setVirtual(Boolean(event.target.value - 1)); };
    const [enlaceR, setEnlace] = useState(''); const handleEnlaceChange = (event) => { setEnlace(event.target.value); };
    const [estado, setEstado] = useState(0); const handleEstadoChange = (event) => { setEstado(event.target.value); };
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [image, setImage] = useState(null);
    const [imagenData, setImagenData] = useState(null);

    const [horaFin, setHoraFin] = useState('');

    let [duracion, setDuracion] = useState(0)

    const handleHoraFinChange = (event) => {
        setDuracion(event.target.value);
        setHoraInicio(startDate.getHours() + ':' + (startDate.getMinutes() === 0 ? '00' : startDate.getMinutes()));
        const subHoraFin = Number(startDate.getHours()) + Number(event.target.value);
        setHoraFin(((subHoraFin < 24) ? subHoraFin : subHoraFin - 24) + ':' + (startDate.getMinutes() === 0 ? '00' : startDate.getMinutes()));
        setFecha((startDate.getMonth() < 101 ? '0' + startDate.getMonth() : startDate.getMonth()) + '/' +
            (startDate.getDate().length < 10 ? '0' + startDate.getDate() : startDate.getDate()) + '/' + startDate.getFullYear())
    };

    const [recordatorio, setRecordatorios] = useState(0); const handleRecordatoriosChange = (event) => { setRecordatorios(event.target.value); };
    const [responsables, setResponsables] = useState([]);

    function isBase64Valid(base64String) {
        const regex = /^[A-Za-z0-9+/=]+$/;
        const isLengthValid = base64String.length % 4 === 0;
        const isValidCharacters = regex.test(base64String);
        return isLengthValid && isValidCharacters;
      }

    const obtenerImagen = async () => {
        try {
            const response = await axios.get(`${API}/getFotoAfiche/${idActRef.current.value}`); 
            const imageBase64 = response.data;
            console.log(isBase64Valid(imageBase64));
            setImagenData(imageBase64);
          } catch (error) {
            console.error('Error al obtener la imagen:');
          }
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


    const handleSearch = async () => {
        obtenerImagen();
        console.log('En handleSearch')
        const res = await fetch(`${API}/verActividad/${idActRef.current.value}`); //PENDIENTE : debe de darle el codigo
        const data = await res.json();//resultado de la consulta
        console.log("DATA", data)
        if (data === 'No existe') {
            alert("No existe una actividad con el ID ingresado.")
        } else {
            setNombre(data.nombreActividad);
            setTipo(data.tipoActividad);
            setModalidad(data.medio);
            setEnlace(data.enlace);
            setEstado(data.estado);
            setFecha(data.fechaActividad);
            setHoraInicio(data.horaInicio);
            setDuracion(Number(data.horaFin[1] === ':' ? data.horaFin[0] : data.horaFin.slice(0, 2)) -
                Number(data.horaInicio[1] === ':' ? data.horaInicio[0] : data.horaInicio.slice(0, 2)));
            setHoraFin(data.horaFin);
            setStartDate(new Date(data.fechaActividad + 'T' + (data.horaInicio[1] === ':' ? '0' + data.horaInicio : data.horaInicio)));
            
            const subResponsables = JSON.parse(data.responsables).map(responsable => JSON.parse(responsable))
            console.log(subResponsables)
            setResponsables(JSON.parse(data.responsables).map(responsable => JSON.parse(responsable)));

            const subRecordatorios = JSON.parse(data.recordatorios).map(recordatorio => JSON.parse(recordatorio))
            console.log("Reeeec",subRecordatorios)
            
            const fechaInit = new Date(subRecordatorios[0].fecha)
            if (subRecordatorios.length > 1){
                const fechaDos= new Date(subRecordatorios[1].fecha);
                const per = Math.floor((fechaDos-fechaInit)/(1000*60*60*24));
                console.log("Calculando", per)
                setPeriodicidad(per)
            }else{
                setPeriodicidad(0)
            }
            
            setFechaRecordatorio(fechaInit.setDate(fechaInit.getDate()+1));

            const month = fechaInit.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
            const day = fechaInit.getDate(); // Obtener el día
            const year = fechaInit.getFullYear(); // Obtener el año
            const formattedDate = `${month}/${day}/${year}`;
            setFechaRecordatorioB(formattedDate);
            
            setRecordatorios(subRecordatorios.length);
        }
    };

    const handleAddResponsable = async (event) => {
        console.log('En handleAddResponsable')
        const idActividad = idActRef.current.value;
        const idResponsableNuevo = { id: event.target.value };

        const res = await fetch(`${API}/agregarResponsablesActividad/`, { //queda pendiente lo de agregar una foto
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idActividad, idResponsableNuevo
            }),
        });
        const data = await res.json();

        handleSearch();

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (responsables.length <= 0) {
            alert("Debe registrar responsables.")
        } else if (nombre === '' || horaFin === horaInicio || recordatorio === '') {
            alert("Faltan datos por registrar.")
        } else {
            alert("Actividad modificada correctamente")
            const id = idActRef.current.value;
            const enlace = (esVirtual) ? enlaceR : ''

            const formData = new FormData();
            formData.append('id', id);
            formData.append('image', image);
            formData.append('nombre', nombre);
            formData.append('tipo', tipo);
            formData.append('fecha', fecha);
            formData.append('horaInicio', horaInicio);
            formData.append('horaFin', horaFin);
            formData.append('periodicidad', periodicidad);
            formData.append('fechaRecordatorioB', fechaRecordatorioB);
            formData.append('recordatorio', recordatorio);
            formData.append('medio', medio);
            formData.append('estado', estado);
            formData.append('enlace', enlace);

            console.log("TIPOOOOOOOOOOOO")
            console.log(periodicidad, fechaRecordatorioB, recordatorio)

            console.log("id", id)
            
            const res = await fetch(`${API}/modificarActividad`, {
                method: 'POST',
                body: formData
            });

            if (estado == 3){
                //Redirigir a Realizada
                gotoEvidencias();
            }

            if (estado == 4){
                //Redirigir a Cancelar
                gotoCancelada();
            }
        }
    }

    const handleDeleteResponsable = async (event) => {
        event.preventDefault();
        setResponsables(() => responsables.filter(responsable => responsable.id !== event.target.id))

        const idActividad = idActRef.current.value;
        const idResponsableEliminado = event.target.id;

        console.log('{'+idActividad+', '+idResponsableEliminado+'}')

        const res = await fetch(`${API}/quitarResponsablesActividad/`, { //queda pendiente lo de agregar una foto
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idActividad, idResponsableEliminado
            }),
        }); //PENDIENTE : debe de darle el codigo
        const data = await res.json();

        handleSearch();
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
                        <h4>Modificar actividad</h4>
                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >ID de la actividad</span>
                            <input ref={idActRef} id="txtCarnet" type="text" className="form-control" />
                            <button onClick={handleSearch} className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col ">
                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text" >Nombre</span>
                                        <input id="txtCarnet" type="text" className="form-control" value={nombre} onChange={handleNombreChange} />
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
                                                    <li class="list-group-item w-100"> {responsable.nombre+' '+responsable.apellido1+' '+responsable.apellido2} </li>
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
                                        <select class="form-select" aria-label="TipoActividad" onChange={handleTipoChange} value={tipo}>
                                            <option value="1">Orientadora</option>
                                            <option value="2">Motivacional</option>
                                            <option value="3">Apoyo estudiantil</option>
                                            <option value="4">Orden técnico</option>
                                            <option value="5">Recreativa</option>
                                        </select>
                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text w-25">Modalidad</span>
                                        <select class="form-select" aria-label="ModalidadActividad" onChange={handleModalidadChange} value={medio}>
                                            <option value="1">Presencial</option>
                                            <option value="2">Virtual</option>
                                        </select>
                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text w-25">Estado</span>
                                        <select class="form-select" aria-label="EstadoActividad" onChange={handleEstadoChange} value={estado}>
                                            <option value="1">Planeada</option>
                                            <option value="2">Notificada</option>
                                            <option value="3">Realizada</option>
                                            <option value="4">Cancelada</option>
                                        </select>
                                    </div>

                                    <div className="input-group w-100 my-3">
                                    <label htmlFor="formGroupInputCodigo" className="form-label">
                                            Afiche
                                            {imagenData && <img src={`data:image/jpeg;base64,${imagenData}`} alt="Foto de la actividad " style={{ width: '300px', height: 'auto' }}/>}
                                        </label>
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
                                            <input type="text" className="form-control" placeholder="Enlace a la actividad" onChange={handleEnlaceChange} value={enlaceR} />
                                        }
                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <p>Fecha y hora</p>
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="dd/MM/yyyy hh:mm aa" />
                                    </div>

                                    <div className="input-group w-100 my-3">
                                        <span className="input-group-text" >Duración</span>
                                        <input id="txtCarnet" type="text" className="form-control" placeholder="horas" value={duracion} onChange={handleHoraFinChange} />
                                    </div>

                                    <div className="input-group w-100 my-3">
                                    <span className="input-group-text">Periodicidad</span>
                                    <input
                                        id="txtPeriodicidad"
                                        type="text"
                                        className="form-control"
                                        onChange={handlePeriodicidadChange}
                                        value={periodicidad}
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
                                        <input id="txtCarnet" type="number" min={0} className="form-control" onChange={handleRecordatoriosChange} value={recordatorio} />
                                    </div>

                                    <br /><br /><br /><br /><br />

                                    <div className="input-group w-100 my-3">
                                        <button className="btn btn-success w-50" type='submit'>Actualizar</button>
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