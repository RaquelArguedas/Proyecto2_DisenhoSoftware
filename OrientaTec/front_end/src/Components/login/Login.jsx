import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert';

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
        const boolValue = res === "true"; //convierte el texto a un valor booleando disponible para el frontend
        
        console.log(typeof boolValue)


        if (boolValue === false){ 
            console.log("bomba")
        }
        else{ return }

        //navigate(usuarioVista, {});
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