import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';

const API = process.env.REACT_APP_API;

export function ListaResponsables({ responsables }) {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    console.log(responsables)

    const handleDeleteResponsable = async (event) => {
        event.preventDefault();

        console.log(event)

        const res = await fetch(`${API}/agregarResponsablesActividad/`, { //queda pendiente lo de agregar una foto
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

            }),
        }); //PENDIENTE : debe de darle el codigo
        const data = await res.json();//resultado de la consulta

        responsables.shift();
        forceUpdate();
    }

    return (
        <Fragment>
            <div className="input-group my-3">
                {responsables.map((responsable) => (
                    <Fragment>
                        <form onSubmit={handleDeleteResponsable} class="form-inline">
                            <div className="input-group">
                                <ul class="list-group list-group-horizontal w-100">
                                    <li class="list-group-item w-100" value={responsable.id}> {responsable.nombre} </li>
                                </ul>
                                <button className="btn btn-danger btn-sm" type='sumbit'> <Icon icon="ic:baseline-delete" width="24" height="24" /></button>
                            </div>

                        </form>
                    </Fragment>
                ))}
            </div >
        </Fragment >
    )
}