import React, { Fragment } from 'react'

import { useNavigate } from "react-router-dom"
export default function OpcionesEstudiantes() {
    let navigate = useNavigate();

    const gotoConfiguracion = () => {navigate("/configuracionEstudiante");};
    const gotoActividadesPlaneadas = () => {navigate("/actividadesPlaneadas");};
    const gotoActividadProxima = () => {navigate("/actividadProxima");};
    const gotoChat=()=>{navigate('/chat');};
  return (
    <Fragment>
        <div className="m-3 p-3 bg-light">
        <div class="row m-5">
            <div class="col">
              <button onClick = {gotoActividadesPlaneadas} className="btn btn-success h-100 w-100">
                Ver actividades planeadas
              </button>
            </div>
            <div class="col">
              <button  onClick={gotoChat} className="btn btn-success h-100 w-100">
                Chat
              </button>
            </div>
              
        </div>
        <div class="row m-5">
            <div class="col">
              <button onClick = {gotoActividadProxima} className="btn btn-success h-100 w-100">
                Ver próxima actividad
              </button>
            </div>
            <div class="col">
            <button onClick ={gotoConfiguracion} className="btn btn-success h-100 w-100">
                Mi cuenta
              </button>
            </div>
              
        </div>
       </div>

    </Fragment>
  )
}
