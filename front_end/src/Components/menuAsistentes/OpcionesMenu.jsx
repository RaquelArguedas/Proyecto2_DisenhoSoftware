import React, {Fragment} from 'react'

export default function OpcionesMenu() {
  return (
    <Fragment>
       <div className="m-3 p-3 bg-light">
       <div class="row m-5">
            <div class="col">
              <button className="btn btn-success h-100 w-100">
                Consultar profesores
              </button>
            </div>
            <div class="col">
              <button className="btn btn-success h-100 w-100">
                Consultar estudiantes
              </button>
            </div>
            <div class="col">
              <button className="btn btn-success h-100 w-100">
                Ver plan de trabajo
              </button>
            </div>
        </div>
        <div class="row m-5">
            <div class="col">
              <button className="btn btn-success h-100 w-100">
                Agregar un nuevo profesor
              </button>
            </div>
            <div class="col">
              <button className="btn btn-success h-100 w-100">
              Definir al coordinador del equipo
              </button>
            </div>
            <div class="col">
              <button className="btn btn-success h-100 w-100">
                Dar de baja a un profesor
              </button>
            </div>
        </div>
        <div class="row m-5">
            <div class="col">
              <button className="btn btn-success h-100 w-100">
                Consultar equipo guía
              </button>
            </div>
            <div class="col">
              <button className="btn btn-success h-100 w-100">
                Modificar datos de un profesor
              </button>
            </div>
            <div class="col">
              <button className="btn btn-success h-100 w-100">
                Cargar datos de estudiantes
              </button>
            </div>
        </div>
       </div>
    </Fragment>
  )
}
