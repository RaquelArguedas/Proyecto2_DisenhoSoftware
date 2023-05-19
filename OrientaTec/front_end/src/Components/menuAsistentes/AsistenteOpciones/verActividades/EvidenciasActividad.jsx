import React, { Fragment, useState, useEffect} from 'react';
import { Navbar } from '../../../navegacion/Navbar';
import { BarraLateral } from '../../../navegacion/BarraLateral';
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const API = process.env.REACT_APP_API;

export function EvidenciasActividad() {
    const [imagenDataEv, setImagenDataEv] = useState(null);
    const [imagenDataEvLista, setImagenDataEvLista] = useState(null);
    const [enlace, setEnlace] = useState(null);

    let navigate = useNavigate();

    const { state } = useLocation();

    const gotoDetalleActividad = () => { navigate('/verplan/detalle', { state: { comentarios: state.comentarios, linkMenu: state.linkMenu, datosActividad: state.datos  } }); };


    function isBase64Valid(base64String) {
        const regex = /^[A-Za-z0-9+/=]+$/;
        const isLengthValid = base64String.length % 4 === 0;
        const isValidCharacters = regex.test(base64String);
        return isLengthValid && isValidCharacters;
      }

    const obtenerImagenEv = async () => {
        try {
            const response = await axios.get(`${API}/getFotoEv/${state.datos.idActividad}`); // idActividad
            //console.log("Response imagen ev", response.data);
            const imageBase64 = response.data;
            //console.log(isBase64Valid(imageBase64));
            //console.log("Response imagen ev", imageBase64);
            setImagenDataEv(imageBase64);
          } catch (error) {
            console.error('Error al obtener la imagen:');
          }
      };

    const obtenerImagenEvLista = async () => {
        try {
            const response = await axios.get(`${API}/getFotoEvLista/${state.datos.idActividad}`); 
            //console.log("Response imagen lista ev",response.data)
            const listaSalida = []
            for (const clave in response.data) {
                console.log(typeof response.data)
                console.log("Response imagen lista ev 2.1",response.data[clave])
                const imageBase64 = response.data[clave];
                console.log(isBase64Valid(imageBase64));
                listaSalida.push(imageBase64)
            }
            //console.log("Response imagen lista ev",listaSalida)
            setImagenDataEvLista(listaSalida);
          } catch (error) {
            console.error('Error al obtener la imagen:');
          }
      };

    const obtenerEnlace = async () => {
        const res = await fetch(`${API}/getEnlaceEv/${3}`);

        const data = await res.json() //resultado de la consulta
        console.log(data) // imprime en consola web

        setEnlace(data)
      };

      

    useEffect(() => {
        setPage(); // Llamar a handleSearch cuando se monte el componente
    }, []);

    const setPage = async () => {
        obtenerImagenEv()
        obtenerImagenEvLista()
        obtenerEnlace()
    };

    

    return (
        <Fragment>
            <div className='container'>
                <Navbar linkInicio={state.linkMenu}/>

                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg">
                        <h4>Nombre de la actividad - Evidencias</h4>

                        <p class="card-text mb-2">
                            <Icon icon="material-symbols:photo-library" width="24" height="24" />
                            Fotografías
                        </p>

                        <div className="row">
                            {imagenDataEv && <img src={`data:image/jpeg;base64,${imagenDataEv}`} alt="Foto de la evidencia" style={{ width: '300px', height: 'auto' }}/>}
                        </div>

                        <p class="card-text mb-2">
                            <Icon icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form" width="24" height="24" />
                            Lista de asistencia
                        </p>

                        <div className="row">
                            {imagenDataEvLista && imagenDataEvLista.map((imagen, index) => (
                                <img key={index} src={`data:image/jpeg;base64,${imagen}`} alt={`Imagen ${index}`} style={{ width: '300px', height: 'auto' }} />
                            ))}
                        </div>

                        <p class="card-text mb-2">
                            <Icon icon="material-symbols:video-camera-back" width="24" height="24" />
                            <a href={enlace}>{enlace}</a>
                        </p>

                        <div class="col">
                            <button type="button" class="btn btn-primary" onClick={gotoDetalleActividad}>
                                Atrás
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}