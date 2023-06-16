import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function CardAviso({ info, user }) {

    console.log(info)

    //info.leida = (typeof info.leida === String && info.leida === 'True') ? true : false;

    const [iconVisto, setIconVisto] = useState("tabler:eye-exclamation");
    const [tipVisto, setTipVisto] = useState("Marcar como leída");
    const btnVistoRef = useRef();
    const [nombreEmisor, setNombreEmisor] = useState("");
    const [showComp, setShowComp] = useState(true);

    const cambiarAspectoBtn = () => {
        if (info.leida === 'True') {
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

    const getNombreEmisor = async () => {
        try {
            const res = await fetch(`${API}/verActividad/${info.emisor}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            setNombreEmisor(data.nombreActividad);

        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }
    };

    const handleVisto = async () => {
        info.leida = (info.leida === 'True') ? 'False' : 'True';

        try {
            const res = await fetch(`${API}/cambiarLeida/${info.idNotificacion}/${user}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();

        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }

        cambiarAspectoBtn();
    }

    const handleBorrar = async () => {
        try {
            const res = await fetch(`${API}/deleteNotificacionUsuario/${info.idNotificacion}/${user}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();

        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }

        setShowComp(false)
    }

    useEffect(() => {
        cambiarAspectoBtn(); getNombreEmisor()
    }, []);

    return (
        <Fragment>
            {showComp &&
                <div class="card my-3">
                    <div class="card-body">
                        <div className="row">
                            <div className="col">
                                <h6 id="tipoActividad" class="py-2 card-subtitle mb-2 text-muted"> {nombreEmisor} | {info.fechaHora} </h6>
                            </div>
                            <div className="col-sm-2">
                                <button onClick={handleVisto} ref={btnVistoRef} className="btn btn-warning p-1 mx-1"
                                    data-toggle="tooltip" data-placement="bottom" title={tipVisto}>
                                    <Icon icon={iconVisto} width="24" height="24" />
                                </button>
                                <button onClick={handleBorrar} className="btn btn-danger p-1 mx-1" data-toggle="tooltip" data-placement="bottom" title="Borrar">
                                    <Icon icon="carbon:delete" width="24" height="24" />
                                </button>
                            </div>
                        </div>

                        <p id="fechaActividad" class="card-text my-2"> {info.contenido} </p>
                    </div>
                </div>
            }
        </Fragment>
    )
}
