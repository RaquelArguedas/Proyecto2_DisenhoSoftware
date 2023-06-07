import React, { Fragment, useState, useRef } from 'react'
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function CardAviso() {
    const [iconVisto, setIconVisto] = useState("tabler:eye-exclamation");
    const [tipVisto, setTipVisto] = useState("Marcar como leída");
    let estaVisto = false;
    const btnVistoRef = useRef();

    const handleVisto = () => {
        estaVisto = !estaVisto;
        if (estaVisto) {
            setIconVisto("tabler:eye-check");
            setTipVisto("Marcar como no leída");
            btnVistoRef.current.classList.remove('btn-warning');
            btnVistoRef.current.classList.add('btn-success');
        } else {
            setIconVisto("tabler:eye-exclamation");
            setTipVisto("Marcar como leída");
            btnVistoRef.current.classList.remove('btn-success');
            btnVistoRef.current.classList.add('btn-warning');
        }
    }

    return (
        <Fragment>
            <div class="card my-3">
                <div class="card-body">
                    <h5 id='nombreActividad' class="card-title">Nombre de la notificación</h5>

                    <div className="row">
                        <div className="col">
                            <h6 id="tipoActividad" class="py-2 card-subtitle mb-2 text-muted"> Emisor | Fecha y hora </h6>
                        </div>
                        <div className="col-sm-2">
                            <button onClick={handleVisto} ref={btnVistoRef} className="btn btn-warning p-1 mx-1" 
                                data-toggle="tooltip" data-placement="bottom" title={tipVisto}>
                                <Icon icon={iconVisto} width="24" height="24" />
                            </button>
                            <button className="btn btn-danger p-1 mx-1" data-toggle="tooltip" data-placement="bottom" title="Borrar">
                                <Icon icon="carbon:delete" width="24" height="24" />
                            </button>
                        </div>
                    </div>

                    <p id="fechaActividad" class="card-text my-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, repudiandae eius suscipit,
                        nobis magnam ipsum incidunt labore sequi blanditiis minus esse rem rerum vel officiis, voluptatibus
                        exercitationem aut! Blanditiis, cumque!
                    </p>
                </div>
            </div>
        </Fragment>
    )
}
