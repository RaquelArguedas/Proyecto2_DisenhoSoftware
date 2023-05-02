import React, {Fragment} from 'react';
import { Navbar } from '../navegacion/Navbar';
import { BarraLateral } from '../navegacion/BarraLateral';
import { OpcionesMenuPC } from './OpcionesMenuPC';



export  function MenuProfesorC() {
  return (
    <Fragment>
        <div className='container'>
            <Navbar linkInicio='/menuCoordinador'/>

            <div class="row">
            <div class="col-sm-3">
                <BarraLateral/>
            </div>
            <div class="col-lg">
                <OpcionesMenuPC/>
            </div>
            </div>
        </div>
    </Fragment>
  )
}