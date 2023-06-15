import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function CardAviso({info, user}) {

    console.log(info)

    //info.leida = (typeof info.leida === String && info.leida === 'True') ? true : false;

    const [iconVisto, setIconVisto] = useState("tabler:eye-exclamation");
    const [tipVisto, setTipVisto] = useState("Marcar como leída");
    const btnVistoRef = useRef();
    const [nombreEmisor, setNombreEmisor] = useState("");

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
            const res = await fetch(`${API}/getUsuario/${info.emisor}`, { //buscar por enum, 1 es el enum
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            setNombreEmisor(data.correo);

        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }
    };

    const handleVisto = async () => {
        info.leida = (info.leida === 'True') ? 'False' : 'True';

        try {
            const res = await fetch(`${API}/cambiarLeida/${info.idNotificacion}/${user}`, { //buscar por enum, 1 es el enum
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

    useEffect(() => {
        cambiarAspectoBtn(); getNombreEmisor()
    }, []);

    return (
        <Fragment>
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
                            <button className="btn btn-danger p-1 mx-1" data-toggle="tooltip" data-placement="bottom" title="Borrar">
                                <Icon icon="carbon:delete" width="24" height="24" />
                            </button>
                        </div>
                    </div>

                    <p id="fechaActividad" class="card-text my-2"> {info.contenido} </p>
                </div>
            </div>
        </Fragment>
    )
}
