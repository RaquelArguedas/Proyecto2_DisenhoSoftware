import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
//A ver

import axios from 'axios';

const API = process.env.REACT_APP_API;

export function ActividadEstudiante({ datos }) {
    let navigate = useNavigate();

    const { state } = useLocation();

    const [responsables, setResponsables] = useState([]);

    useEffect(() => {
        const responsablesJSON = JSON.parse(datos.responsables);
        setResponsables(responsablesJSON.map(responsable => ({
            id: JSON.parse(responsable).id,
            nombre: JSON.parse(responsable).nombre + ' ' +
                JSON.parse(responsable).apellido1 + ' ' +
                JSON.parse(responsable).apellido2
        })));
    }, []);

    const [imagenData, setImagenData] = useState(null);
    function isBase64Valid(base64String) {
        const regex = /^[A-Za-z0-9+/=]+$/;
        const isLengthValid = base64String.length % 4 === 0;
        const isValidCharacters = regex.test(base64String);
        return isLengthValid && isValidCharacters;
      }
    const obtenerImagen = async () => {
        try {
            const response = await axios.get(`${API}/getFotoAfiche/${datos.idActividad}`); //cuando me envie la actividad
            const imageBase64 = response.data;
            console.log(isBase64Valid(imageBase64));
            setImagenData(imageBase64);
          } catch (error) {
            console.error('Error al obtener la imagen:');
          }
      };

      useEffect(() => {
        obtenerImagen();
    }, []);

    const tipoActividad = (datos.tipoActividad === 1 ? "Orientadora" : (datos.tipoActividad === 2 ? "Motivacional" : (datos.tipoActividad === 3 ? "Apoyo estudiantil" : (datos.tipoActividad === 4 ? "Orden tecnico" : "Recreativa"))))
    const estado = (datos.estado === 1 ? "Planeada" : (datos.estado === 2 ? "Notificada" : (datos.estado === 3 ? "Realizada" : "Cancelada")))

    return (
        <Fragment>
            <div class="card my-3">
                <div class="card-body">
                    <h5 id='nombreActividad' class="card-title">Nombre: {datos.nombreActividad}  ID: {datos.idActividad}</h5>
                    <h6 id="tipoActividad" class="card-subtitle mb-2 text-muted"> Tipo Actividad: {tipoActividad}</h6>

                    <div className="row">
                        <div className="col">
                            <p id="fechaActividad" class="card-text mb-2">
                                <Icon icon="material-symbols:calendar-month" width="24" height="24" />
                                Fecha: {datos.fechaActividad}
                            </p>

                            <p id="horaDuracionAct" class="card-text mb-2">
                                <Icon icon="mdi:alarm-clock" width="24" height="24" />

                                Hora Inicio: {datos.horaInicio}
                            </p>
                            <p id="horaDuracionAct" class="card-text mb-2">
                                <Icon icon="mdi:alarm-clock" width="24" height="24" />

                                Hora fin: {datos.horaFin}
                            </p>

                            <p id="medioActividad" class="card-text mb-2">
                                <Icon icon="material-symbols:bookmark" width="24" height="24" />
                                Medio <a href={datos.enlace}>enlace</a>
                            </p>

                            <p id="estadoActividad" class="card-text mb-2">
                                <Icon icon="material-symbols:brightness-empty" width="24" height="24" />
                                Estado: {estado}
                            </p>
                            <a id="" className="card-text mb-2">
                                <Icon icon="material-symbols:image-rounded" width="24" height="24" />
                                {imagenData && <img src={`data:image/jpeg;base64,${imagenData}`} alt="Foto actividad" style={{ width: '300px', height: 'auto' }}/>}
                            </a>

                            {/* <a id="afiche" class="card-text mb-2">
                                <Icon icon="material-symbols:image-rounded" width="24" height="24" />
                                Afichon
                            </a> */}
                        </div>
                        <div className="col">
                            <p id="" class="card-text mb-2">
                                <Icon icon="mdi:people-group" width="24" height="24" />
                                Responsables
                            </p>

                            {responsables.length > 0 &&
                                responsables.map((responsable) =>
                                (
                                    <p>
                                        {responsable.nombre}
                                    </p>
                                )
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
