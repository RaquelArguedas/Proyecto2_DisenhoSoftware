//Ventana de Menú Asistente
import React, {Fragment, useState, useRef} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from '../navegacion/Navbar';
import { BarraLateral } from '../navegacion/BarraLateral';
import OpcionesMenu from './OpcionesMenu';

export function MenuAsistente() {
  return (
    <Fragment>
        <div className='container'>
            <Router>
              <Navbar/>
            </Router>

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