import React, { Fragment, useState } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'
import { Icon } from '@iconify/react';

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

    const handleSubmit = (event) => {
        event.preventDefault();  
        // Aquí puedes enviar los datos a tu backend o hacer lo que necesites con ellos
      }
    const handleSearch = async () => { //esto ignorelo lo estoy arreglando
        const res = await fetch(`${API}/getProfesorCodigo/${"SJ-1"}`); //darle el codigo
        const data = await res.json();//resultado de la consulta
        console.log(data) // imprime en consola web
        console.log(data) 
        console.log(data['nombre']) 
        console.log(data["nombre"]) 
        console.log(data.nombre) 
        console.log(data[0]) 
        if(data.nombre == undefined ) {
            console.log("new title is");
         }
            
        setName(data.nombre)
        setApellido1("Corrales")
        setApellido2('Perez')
        setCedula(11230034)
        setNumeroTelefono(87655432)
        setNumeroOficina(22341265)
        setCorreo('Adolfo23@estudiantec.cr')
        setSede("2")
        setEstado("1");
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
                <Navbar />
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
