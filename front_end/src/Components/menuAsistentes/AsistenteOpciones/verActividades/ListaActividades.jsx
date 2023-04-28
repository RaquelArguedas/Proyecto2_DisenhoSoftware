import React, { Fragment } from 'react'
import Actividad from './Actividad'

export default function ListaActividades() {
    return (
        <Fragment>
            <div class="overflow-auto">
                <Actividad/>
                <Actividad/>
                <Actividad/>
                <Actividad/>
                <Actividad/>
                <Actividad/>
            </div>
        </Fragment>
    )
}
