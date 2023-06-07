import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavbarEstudiante } from "../navegacionEstudiante/NavbarEstudiante";
import { BarraLateral } from "../../navegacion/BarraLateral";
import { ActividadEstudiante } from "./actividadEstudiante";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000"; //process.env.REACT_APP_API;

export function VerActividadesPlaneadas() {
  let navigate = useNavigate();

  const { state } = useLocation();
  const [actividades, setActividades] = useState([]);
  const [primerActividad, setPrimerActividad] = useState([]);
  const [ultimaActividad, setUltimaActividad] = useState([]);
  const clearActividad = () => {
    setActividades([]);
  };

  const [todasActividades, setTodasActividades] = useState([]);
  const clearTodas = () => {
    setTodasActividades([]);
  };
  useEffect(() => {
    handleTodasActividades()
  }, []);
  useEffect(() => {
    handleVerActividadesEstado(1)
  }, []);

  const handleTodasActividades = async () => {
    const res = await fetch(`${API}/consultarActividades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json(); //resultado de la consulta
    console.log(data)
    console.log("Estoy en la funcion de todas las actividades")
    setPrimerActividad(JSON.parse(data[0]).fechaActividad)
    setUltimaActividad(JSON.parse(data[data.length - 1]).fechaActividad)
    //const primeraActividad=todasActividades.fechaActividad[0]
    //console.log(primeraActividad)
  };

  const handleVerActividadesEstado = async (estad) => {
    // Obtener las actividades dependiendo del estado
    const res = await fetch(`${API}/consultarActividadesEstado/${1}`, {  //aca se cambia el 1 por el estado deseado, asi se sacan las canceladas y las realizadas
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json() //resultado de la consulta
    setActividades(() => {
        clearTodas()
        return [data]
    })
    console.log(data) // imprime en consola web
    console.log(data[0])//ejemplo
    const obj = JSON.parse(data[0]); //aca toma la actividad en la posicion x y lo convierte en un JSON
    console.log(obj.tipoActividad)
  };



  return (
    <Fragment>
      <div className="container">
        <NavbarEstudiante />

        <div class="row">
          <div class="col-sm-3">
            <BarraLateral />
          </div>

          <div class="col-lg m-3 p-3 bg-light">
            <div className="row mb-4">
              <div className="col-lg">
                <h4>Actividades planeadas</h4>
              </div>
              <div className="col-sm-3">
                <p>Inicio: {primerActividad}</p>
              </div>
              <div className="col-sm-3">
                <p>Fin: {ultimaActividad}</p>
              </div>
            </div>


            {/* Lista de actividades */}
            <div class="overflow-auto" id="listaActividades">
              {console.log("Aqui en el bajo mundo")}
              {actividades.length > 0 &&
                actividades[0].map((act) =>
                (
                console.log("Apunto de mostar la informacion"),
                  console.log(JSON.parse(act)),
                  <ActividadEstudiante datos={JSON.parse(act)} />
                )
                )
              }
            </div>


          </div>
        </div>
      </div>
    </Fragment>
  );
}
