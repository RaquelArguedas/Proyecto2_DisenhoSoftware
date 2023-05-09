import React, { Fragment } from 'react';
import { Navbar } from '../../../navegacion/Navbar';
import { BarraLateral } from '../../../navegacion/BarraLateral';
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function EvidenciasActividad() {
    let navigate = useNavigate();

    const { state } = useLocation();

    const gotoDetalleActividad = () => { navigate('/verplan/detalle', { state: { comentarios: state.comentarios, linkMenu: state.linkMenu } }); };

    return (
        <Fragment>
            <div className='container'>
                <Navbar linkInicio={state.linkMenu}/>

                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg">
                        <h4>Nombre de la actividad - Evidencias</h4>

                        <p class="card-text mb-2">
                            <Icon icon="material-symbols:photo-library" width="24" height="24" />
                            Fotografías
                        </p>

                        <div className="row">
                            <div className="col mx-5 my-3 bg-warning">012345679</div>
                            <div className="col mx-5 my-3 bg-warning">012345679</div>
                            <div className="col mx-5 my-3 bg-warning">012345679</div>
                        </div>

                        <p class="card-text mb-2">
                            <Icon icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form" width="24" height="24" />
                            Lista de asistencia
                        </p>

                        <div className="row">
                            <div className="col mx-5 my-3 bg-warning">012345679</div>
                            <div className="col mx-5 my-3 bg-warning">012345679</div>
                            <div className="col mx-5 my-3 bg-warning">012345679</div>
                        </div>

                        <p class="card-text mb-2">
                            <Icon icon="material-symbols:video-camera-back" width="24" height="24" />
                            <a href="">Grabación</a>
                        </p>

                        <div class="col">
                            <button type="button" class="btn btn-primary" onClick={gotoDetalleActividad}>
                                Atrás
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}