import React, { Fragment } from 'react'

export function FilaProfesor({codigo, cedula, nombreCompleto, telefono, correo, oficina, sede, rol}) {
    const nombreSede = (sede===1 ? "SJ" : (sede===2 ? "CA" : (sede===3 ? "SC" : (sede===4 ? "AL" : "LI"))))
    console.log(rol)
    return (
        <Fragment>
            <tr>
                <th id="regCodigo" scope="row"> {codigo} </th>
                <td id="regCedula"> {cedula} </td>
                <td id="regNombre"> {nombreCompleto} </td>
                <td id="regTelef"> {telefono} </td>
                <td id="regCorreo"> {correo} </td>
                <td id="regOficina"> {oficina} </td>
                <td id="regSede"> {nombreSede} </td>
                { rol !== undefined &&
                    <td id="regRol"> {(rol===1 ? "Miembro" : "Coordinador")} </td>
                }
                
            </tr>
        </Fragment>
    )
}