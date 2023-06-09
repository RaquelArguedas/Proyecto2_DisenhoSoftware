import React, { Fragment, useState, useEffect  } from 'react'
import { useLocation } from "react-router-dom";
import { NavbarEstudiante } from './NavbarEstudiante';
import { BarraLateral } from '../../navegacion/BarraLateral';
import axios from 'axios';

const API = process.env.REACT_APP_API;

export  function ConfiguracionEstudiante() {
    const state = useLocation().state

    const [name, setName] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [carnet, setCarnet] = useState('');
    const [id, setId] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [sede, setSede]=useState('');
    const [estado, setEstado]=useState('');
    const [image, setImage] = useState(null);
    const [imagenData, setImagenData] = useState(null);

    function isBase64Valid(base64String) {
        const regex = /^[A-Za-z0-9+/=]+$/;
        const isLengthValid = base64String.length % 4 === 0;
        const isValidCharacters = regex.test(base64String);
        return isLengthValid && isValidCharacters;
      }

    const obtenerImagen = async (carnet) => {
        //Obtener imagen de estudiante
        try {
            const response = await axios.get(`${API}/getFotoEstudiante/${carnet}`); 
            const imageBase64 = response.data;
            console.log(isBase64Valid(imageBase64));
            setImagenData(imageBase64);
          } catch (error) {
            console.error('Error al obtener la imagen:');
        }
      };

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();  
        if (numeroTelefono===''){
            alert("Ha dejado el numero de telefono en blanco.");
        }else{
            const formData = new FormData();
            formData.append('image', image);
            formData.append('carnet', carnet);
            formData.append('name', name);
            formData.append('apellido1', apellido1);
            formData.append('apellido2', apellido2);
            formData.append('sede', sede);
            formData.append('numeroTelefono', numeroTelefono);
            formData.append('correo', correo);
            formData.append('estado', estado);   
                
            console.log(carnet)
            await fetch(`${API}/modificarEstudianteFront`, {
                method: 'POST',
                body:formData
                //headers: {
                //  'Content-Type': 'application/json',
                //},
                //body: JSON.stringify(formData),
            });
             
            alert("Se ha modificado la información correctamente")
        }

    }
        
    const handleSearch = async () => {
        //Buscar los datos del estudiante actual y mostar la informacion
        const res = await fetch(`${API}/getInfoUsuarioSesionActual`); 
        const data = await res.json();//resultado de la consulta
        console.log(data) // imprime en consola web 

        setName(data['nombre'])
        setApellido1(data['apellido1'])
        setApellido2(data['apellido2'])
        setSede(data['sede'])
        setNumeroTelefono(data['numeroCelular'])
        setCorreo(data['correoElectronico'])
        setEstado(data['estado'])
        setCarnet(data['carnet']);
        obtenerImagen(data['carnet']);
   
    };
    
    const handleNameChange = (event) => {
        setName(event.target.value);
        }; 
        
    const handleApellido1Change = (event) => { 
        setApellido1(event.target.value);
        }; 
    const handleApellido2Change = (event) => {
        setApellido2(event.target.value);
        }; 
    const handleCelularChange = (event) => {
        setNumeroTelefono(event.target.value);
    }; 
    const handleCarnetChange = (event) => {
        setCarnet(event.target.value);
    }; 
    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    }; 
    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
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
                        <h4>Datos Personales</h4>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <div class="mb-3">
                                        <label htmlFor="labelDisableControl" class="form-label"></label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" 
                                        id="floatingInputDisabled"
                                        value={carnet} onChange={handleCarnetChange}  disabled />
                                        <label for="floatingInputDisabled">Carnet</label>
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputName" class="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nameInput"
                                                placeholder="Ingrese su nombre" value={name} onChange={handleNameChange}
                                                disabled/>
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputApellido1" class="form-label">Primer Apellido</label>
                                        <input type="text" class="form-control" id="formGroupInputApellido1" placeholder="Ingrese su primer apellido"
                                        value={apellido1} onChange={handleApellido1Change} disabled/>
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputApellido2" class="form-label">Segundo Apellido</label>
                                        <input type="text" className="form-control" id="nameInput"
                                                placeholder="Ingrese su segundo apellido" value={apellido2} onChange={handleApellido2Change}
                                                disabled/>
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputNumeroCelular" class="form-label">Número de celular</label>
                                        <input type="text" className="form-control" id="nameInput"
                                                placeholder="Ingrese su número de telefono" value={numeroTelefono} onChange={handleCelularChange}
                                                />
                                    </div>
                                    <div class="mb-3">
                                        <label htmlFor="formGroupInputCorreo" class="form-label">Correo</label>
                                        <input type="text" className="form-control" id="nameInput"
                                                placeholder="Ingrese su correo" value={correo} onChange={handleCorreoChange}
                                                disabled/>
                                    <div className="mb-3">
                                        <label htmlFor="formGroupInputCodigo" className="form-label">
                                        Foto
                                        {imagenData && <img src={`data:image/jpeg;base64,${imagenData}`} style={{ width: '300px', height: 'auto' }}/>}
                                        </label>
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
                                        onChange={handleImageUpload}
                                        />
                                    </div>
                                    </div>
                                        <div className="mb-3">
                                        <button type="submit" class="btn btn-primary">Actualizar mi información</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </div>



    </Fragment>
  )
}

