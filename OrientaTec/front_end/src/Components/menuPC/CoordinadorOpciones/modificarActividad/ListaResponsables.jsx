import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function ListaResponsables({idActividad, responsables }) {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const handleDeleteResponsable = async (event) => {
        event.preventDefault();

        const idResponsableEliminado = Number(event.target.id);
        console.log(idActividad);
        console.log(idResponsableEliminado);

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

        forceUpdate();
    }

    return (
        <Fragment>
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
        </Fragment >
    )
}