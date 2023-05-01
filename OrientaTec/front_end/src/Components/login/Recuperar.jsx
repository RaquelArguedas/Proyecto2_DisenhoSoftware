import React, { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import useDigitInput from 'react-digit-input';

export function Recuperar() {
    let navigate = useNavigate();
    const [value, onChange] = React.useState('');

    const digits = useDigitInput({
        acceptedCharacters: /^[0-9]$/,
        length: 6,
        value,
        onChange,
    });

    const gotoLogin = () => {
        navigate('/', {});
    }

    return (
        <Fragment>
            <div style={{ marginTop: "10%" }}>
                <div className="container w-50 h-100">
                    <div className="mx-auto my-auto">


                        <h3 className="text-center">Recuperación de contraseña</h3>

                        <div className="input-group my-3 mx-auto" style={{ width: "60%" }}>
                            <p>Hemos enviado a correo@mail.com la clave de recuperación para su cuenta.
                                Escriba su nueva contraseña y digite la clave enviada.
                                Si no recuerda su correo, contacte al asistente de su campus o centro de estudio.</p>
                        </div>

                        <div className="input-group my-3 mx-auto" style={{ width: "50%" }}>
                            <span className="input-group-text" style={{ width: "40%" }}>Nueva contraseña</span>
                            <input id="txtNuevaContra1" type="password" className="form-control" />
                        </div>

                        <div className="input-group my-3 mx-auto" style={{ width: "50%" }}>
                            <span className="input-group-text" style={{ width: "40%" }}>Confirmar contraseña</span>
                            <input id="txtNuevaContra2" type="password" className="form-control" />
                        </div>

                        <div className="input-group my-3 mx-auto" style={{ width: "50%" }}>
                            <span className="input-group-text" style={{ width: "40%" }}>Clave de recuperación</span>

                            <input className="form-control" inputMode="decimal" {...digits[0]} />
                            <input className="form-control" inputMode="decimal" {...digits[1]} />
                            <input className="form-control" inputMode="decimal" {...digits[2]} />
                            <input className="form-control" inputMode="decimal" {...digits[3]} />
                            <input className="form-control" inputMode="decimal" {...digits[4]} />
                            <input className="form-control" inputMode="decimal" {...digits[5]} />
                        </div>

                        <div className="input-group my-3 mx-auto">
                                <button onClick={gotoLogin} className="btn btn-success mx-auto">Cambiar contraseña</button>
                            </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}