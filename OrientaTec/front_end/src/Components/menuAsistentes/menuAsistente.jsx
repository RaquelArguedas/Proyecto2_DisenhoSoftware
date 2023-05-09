//Ventana de Menú Asistente
import React, { Fragment } from 'react';
import { Navbar } from '../navegacion/Navbar';
import { BarraLateral } from '../navegacion/BarraLateral';
import OpcionesMenu from './OpcionesMenu';

export function MenuAsistente() {

  return (
    <Fragment>
        <div className='container'>
            <Navbar linkInicio='/menuAsistente'/>

            <div class="row">
              <div class="col-sm-3">
                <BarraLateral/>
              </div>
              <div class="col-lg">
                <OpcionesMenu/>
              </div>
            </div>
        </div>
    </Fragment>
  )
}