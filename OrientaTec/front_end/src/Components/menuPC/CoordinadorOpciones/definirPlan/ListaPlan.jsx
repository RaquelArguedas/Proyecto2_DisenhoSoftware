import React, { Fragment, useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import { CardActPlan } from './CardActPlan';


const API = "http://localhost:5000"; //process.env.REACT_APP_API;

export function ListaPlan() {

    const [lisActividades, setActividades] = useState([]);
    const clearActividad = () => {
        setActividades([]);
    };
    const { state } = useLocation();
    useEffect(() => {
        handleVerTodasActividades();
    }, []);

    const handleVerTodasActividades = async (event) => {
        //esta obtiene todas las actividades
        const res = await fetch(`${API}/consultarActividades`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("aqui dentro de la funcion de ver todas las actividades")
        const data = await res.json(); //resultado de la consulta
        setActividades(() => {
          clearActividad();
          return [data]
        })
      };
      
    return (
        <Fragment>
            <div className="input-group my-3" id="listaActividades">
              {console.log("Aqui elista plan")}
              { lisActividades.length>0 && 
                lisActividades[0].map((acti) =>
                   (
                    <CardActPlan datos={JSON.parse(acti)} />
                  )
                )
              }
            </div>
        </Fragment >
    )
}