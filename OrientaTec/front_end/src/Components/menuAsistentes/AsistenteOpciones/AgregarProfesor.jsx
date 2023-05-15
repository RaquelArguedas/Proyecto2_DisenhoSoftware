import React, { Fragment, useState } from 'react'
import { Navbar } from '../../navegacion/Navbar'
import { BarraLateral } from '../../navegacion/BarraLateral'

const API = process.env.REACT_APP_API;

export function AgregarProfesor() {
    const [name, setName] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [cedula, setCedula] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [numeroOficina, setNumeroOficina] = useState('');
    const [correo, setCorreo] = useState('');
    const [sede, setSede] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();  
        if (cedula===''||name===''||apellido1===''||apellido2===''||sede===''||numeroTelefono===''||correo===''||numeroOficina===''){
            alert("Ha dejado campos en blanco.");
        }
        const info = await fetch(`${API}/getProfesorCodigo/${cedula}`); //PENDIENTE : debe de darle el carnet
        const data = await info.json();//resultado de la consulta
        console.log(data)
        if(data===null){
            const res = await fetch(`${API}/crearProfesor`, { //queda pendiente lo de agregar una foto
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cedula,name,apellido1, apellido2, sede, numeroTelefono, correo, 
                    numeroOficina
                }),
              });
    
            alert("Se ha ingreado un nusevo profesor")
        }

        else{
            alert("El profesor ya se encuentra ingresado");
        }
        
    }
    // const handleSearch = async () => {
    //     const res = await fetch(`${API}/getProfesorCodigo/${codigoRef.current.value}`); //PENDIENTE : debe de darle el codigo
    //     const data = await res.json();//resultado de la consulta
    // real
        
        // // base para front_end
        // //`${API}/nombreFuncion/${parametro1}/${parametro2}`
        // const res = await fetch(`${API}/getUsuarioRol/${"as@gmail.com"}/${"as"}`, {
        //     method: "GET",
        // });
        // const data = await res.json();//resultado de la consulta
        // console.log(data) // imprime en consola web

    // }


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
                    <div className="col-lg m-3 p-3 bg-light">
                        <h4>Agregar Profesor</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label htmlFor="formGroupInputName" class="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nameInput"
                                        placeholder="Ingrese el nombre" value={name} onChange={handleNameChange}
                                        />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formGroupInputApellido1" class="form-label">Primer Apellido</label>
                                <input type="text" class="form-control" id="formGroupInputApellido1" 
                                placeholder="Ingrese el primer apellido"
                                value={apellido1} onChange={handleApellido1Change}/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formGroupInputApellido2" class="form-label">Segundo Apellido</label>
                                <input type="text" className="form-control" id="nameInput"
                                        placeholder="Ingrese el segundo apellido"
                                        value={apellido2} onChange={handleApellido2Change}
                                        />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formGroupInputCedula" class="form-label">Cedula</label>
                                <input type="text" className="form-control" id="nameInput"
                                        placeholder="Ingrese la cedula" value={cedula} onChange={handleCedulaChange}
                                        />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formGroupInputNumeroCelular" class="form-label">Número de celular</label>
                                <input type="text" className="form-control" id="nameInput"
                                        placeholder="Ingrese el número de celular"
                                        value={numeroTelefono} onChange={handleCelularChange}
                                        />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formGroupInputNumeroOficina" class="form-label">Número de oficina</label>
                                <input type="text" className="form-control" id="nameInput"
                                        placeholder="Ingrese el número de oficiona"
                                        value={numeroOficina} onChange={handleOficinaChange}
                                        />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formGroupInputCorreo" class="form-label">Correo</label>
                                <input type="text" className="form-control" id="nameInput"
                                        placeholder="Ingrese el correo" value={correo} onChange={handleCorreoChange}
                                        />
                            </div>
                            
                            <div class="mb-3">
                                <label htmlFor="autoSizingSelect" class="form-label">Sede: </label>
                                
                            </div>
                            <div class="mb-3">
                                <select id="mySelect" value={sede} onChange={handleSedeChange}>
                                <option value="">Seleccionar</option>
                                <option value="1">San José</option>
                                <option value="2">Cartago</option>
                                <option value="3">San Carlos</option>
                                <option value="4">Alajuela</option>
                                <option value="5">Limon</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupInputCodigo" className="form-label">
                                Ingrese la foto del profesor
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
                            <button type="submit" class="btn btn-primary">Agregar </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </Fragment>
    )
}
