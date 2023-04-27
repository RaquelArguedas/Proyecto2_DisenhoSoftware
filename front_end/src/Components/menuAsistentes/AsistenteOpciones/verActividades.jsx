import React, { Fragment, useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from '../../navegacion/Navbar';
import { BarraLateral } from '../../navegacion/BarraLateral';


export function VerActividades() {

  return (
    <Fragment>
      <div className='container'>
        <Router>
          <Navbar />
        </Router>


        {//Barra lateral
        }
        <div class="row">
          <div class="col-sm-3">
            <BarraLateral />
          </div>

          {//Rdio button donde se mostraran las opccion ver todas las actividades, ver proximas actividades 
            //Actividades realizadas y actividades canceladas
          }

          <div class="col-lg">



            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Ver todas las actividades
              </label>
            </div>
            <div class="col-lg">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Proximas actividades
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Actividades Realizadas
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Actividades Canceladas
                </label>
              </div>
            </div>

          </div>

        </div>




      </div>
    </Fragment>
  )
}
