import React, { Fragment } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';
import { CardProf } from './asignarQuitarCoord/CardProfesor';

const API = process.env.REACT_APP_API;

export function AsignarCoordinador() {
    // comente lo siguiente porque no esta la funcion del boton
    
    // const handleSubmit = async (event) => {
    //     event.preventDefault();  

        //aca se busca un profesor por un codigo
        // const res = await fetch(`${API}/getProfesorCodigo/${"SJ-1"}`, {  //falta cambiar el codigo por el deseado
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //     }
        //   });

        //aca se le asigna como cordinador
        // const res = await fetch(`${API}/designarCoordinador/${2}`, {  //falta cambiar el idProfesor por el deseado
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     }
        // });

        // const data = await res.json() //resultado de la consulta
        // console.log(data) // imprime en consola web

    // }

    return (
        <Fragment>
            <div className="container">
                <Navbar />
                <div className="row">
                    <div className="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div className="col-lg m-3 p-3 bg-light">
                        <h4>Asignar al coordinador del grupo</h4>

                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >Código</span>
                            <input id="txtCarnet" type="text" className="form-control" />
                            <button className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>

                        {/* Esto aparece sólo luego de darle a Buscar */}
                        <CardProf btnColor={"success"} btnText={"Asignar"} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
