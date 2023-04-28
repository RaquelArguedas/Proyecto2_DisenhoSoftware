import React, { Fragment, useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from '../../navegacion/Navbar';
import { BarraLateral } from '../../navegacion/BarraLateral';
import ListaActividades from './verActividades/ListaActividades';

export function VerActividades() {

  return (
    <Fragment>
      <div className='container'>
        <Navbar />

        {//Barra lateral
        }
        <div class="row">
          <div class="col-sm-3">
            <BarraLateral />
          </div>
          {//Radio button donde se mostraran las opccion ver todas las actividades, ver proximas actividades, actividades realizadas y actividades canceladas
          }

          <div class="col-lg m-3 p-3 bg-light">
            <div className="row mb-4">
              <div className="col-lg"><h4>Actividades del plan de trabajo</h4></div>
              <div className="col-sm-3">
                <p>Inicio: 06/02/2023</p>
              </div>
              <div className="col-sm-3">
                <p>Fin: 16/06/2023</p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Ver todas las actividades
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Proximas actividades
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                  <label className="form-check-label" htmlFor="flexRadioDefault3">
                    Actividades Realizadas
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                  <label className="form-check-label" htmlFor="flexRadioDefault4">
                    Actividades Canceladas
                  </label>
                </div>
              </div>
            </div>

            {
              //Lista de Actividades
            }

            <ListaActividades />

          </div>

        </div>




      </div>
    </Fragment>
  )
}
