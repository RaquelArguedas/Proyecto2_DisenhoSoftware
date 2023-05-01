import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
    let navigate = useNavigate();

    const gotoMenu = () => {
        navigate('/asistente', {});
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
                            <input id="txtCarnet" type="text" className="form-control" />
                        </div>

                        <div className="input-group w-50 my-3 mx-auto">
                            <span className="input-group-text w-25" >Contraseña</span>
                            <input id="txtCarnet" type="password" className="form-control" />
                        </div>

                        <div className="row w-50 mx-auto">
                            <div className="col">
                                <button onClick={gotoMenu} className="btn btn-primary">Ingresar</button>
                            </div>
                            <div className="col">
                                <button className="btn btn-outline-secondary">Olvidé mi contraseña</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}