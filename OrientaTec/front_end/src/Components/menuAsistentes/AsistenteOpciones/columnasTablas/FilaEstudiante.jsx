import React, { Fragment } from 'react'

export function FilaEstudiante({carnet, nombreCompleto, telefono, correo, sede}) {
    return (
        <Fragment>
            <tr>
                <th id="regCarnet" scope="row"> { carnet } </th>
                <td id="regNombre"> {nombreCompleto} </td>
                <td id="regTelef"> {telefono} </td>
                <td id="regCorreo"> {correo} </td>
                <td id="regSede"> {sede} </td>
            </tr>
        </Fragment>
    )
}
