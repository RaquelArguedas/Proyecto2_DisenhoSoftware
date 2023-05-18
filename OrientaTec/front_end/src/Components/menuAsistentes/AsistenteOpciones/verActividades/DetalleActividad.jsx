import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { Navbar } from '../../../navegacion/Navbar';
import { BarraLateral } from '../../../navegacion/BarraLateral';
import { Comentario } from '../../../comentarios/Comentario';
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API;

export function DetalleActividad() {
    let navigate = useNavigate();

    const { state } = useLocation();
    const [comentarioPadre, setComentarioPadre] = useState(0);
    const [listaComentarios, setListaComentarios] = useState([]);
    const comentarioRef = useRef();

    const gotoEvidenciasActividad = () => { navigate('/verplan/detalle/evidencias', { state: { comentarios: state.comentarios, linkMenu: state.linkMenu } }); }

    const gotoVerPlan = () => { navigate('/verplan', { state: { comentarios: state.comentarios, linkMenu: state.linkMenu } }); };

    const handleAddComentario = async () => {
        if (comentarioRef.current.value !== '') {
            const formData = new FormData();
            formData.append('idActividad', state.idActividad);
            formData.append('contenido', comentarioRef.current.value);
            formData.append('idComentarioPadre', comentarioPadre);

            const res = await fetch(`${API}/escribirComentario`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json(); //resultado de la consulta
            console.log('COMENTARIO AGREGADO');
            comentarioRef.current.value = '';
            handleGetDetalle();
        }
    };

    const handleGetDetalle = async () => {

        //esta obtiene todas las actividades
        const res = await fetch(`${API}/getDetalleActividad/${state.idActividad}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json(); //resultado de la consulta
        console.log(data)
        console.log(data[1])
        setListaComentarios(data[1]);
    };

    const handleResponder = (idPadre, autor) => (event) => {
        comentarioRef.current.value = "Respondiendo a "+autor+": \n"
        setComentarioPadre(idPadre)
    };

    useEffect(() => {
        handleGetDetalle()
    }, []);

    return (
        <Fragment>
            <div className='container'>
                <Navbar linkInicio={state.linkMenu} />

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
                                            Afiche
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

                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <textarea ref={comentarioRef} className="w-100" style={{ resize: "none", height: "5rem" }} aria-label="With textarea" maxlength="250"></textarea>
                                        </div>
                                        <div className="col-sm-2">
                                            <button className="btn btn-outline-success" onClick={handleAddComentario}>Comentar</button>
                                        </div>
                                    </div>
                                </div>

                                {listaComentarios.length > 0 &&
                                    listaComentarios.map((comentario) =>
                                    (
                                        <Fragment>
                                            <div className="card m-3">
                                                <div className="card-body">
                                                    <h6 id="comentarioNombre" className="card-title"> {comentario.autor} </h6>

                                                    <div className="row">
                                                        <div className="col-lg">
                                                            <p id="comentarioDatetime" className="text-secondary mb-2">
                                                                {comentario.fechaHora}
                                                            </p>
                                                        </div>
                                                        <div className="col-sm-2 d-flex justify-content-end">
                                                            <button href="" className="card-text btn btn-link" 
                                                                onClick={handleResponder(comentario.idComentario, comentario.autor)}>
                                                                    Responder
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <p id="comentarioContent" className="card-text"> {comentario.contenido} </p>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
