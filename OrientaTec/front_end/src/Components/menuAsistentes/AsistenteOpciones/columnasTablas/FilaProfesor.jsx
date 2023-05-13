import React, { Fragment } from 'react'

export function FilaProfesor({codigo, cedula, nombreCompleto, telefono, correo, oficina, sede}) {
    return (
        <Fragment>
            <tr>
                <th id="regCodigo" scope="row"> {codigo} </th>
                <td id="regCedula"> {cedula} </td>
                <td id="regNombre"> {nombreCompleto} </td>
                <td id="regTelef"> {telefono} </td>
                <td id="regCorreo"> {correo} </td>
                <td id="regOficina"> {oficina} </td>
                <td id="regSede"> {sede} </td>
            </tr>
        </Fragment>
    )
}