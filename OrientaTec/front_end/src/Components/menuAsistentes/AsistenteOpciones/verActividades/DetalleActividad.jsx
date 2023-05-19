import React, { Fragment,  useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { Navbar } from '../../../navegacion/Navbar';
import { BarraLateral } from '../../../navegacion/BarraLateral';
import { Comentario } from '../../../comentarios/Comentario';
import { FormComentario } from '../../../comentarios/FormComentario';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const API = process.env.REACT_APP_API;

export function DetalleActividad() {
    let navigate = useNavigate();
    
    const { state } = useLocation();
    
    const gotoEvidenciasActividad = () => { navigate('/verplan/detalle/evidencias',  {state: {comentarios: state.comentarios, linkMenu: state.linkMenu}}); }

    const gotoVerPlan = () => { navigate('/verplan', {state: {comentarios: state.comentarios, linkMenu: state.linkMenu}}); };

    
    const [imagenData, setImagenData] = useState(null);
    function isBase64Valid(base64String) {
        const regex = /^[A-Za-z0-9+/=]+$/;
        const isLengthValid = base64String.length % 4 === 0;
        const isValidCharacters = regex.test(base64String);
        return isLengthValid && isValidCharacters;
      }
    const obtenerImagen = async () => {
        try {
            const response = await axios.get(`${API}/getFotoAfiche/${52}`); //cuando me envie la actividad
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

    return (
        <Fragment>
            <div className='container'>
                <Navbar linkInicio={state.linkMenu}/>

                <div className="row">
                    <div className="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div className="col-lg m-3 p-3 bg-light">
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">Nombre de la actividad</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Tipo de actividad</h6>

                                <div className="row">
                                    <div className="col">
                                        <p id="" className="card-text mb-2">
                                            <Icon icon="material-symbols:calendar-month" width="24" height="24" />
                                            Fecha: 27/06/2023
                                        </p>

                                        <p id="" className="card-text mb-2">
                                            <Icon icon="mdi:alarm-clock" width="24" height="24" />
                                            Hora: 07:00 p.m. Duración: 2 horas
                                        </p>

                                        <p id="" className="card-text mb-2">
                                            <Icon icon="material-symbols:bookmark" width="24" height="24" />
                                            Tipo de actividad <a href="https://youtu.be/COpJ52Fl4aU?t=240">enlace</a>
                                        </p>

                                        <p id="" className="card-text mb-2">
                                            <Icon icon="material-symbols:brightness-empty" width="24" height="24" />
                                            Estado de la actividad
                                        </p>

                                        <a id="" className="card-text mb-2">
                                            <Icon icon="material-symbols:image-rounded" width="24" height="24" />
                                            {imagenData && <img src={`data:image/jpeg;base64,${imagenData}`} alt="Foto del profesor" style={{ width: '300px', height: 'auto' }}/>}
                                        </a>
                                    </div>
                                    <div className="col">
                                        <p id="" className="card-text mb-2">
                                            <Icon icon="mdi:people-group" width="24" height="24" />
                                            Responsables
                                        </p>

                                        <p id="nombresResponsables" className="card-text mb-2">
                                            &emsp; Nombre Apellido Apellido <br />
                                            &emsp; Nombre Apellido Apellido
                                        </p>
                                    </div>
                                </div>
                                
                                <btn onClick={gotoEvidenciasActividad} className="btn btn-primary w-25 my-4">Evidencias</btn>
                                
                                <div class="col">
                                    <button type="button" class="btn btn-primary" onClick={gotoVerPlan}>
                                        Atrás
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*Esta parte aparece cuando se llama de profesores, pero no en asistente*/}

                        {state.comentarios === true &&
                            <div id="seccionComentarios">
                                <hr />
                                <div className="container bg-light">
                                    <h4>Comentarios</h4>
                                </div>

                                <FormComentario />

                                <div className="overflow-auto" id="listaComentarios">
                                    <Comentario />
                                    <Comentario />
                                    <Comentario />
                                    <Comentario />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
