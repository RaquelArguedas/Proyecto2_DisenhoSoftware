import React, { Fragment, useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import { CardActividad } from './CardActividad';

const API = "http://localhost:5000"; //process.env.REACT_APP_API;
export function ListaActividades() {
    const [actividades, setActividades] = useState([]);
    const clearActividad = () => {
        setActividades([]);
    };
    const { state } = useLocation();
    useEffect(() => {
        handleVerActividadesEstado();
    }, []);

    const handleVerActividadesEstado = async (event) => {
        // Obtener las actividades dependiendo del estado
        const res = await fetch(`${API}/consultarActividadesEstado/${1}`, {  //aca se cambia el 1 por el estado deseado, asi se sacan las canceladas y las realizadas
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        });
        const data = await res.json() //resultado de la consulta
        console.log("aqui dentro de la funcion")
        console.log(data)
        setActividades(() => {
          clearActividad();
          return [data]
        })
      };

    return (
        <Fragment>
            <div className="input-group my-3" id="listaActividades">
              {console.log("Aqui en el bajo mundo")}
              { actividades.length>0 && 
                actividades[0].map((act) =>
                   (
                    <CardActividad datos={JSON.parse(act)} />
                  )
                )
              }
            </div>
        </Fragment >
    )
}