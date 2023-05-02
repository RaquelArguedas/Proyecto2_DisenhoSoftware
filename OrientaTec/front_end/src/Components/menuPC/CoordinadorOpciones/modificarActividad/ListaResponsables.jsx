import React, { Fragment } from 'react'
import { Icon } from '@iconify/react';

export function ListaResponsables({ responsables }) {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const handleDeleteResponsable = () => {
        responsables.shift();
        forceUpdate();
    }

    return (
        <Fragment>
            <div className="input-group my-3">
                {responsables.map((responsable) => (
                    <Fragment>
                        <ul class="list-group list-group-horizontal w-100">
                            <li class="list-group-item w-100"> {responsable.nombre} </li>
                            <button onClick={handleDeleteResponsable} className="btn btn-danger btn-sm"> <Icon icon="ic:baseline-delete" width="24" height="24" /></button>
                        </ul>
                    </Fragment>
                ))}
            </div >
        </Fragment >
    )
}