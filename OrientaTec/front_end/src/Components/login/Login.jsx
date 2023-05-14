import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const API = process.env.REACT_APP_API;

export function Login() {
    let navigate = useNavigate();
    let usuarioVista;

    const refTxtUsuario = useRef()
    const refTxtContrasenhaa = useRef()

    const gotoMenu = async() => {
        const correo = refTxtUsuario.current.value;
        const contrasenha = refTxtContrasenhaa.current.value;

        const res = await fetch(`${API}/exists/${correo}/${contrasenha}`, {  
            method: "GET"
          });
        const data = await res.json(); // Esperar a que la promesa se resuelva y obtener el resultado

        // console.log(data);

        // if (data === true) {
        // console.log("true");
        // } else {
        // console.log("false");
        // }

        // const boolValue = res === "true"; //convierte el texto a un valor booleando disponible para el frontend
        
        console.log(correo,  contrasenha, data)


        if (data === false){ 
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'El correo no corresponde a la contraseña.',
              });
        }
        else{ 
            fetch(`${API}/iniciarSesion/${correo}/${contrasenha}`, {  
                method: "POST"
            });
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
        }

        navigate(usuarioVista, {});
        
    }

    const gotoRecuperar = () => {
        navigate('/recuperar', {});
    }

    return (
        <Fragment>
            <div style={{marginTop: "10%"}}>
                <div className="container w-50 h-100">
                    <div className="mx-auto my-auto">
                        <img src="./orientatec-logo.jpg" width="200" className="mx-auto d-block"/>

                        <h1 className="text-center">Inicio de sesión</h1>

                        <div className="input-group w-50 my-3 mx-auto">
                            <span className="input-group-text w-25" >Usuario</span>
                            <input ref={refTxtUsuario} id="txtUsuario" type="text" className="form-control" />
                        </div>

                        <div className="input-group w-50 my-3 mx-auto">
                            <span className="input-group-text w-25" >Contraseña</span>
                            <input ref={refTxtContrasenhaa} id="txtContrasena" type="password" className="form-control" />
                        </div>

                        <div className="row w-50 mx-auto">
                            <div className="col">
                                <button onClick={gotoMenu} className="btn btn-primary">Ingresar</button>
                            </div>
                            <div className="col">
                                <button onClick={gotoRecuperar} className="btn btn-outline-secondary">Olvidé mi contraseña</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}