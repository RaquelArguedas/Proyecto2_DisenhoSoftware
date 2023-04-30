import React, { Fragment, useState, useEffect  } from 'react'
import { Navbar } from './Navbar'
import { BarraLateral } from './BarraLateral'

export  function Configuracion() {
    const [name, setName] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [codigo, setCodigo] = useState('');
    const [cedula, setCedula] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [numeroOficina, setNumeroOficina] = useState('');
    const [correo, setCorreo] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();  
        // Aquí puedes enviar los datos a tu backend o hacer lo que necesites con ellos
      }
    const handleSearch = () => {
        // Aquí podrías agregar la lógica para buscar la información
        // y asignarla 
        setName("Adolfo")
        setApellido1("Corrales")
        setCodigo("bg123")
        setApellido2('Perez')
        setCedula(11230034)
        setNumeroTelefono(87655432)
        setNumeroOficina(22341265)
        setCorreo('Adolfo23@estudiantec.cr')
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
    const handleCodigoChange = (event) => {
        setCodigo(event.target.value);
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
                <Navbar />
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
                                        value={codigo} onChange={handleCodigoChange}  disabled />
                                        <label for="floatingInputDisabled">Código</label>
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
                                        <label htmlFor="formGroupInputCedula" class="form-label">Cedula</label>
                                        <input type="text" className="form-control" id="nameInput"
                                                placeholder="Ingrese su cedula" value={cedula} onChange={handleCedulaChange}
                                                disabled/>
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
