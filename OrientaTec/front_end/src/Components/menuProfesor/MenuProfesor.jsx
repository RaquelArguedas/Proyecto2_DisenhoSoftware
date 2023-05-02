import React, {Fragment} from 'react';
import { Navbar } from '../navegacion/Navbar';
import { BarraLateral } from '../navegacion/BarraLateral';
import { OpcionesMenuProfesor } from './OpcionesMenuProfesor';



export  function MenuProfesor() {
  return (
    <Fragment>
        <div className='container'>
            <Navbar/>

            <div class="row">
            <div class="col-sm-3">
                <BarraLateral/>
            </div>
            <div class="col-lg">
                <OpcionesMenuProfesor/>
            </div>
            </div>
        </div>
    </Fragment>
  )
}
