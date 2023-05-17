import React, {Fragment, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { uploadFile } from './AsistenteOpciones/CargarExel';

export default function OpcionesMenu() {
  let navigate = useNavigate();

  const gotoVerPlanTrabajo = () => { navigate('/verplan', {state:{comentarios: false, linkMenu: "/menuAsistente"}}); }
  const gotoInformacionEstudiantes = () => { navigate('/infoestudiantes', {state: {linkMenu: "/menuAsistente"}}); }
  const gotoInformacionProfesores = () => { navigate('/infoprofesores', {}); }
  const gotoInformacionEquipo = () => { navigate('/infoequipo', {state: {linkMenu: "/menuAsistente"}}); }
  const gotoAsignarCoordinador = () => { navigate('/asignarcoordinador', {}); }
  const gotoDarBajaProfesor = () => { navigate('/darbajaprofesor', {}); }
  const gotoAgregarProfesor = () => { navigate('/agregarprofesor', {}); }
  const gotoModificarProfesor = () => { navigate('/modificarProfesor', {}); }

  const [selectedFile, setSelectedFile] = useState(null);//Donde se almacena temporalmente el archivo

  const handleFileSelect = event => {  // Define una función llamada handleFileSelect que se ejecuta cuando el usuario selecciona un archivo
    const file = event.target.files[0]; // Obtener el archivo seleccionado del objeto de evento y almacenarlo en una variable llamada file
    setSelectedFile(file); // Actualizar el estado de la aplicación con el archivo seleccionado
    uploadFile(file); // Llamar a una función que maneja la carga del archivo al servidor
  }

  return (
    <Fragment>
       <div className="m-3 p-3 bg-light">
       <div class="row m-5">
            <div class="col">
              <button onClick={gotoInformacionProfesores} className="btn btn-success h-100 w-100">
                Consultar profesores
              </button>
            </div>
            <div class="col">
              <button onClick={gotoInformacionEstudiantes} className="btn btn-success h-100 w-100">
                Consultar estudiantes
              </button>
            </div>
            <div class="col">
              <button onClick={gotoVerPlanTrabajo} className="btn btn-success h-100 w-100">
                Ver plan de trabajo
              </button>
            </div>
        </div>
        <div class="row m-5">
            <div class="col">
              <button onClick={gotoAgregarProfesor} className="btn btn-success h-100 w-100">
                Agregar un nuevo profesor
              </button>
            </div>
            <div class="col">
              <button onClick={gotoAsignarCoordinador} className="btn btn-success h-100 w-100">
              Definir al coordinador del equipo
              </button>
            </div>
            <div class="col">
              <button onClick={gotoDarBajaProfesor} className="btn btn-success h-100 w-100">
                Dar de baja a un profesor
              </button>
            </div>
        </div>
        <div class="row m-5">
            <div class="col">
              <button onClick={gotoInformacionEquipo} className="btn btn-success h-100 w-100">
                Consultar equipo guía
              </button>
            </div>
            <div class="col">
              <button onClick={gotoModificarProfesor} className="btn btn-success h-100 w-100">
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
