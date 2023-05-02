import React, { Fragment } from 'react';
import { Navbar } from '../../../navegacion/Navbar';
import { BarraLateral } from '../../../navegacion/BarraLateral';
import { Icon } from '@iconify/react';

export function EvidenciasActividad() {
    return (
        <Fragment>
            <div className='container'>
                <Navbar />

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
                    </div>
                </div>
            </div>
        </Fragment>
    )
}