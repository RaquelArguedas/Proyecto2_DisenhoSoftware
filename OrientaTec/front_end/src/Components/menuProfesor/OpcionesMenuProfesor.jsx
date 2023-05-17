import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import GenerarExel from "./ProfesorOpciones/GenerarExel";
import GenerarExelPorCampus from "./ProfesorOpciones/GenerarExelPorCampus";


export function OpcionesMenuProfesor() {
    let navigate = useNavigate();

    const gotoVerPlanTrabajo = () => { navigate("/verplan", {state:{comentarios: true, linkMenu: "/menuProfesor"}}); };
    const gotoInformacionEstudiantes = () => { navigate("/consultarestudiantesp", {state: {linkMenu: "/menuProfesor"}}); };
    const gotoInformacionEquipo = () => { navigate("/infoequipo", {state: {linkMenu: "/menuProfesor"}}); };
    const gotoModificarEstudiante = () => { navigate("/modificarEstudiante", {state: {linkMenu: "/menuProfesor"}}); };
    const gotoModificarProfesor = () => { navigate("/modificarProfesor", {}); };
    function handleDownloadExcelCampus() { // Define una función llamada handleDownloadExcelCampus que se ejecuta cuando se hace clic en un botón o enlace
        GenerarExel(); // Llama a una función llamada GenerarExel que probablemente genera y descarga un archivo Excel para el campus especificado
      }
      
      function handleDownloadExcelPorCampus() { // Define una función llamada handleDownloadExcelPorCampus que se ejecuta cuando se hace clic en un botón o enlace
        GenerarExelPorCampus(); // Llama a una función llamada GenerarExelPorCampus que probablemente genera y descarga un archivo Excel que contiene información detallada por campus
      }
    
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
