import React, { Fragment } from 'react'
import { useLocation } from "react-router-dom";
import { Navbar } from '../../navegacion/Navbar';
import { BarraLateral } from '../../navegacion/BarraLateral';
import { Actividad } from './verActividades/Actividad'
import { useNavigate } from "react-router-dom";

export function VerActividades() {
  let navigate = useNavigate();

  //lo comente porque no esta la funcion de los botones
  // const handleSubmit = async (event) => {
  //   event.preventDefault();  

  
  // }

  const gotoMenuProfesor = () => { navigate("/menuProfesor", {}); };
  const { state } = useLocation();

  return (
    <Fragment>
      <div className='container'>
        <Navbar linkInicio={state.linkMenu} />

        <div class="row">
          <div class="col-sm-3">
            <BarraLateral />
          </div>

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

            {/* Lista de actividades */}
            <div class="overflow-auto" id="listaActividades">
                <Actividad comentarios = {state.comentarios} linkMenu = {state.linkMenu} />
                <Actividad comentarios = {state.comentarios} linkMenu = {state.linkMenu} />
                <Actividad comentarios = {state.comentarios} linkMenu = {state.linkMenu} />
                <Actividad comentarios = {state.comentarios} linkMenu = {state.linkMenu} />
                <Actividad comentarios = {state.comentarios} linkMenu = {state.linkMenu} />
                <Actividad comentarios = {state.comentarios} linkMenu = {state.linkMenu} />
            </div>

            <div class="col">
                <button type="button" class="btn btn-primary" onClick={gotoMenuProfesor}>
                    Atrás
                </button>
            </div>

          </div>

        </div>

      </div>
    </Fragment>
  )
}
