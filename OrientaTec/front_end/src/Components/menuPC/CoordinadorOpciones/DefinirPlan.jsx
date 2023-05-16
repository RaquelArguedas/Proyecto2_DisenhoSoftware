import React, { Fragment } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { ListaActividades } from './definirPlan/ListaActividades'
import { ListaPlan } from './definirPlan/ListaPlan'

export function DefinirPlan() {

    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio='/menuCoordinador'/>
                <div className="row">
                    <div className="col-sm-3">
                        <BarraLateral linkInicio='/menuCoordinador'/>
                    </div>
                    <div className="col-lg m-3 p-3 bg-light">
                        <div className="row">
                            <div className="col">
                                <h4>Actividades planeadas</h4>
                                <ListaActividades/>
                            </div>
                            <div className="col">
                                <h4>Plan de trabajo</h4>
                                <ListaPlan/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}