import React, { Fragment, useState } from 'react';
import { Navbar } from '../../../navegacion/Navbar';
import { BarraLateral } from '../../../navegacion/BarraLateral';
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

const API = process.env.REACT_APP_API;

export  function InsertarEvidencias() {
    let navigate = useNavigate();
    let usuarioVista;

    const { state } = useLocation();
    console.log(state.idActividad)

    const [imagenes, setImagenes] = useState([]);
    const [image, setImage] = useState(null);
    const [enlace, setEnlace] = useState('');
  
   
    const handleEnlaceChange = (event) => {
        setEnlace(event.target.value);
    };
    const handleImage = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleImageUpload = (event) => {
        const selectedImages = event.target.files;
        setImagenes([...imagenes, ...selectedImages]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        //alert("Evidencias agregadas.") //envia alerta de que fueron agregadas

        console.log(image)
        imagenes.forEach((imagen) => {
            console.log(imagen);
        });  
        console.log(enlace)
        console.log(state.idActividad)

        const formData = new FormData();
        formData.append('idActividad', state.idActividad);
        formData.append('enlace', enlace);
        formData.append('image', image);
        
        const res = await fetch(`${API}/crearEvidencias`, {
            method: 'POST',
            body: formData
        });
        
        const formData2 = new FormData();
        const data = await res.json();
        const idEvidencia = parseInt(data); // Convertir a entero
        imagenes.forEach( async(imagen) => {
            formData2.append('image', imagen);
            await fetch(`${API}/agregarListaEv/${state.idActividad}`, {
                method: 'POST',
                body: formData2
            });
            formData2.delete('image');
        }); 

        // despues de agregar las evidencias devuelve al menú correspondiente
        const rol = await fetch(`${API}/getUsuarioActualRol`, {  
            method: "GET",
            headers: {
            "Content-Type": "application/json",
        }
        });
        const usuario = await rol.json();
        console.log(usuario)
        if (usuario === 1){ usuarioVista = '/menuProfesor'; }
        else if (usuario === 2){ usuarioVista = '/menuCoordinador'; }
        else if (usuario === 5){ Swal.fire({icon: 'info',title: 'Menu no disponible',
                                            text: 'El menu del estudiante no se encuentra habilitado.'}); }
        else { usuarioVista = '/menuAsistente'; }
        navigate(usuarioVista, {});
    }

    //const gotoDetalleActividad = () => { navigate('/verplan/detalle', { state: {  linkMenu: state.linkMenu } }); };

    return (
        <Fragment>
            <div className='container'>
                <Navbar linkInicio='/menuCoordinador'/>

                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg">
                        <h4>Nombre de la actividad - Evidencias</h4>
                        <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <Icon icon="material-symbols:photo-library" width="24" height="24" />
                            Fotografía
                        </div>
                        <div className="mb-3">
                                {image && (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Selected Image"
                                        style={{ width: '30%', height: 'auto' }}
                                    />
                                )}
                        </div>
                        <div className="mb-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                />
                        </div>
                        

                        <div className="mb-3">

                            <Icon icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form" width="24" height="24" />
                            Lista de asistencia
                        </div>

                        <div className="mb-3">
                                {imagenes.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt="Selected Image"
                                    style={{ width: '30%', height: 'auto' }}
                                />
                                ))}
                            </div>
                            <div className="mb-3">
                                <input type="file" accept="image/*" onChange={handleImageUpload} multiple />
                            </div>

                        
                            <div className=" mb-3">
                                <Icon  icon="material-symbols:video-camera-back" width="24" height="24" />
                                <a href={enlace}>{enlace}</a>
                            </div>
                            <div className="mb-3">
                                <input type="text" value={enlace} onChange={handleEnlaceChange} />
                            </div>

                            <div className="mb-3">
                                <button type="submit" class="btn btn-primary">Agregar </button>
                            </div>



                        </form>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
