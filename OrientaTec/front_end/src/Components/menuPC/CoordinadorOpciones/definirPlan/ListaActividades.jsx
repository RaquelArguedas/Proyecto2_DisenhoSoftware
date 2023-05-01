import React, { Fragment } from 'react'
import { CardActividad } from './CardActividad';

export function ListaActividades() {

    return (
        <Fragment>
            <div className="input-group my-3">
                <CardActividad/>
                <CardActividad/>
                <CardActividad/>
            </div >
        </Fragment >
    )
}