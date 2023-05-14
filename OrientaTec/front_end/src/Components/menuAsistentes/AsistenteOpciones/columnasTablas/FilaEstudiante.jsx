import React, { Fragment } from 'react'

export function FilaEstudiante({carnet, nombreCompleto, telefono, correo, sede}) {
    const nombreSede = (sede===1 ? "SJ" : (sede===2 ? "CA" : (sede===3 ? "SC" : (sede===4 ? "AL" : "LI"))))

    return (
        <Fragment>
            <tr>
                <th id="regCarnet" scope="row"> { carnet } </th>
                <td id="regNombre"> {nombreCompleto} </td>
                <td id="regTelef"> {telefono} </td>
                <td id="regCorreo"> {correo} </td>
                <td id="regSede"> {nombreSede} </td>
            </tr>
        </Fragment>
    )
}
