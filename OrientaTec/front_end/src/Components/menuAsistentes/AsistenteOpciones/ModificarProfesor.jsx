import React, { Fragment, useState } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';
import axios from 'axios';

const API = process.env.REACT_APP_API;

export  function ModificarProfesor() {
    const [estado, setEstado] = useState("");
    const [name, setName] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [cedula, setCedula] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [numeroOficina, setNumeroOficina] = useState('');
    const [correo, setCorreo] = useState('');
    const [sede, setSede] = useState('');
    const [image, setImage] = useState(null);
    const [imagenData, setImagenData] = useState(null);

    function isBase64Valid(base64String) {
        const regex = /^[A-Za-z0-9+/=]+$/;
        const isLengthValid = base64String.length % 4 === 0;
        const isValidCharacters = regex.test(base64String);
        return isLengthValid && isValidCharacters;
      }

    const obtenerImagen = async () => {
        try {
            const response = await axios.get(`${API}/getFotoProfesorCodigo/${"SJ-1"}`); //aqui debe enviar el codigo que es
            const imageBase64 = response.data;
            console.log(isBase64Valid(imageBase64));
            setImagenData(imageBase64);
          } catch (error) {
            console.error('Error al obtener la imagen:');
          }
      };

    const handleSubmit = async (event) => {
        event.preventDefault();  

        const formData = new FormData();
        formData.append('image', image);
        //formData.append('codigo', codigo);
        formData.append('cedula', cedula);
        formData.append('name', name);
        formData.append('apellido1', apellido1);
        formData.append('apellido2', apellido2);
        formData.append('sede', sede);
        formData.append('numeroTelefono', numeroTelefono);
        formData.append('correo', correo);
        formData.append('numeroOficina', numeroOficina);

        
        const res = await fetch(`${API}//modificarProfesor`, {
            method: 'POST',
            body: formData
        });
        
        const data = await res.json() //resultado de la consulta
        console.log(data) // imprime en consola web
    }
    const handleSearch = async () => { 
        obtenerImagen();
        const res = await fetch(`${API}/getProfesorCodigo/${"SJ-1"}`); //PENDIENTE : debe de darle el codigo
        const data = await res.json();//resultado de la consulta
        console.log(data) // imprime en consola web
            
        setName(data.nombre)
        setApellido1(data.apellido1)
        setApellido2(data.apellido2)
        setCedula(data.cedula)
        setNumeroTelefono(data.numeroCelular)
        setNumeroOficina(data.numeroOficina)
        setCorreo(data.correoElectronico)
        setSede(data.sede)
        setEstado(data.estado);
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
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
        }; 
    const handleCelularChange = (event) => {
        setNumeroTelefono(event.target.value);
    }; 
    const handleOficinaChange = (event) => {
        setNumeroOficina(event.target.value);
    }; 
    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    }; 
    
    const handleSedeChange = (event) => {
        setSede(event.target.value);
    };
    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };
    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

  return (
    <Fragment>
        <div className="container">
                <Navbar linkInicio='/menuAsistente'/>
                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Modificar informacion de un profesor</h4>
                         {/*La seguiente seccion mostrara un input group donde se introducira el codigo
                         y porsterior se tocara el boton */}
                        <div className="input-group w-50 my-3">
                            <span className="input-group-text" >Código</span>
                            <input id="txtCodigo" type="text" className="form-control" />
                            <button onClick={handleSearch} className="btn btn-primary"> <Icon icon="ic:baseline-search" width="24" height="24" /> Buscar </button>
                        </div>
                        {/*La seguiente seccion tendra los formGroupInput, al tocar el boton de buscar 
                        se rellera con la informacion del profesor que buscar */}
                        <form onSubmit={handleSubmit}>
                        <div>
                            <div class="mb-3">
                                <div class="mb-3">
                                    <label htmlFor="formGroupInputName" class="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su nombre" value={name} onChange={handleNameChange}
                                            />
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="formGroupInputApellido1" class="form-label">Primer Apellido</label>
                                    <input type="text" class="form-control" id="formGroupInputApellido1" placeholder="Ingrese su primer apellido"
                                    value={apellido1} onChange={handleApellido1Change}/>
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="formGroupInputApellido2" class="form-label">Segundo Apellido</label>
                                    <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su segundo apellido" value={apellido2} onChange={handleApellido2Change}
                                            />
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="formGroupInputCedula" class="form-label">Cedula</label>
                                    <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su cedula" value={cedula} onChange={handleCedulaChange}
                                            />
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="formGroupInputNumeroCelular" class="form-label">Número de celular</label>
                                    <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su número de telefono" value={numeroTelefono} onChange={handleCelularChange}
                                            />
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="formGroupInputNumeroOficina" class="form-label">Número de oficina</label>
                                    <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su número de oficina" value={numeroOficina} onChange={handleOficinaChange}
                                            />
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="formGroupInputCorreo" class="form-label">Correo</label>
                                    <input type="text" className="form-control" id="nameInput"
                                            placeholder="Ingrese su correo" value={correo} onChange={handleCorreoChange}
                                            />
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="autoSizingSelect" class="form-label">Sede: </label>
                                    
                                </div>
                                <div class="mb-3">
                                    <select id="mySelect" value={sede} onChange={handleSedeChange}>
                                    <option value="">Seleccionar</option>
                                    <option value="1">Cartago</option>
                                    <option value="2">Alajuela</option>
                                    <option value="3">Limon</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label htmlFor="autoSizingEstado" class="form-label">Estado: </label>
                                    
                                </div>
                                <div class="mb-3">
                                    <select id="mySelect2" value={estado} onChange={handleEstadoChange}>
                                    <option value="">Seleccionar</option>
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupInputCodigo" className="form-label">
                                    Foto
                                    {imagenData && <img src={`data:image/jpeg;base64,${imagenData}`} alt="Foto del profesor" style={{ width: '300px', height: 'auto' }}/>}
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
                                <div className="mb-3">
                                <button type="submit" class="btn btn-primary">Modificar información</button>
                                </div>

                            </div>
                        </div>
                        </form>
                    </div>
                </div>
        </div>

    </Fragment>
  )
}
