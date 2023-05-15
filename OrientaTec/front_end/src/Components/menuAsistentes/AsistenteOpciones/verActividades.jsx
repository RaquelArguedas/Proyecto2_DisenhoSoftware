import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../../navegacion/Navbar";
import { BarraLateral } from "../../navegacion/BarraLateral";
import { Actividad } from "./verActividades/Actividad";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000"; //process.env.REACT_APP_API;

export function VerActividades() {
  let navigate = useNavigate();

  const [actividades, setActividades] = useState([]);
  const clearActividad = () => {
    setActividades([]);
  };

  const handleVerProximaActividad = async (event) => {
    event.preventDefault();
    //  esta consulta la proxima actividad
    const res = await fetch(`${API}/consultarProximaActividad`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json(); //resultado de la consulta
  };

  const handleVerTodasActividades = async (event) => {
    event.preventDefault();
    console.log("Legue aqui por lo menos")

    //esta obtiene todas las actividades
    const res = await fetch(`${API}/consultarActividades`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("Pase el get")

    const data = await res.json(); //resultado de la consulta
    console.log(data) //hasta aqui todo
    setActividades(() => {
      clearActividad();
      return [data]
    })
    console.log("Segundo date")
    console.log(data)
    console.log("Primer activiades")
    console.log(actividades)
    
  };

  const handleVerActividadesEstado = async (estad,event) => {
    event.preventDefault();
    // Obtener las actividades dependiendo del estado
    const res = await fetch(`${API}/consultarActividadesEstado/${estad}`, {  //aca se cambia el 1 por el estado deseado, asi se sacan las canceladas y las realizadas
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    });
    const data = await res.json() //resultado de la consulta
    setActividades(() => {
      clearActividad();
      return [data]
    })
    console.log(data) // imprime en consola web
    console.log(data[0])//ejemplo
    const obj = JSON.parse(data[0]); //aca toma la actividad en la posicion x y lo convierte en un JSON
    console.log(obj.tipoActividad)
  };

  const gotoMenuProfesor = () => {
    navigate("/menuProfesor", {});
  };
  const { state } = useLocation();

  return (
    <Fragment>
      <div className="container">
        <Navbar linkInicio={state.linkMenu} />

        <div class="row">
          <div class="col-sm-3">
            <BarraLateral />
          </div>

          <div class="col-lg m-3 p-3 bg-light">
            <div className="row mb-4">
              <div className="col-lg">
                <h4>Actividades del plan de trabajo</h4>
              </div>
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
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    onChange={handleVerTodasActividades} // Agrega el controlador de eventos onChange
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Ver todas las actividades
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    onChange={(event) => handleVerActividadesEstado(2,event)}// Agrega el controlador de eventos onChange
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Proximas actividades
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    onChange={(event) => handleVerActividadesEstado(3,event)}
                    
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Actividades Realizadas
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault4"
                    onChange={(event) => handleVerActividadesEstado(4,event)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault4"
                  >
                    Actividades Canceladas
                  </label>
                </div>
              </div>
            </div>

            {/* Lista de actividades */}
            <div class="overflow-auto" id="listaActividades">
              {console.log("Aqui en el bajo mundo")}
              {console.log(actividades[0])}
              { actividades.length>0 && 
                actividades[0].map((act) =>
                   (
                    console.log(JSON.parse(act)),
                    <Actividad datos={JSON.parse(act)} />
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
