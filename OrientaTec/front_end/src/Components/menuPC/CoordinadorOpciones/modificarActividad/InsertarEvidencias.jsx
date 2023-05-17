import React, { Fragment, useState } from 'react';
import { Navbar } from '../../../navegacion/Navbar';
import { BarraLateral } from '../../../navegacion/BarraLateral';
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export  function InsertarEvidencias() {
    let navigate = useNavigate();

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
