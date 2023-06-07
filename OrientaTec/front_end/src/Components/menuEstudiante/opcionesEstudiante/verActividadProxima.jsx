import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavbarEstudiante } from "../navegacionEstudiante/NavbarEstudiante";
import { BarraLateral } from "../../navegacion/BarraLateral";
import { ActividadEstudiante } from "./actividadEstudiante";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000"; //process.env.REACT_APP_API;

export function VerActividadesProxima() {
  const [actividades, setActividades] = useState([]);
  useEffect(() => {
    handleVerActividadesEstado(2)
  }, []);

  const handleVerActividadesEstado = async (estad) => {
    // Obtener las actividades dependiendo del estado
    const res = await fetch(`${API}/consultarActividadesEstado/${2}`, {  //aca se cambia el 1 por el estado deseado, asi se sacan las canceladas y las realizadas
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json() //resultado de la consulta
    if (Array.isArray(data) && data.length > 0) {
        console.log(data[0]); //ejemplo
        setActividades(data);
      }
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
                <h4>Proxima actividad</h4>
              </div>
            </div>


            {/* Lista de actividades */}
            <div className="overflow-auto" id="listaActividades">
                {console.log("Aquí en el bajo mundo")}
                {actividades.length > 0 ? (
                    <>
                    {console.log("A punto de mostrar la información")}
                    {console.log(JSON.parse(actividades[0][0]))}
                    <ActividadEstudiante datos={JSON.parse(actividades[0])} />
                    </>
                ) : (
                    <p>No hay actividades próximas en este momento.</p>
                )}
                </div>


          </div>
        </div>
      </div>
    </Fragment>
  );
}
