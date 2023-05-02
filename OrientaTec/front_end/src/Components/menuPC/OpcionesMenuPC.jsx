import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function OpcionesMenuPC() {
  let navigate = useNavigate();

  const gotoVerPlanTrabajo = () => {navigate("/verplan", {state:{comentarios: true, linkMenu: "/menuCoordinador"}});};
  const gotoInformacionEstudiantes = () => {navigate("/consultarestudiantesp", {});};
  const gotoInformacionEquipo = () => {navigate("/infoequipo", {});};
  const gotoModificarEstudiante = () => {navigate("/modificarEstudiante", {});};
  const gotoModificarActividad = () => {navigate("/modificarActividad", {});};
  const gotoCrearActividad = () => {navigate("/crearActividad", {});};
  const gotoDefinirPlan = () => {navigate("/definirPlan", {});};

  return (
    <Fragment>
        <div className="m-3 p-3 bg-light">
            <div class="row m-5">
                <div>
                    <label htmlFor="labelDisableControl" class="form-label">Plan de trabajo</label>
                </div>
                <div class="col">
                    <button
                    onClick={gotoInformacionEquipo}
                    className="btn btn-success h-100 w-100"
                    >
                    Consultar equipo guía
                    </button>
                </div>
                
                <div class="col">
                    <button
                    onClick={gotoVerPlanTrabajo}
                    className="btn btn-success h-100 w-100"
                    >
                    Ver plan de trabajo
                    </button>
                </div>
                <div class="col">
                    <button
                    onClick={gotoModificarActividad}
                    className="btn btn-success h-100 w-100"
                    >
                    Modificar actividad
                    </button>
                </div>
            </div>
            <div class="row m-5">
                <div class="col">
                    <button
                    onClick={gotoCrearActividad}
                    className="btn btn-success h-100 w-100"
                    >
                    Definir nueva actividad
                    </button>
                </div>
                
                <div class="col">
                    <button
                    onClick={gotoDefinirPlan}
                    className="btn btn-success h-100 w-100"
                    >
                    Definir plan de trabajo
                    </button>
                </div>

            </div>
            <div class="row m-5">
                <div>
                    <label htmlFor="labelDisableControl" class="form-label">Estudiantes</label>
                </div>
                <div class="col">
                    <button
                    onClick={gotoInformacionEstudiantes}
                    className="btn btn-success h-100 w-100"
                    >
                    Consultar estudiantes
                    </button>
                </div>
                <div class="col">
                    <button
                    onClick={gotoModificarEstudiante}
                    className="btn btn-success h-100 w-100"
                    >
                    Modificar datos de un estudiante
                    </button>
                </div>
                
            </div>
            <div class="row m-5">
                <div class="col">
                    <button
                    className="btn btn-success h-100 w-100"
                    >
                    Generar Exel de datos del campus perteneciente
                    </button>
                </div>
                <div class="col">
                    <button
                    className="btn btn-success h-100 w-100"
                    >
                    Generar Exel de datos de todos los campus
                    </button>
                </div>
                
            </div>
        </div>
    </Fragment>
  );
}
