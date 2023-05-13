import React, { Fragment } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';
import { CardProf } from './asignarQuitarCoord/CardProfesor';

export function DarBajaProfesor() {
    return (
        <Fragment>
            <div className="container">
                <Navbar />
                <div className="row">
                    <div className="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div className="col-lg m-3 p-3 bg-light">
                        <h4>Dar de baja a un profesor</h4>

                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >Código</span>
                            <input id="txtCarnet" type="text" className="form-control" />
                            <button className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>

                        {/* Esto aparece sólo luego de darle a Buscar */}
                        <CardProf btnColor={"danger"} btnText={"Dar de baja"} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}