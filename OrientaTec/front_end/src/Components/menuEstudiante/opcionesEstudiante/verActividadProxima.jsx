import React, { Fragment, useState, useEffect } from "react";
import { NavbarEstudiante } from "../navegacionEstudiante/NavbarEstudiante";
import { BarraLateral } from "../../navegacion/BarraLateral";
import { ActividadEstudiante } from "./actividadEstudiante";

const API = "http://localhost:5000/"; //process.env.REACT_APP_API;

export function VerActividadesProxima() {
  const [actividades, setActividades] = useState(null);
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
        console.log(JSON.parse(data[0]));
        setActividades(JSON.parse(data[0]));
    }
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
                {actividades != null ? (
                    <>
                    <ActividadEstudiante datos={actividades} />
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
