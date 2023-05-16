import React, { Fragment, useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import { CardActPlan } from './CardActPlan';


const API = "http://localhost:5000"; //process.env.REACT_APP_API;

export function ListaPlan() {

    const [actividades, setActividades] = useState([]);
    const clearActividad = () => {
        setActividades([]);
    };
    const { state } = useLocation();
    useEffect(() => {
        handleVerTodasActividades();
    }, []);

    const handleVerTodasActividades = async (event) => {
        event.preventDefault();
    
        //esta obtiene todas las actividades
        const res = await fetch(`${API}/consultarActividades`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = await res.json(); //resultado de la consulta
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
                    <CardActPlan datos={JSON.parse(act)} />
                  )
                )
              }
            </div>
        </Fragment >
    )
}