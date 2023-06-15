//Ventana de Menú Asistente
import React, { Fragment } from 'react';
import { NavbarEstudiante } from './navegacionEstudiante/NavbarEstudiante';
import { BarraLateral } from '../navegacion/BarraLateral';
import OpcionesEstudiantes from './OpcionesEstudiantes';

export function MenuEstudiante() {

  return (
    <Fragment>
        <div className='container'>
            <NavbarEstudiante linkInicio='/menuEstudiante'/>

            <div class="row">
              <div class="col-sm-3">
                <BarraLateral/>
              </div>
              <div class="col-lg">
                <OpcionesEstudiantes/>
              </div>
            </div>
        </div>
    </Fragment>
  )
}