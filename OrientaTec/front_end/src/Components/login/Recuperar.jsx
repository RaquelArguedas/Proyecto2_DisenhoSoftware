import React, { Fragment, useState  } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import useDigitInput from 'react-digit-input';
import Swal from 'sweetalert2';

const API = process.env.REACT_APP_API;

export function Recuperar() {
    const {state} = useLocation();
    let navigate = useNavigate();
    const [value, onChange] = React.useState('');
    const [nuevaContrasenha, setNuevaContrasena] = useState('');
    const [confirmarContrasenha, setConfirmarContrasena] = useState('');
    // const [d0, setD0] = useState('');
    // const [d1, setD1] = useState('');
    // const [d2, setD2] = useState('');
    // const [d3, setD3] = useState('');
    // const [d4, setD4] = useState('');
    // const [d5, setD5] = useState('');

    const handleNuevaContrasenhaChange = (event) => {
        setNuevaContrasena(event.target.value);
    };

    const handleConfirmarContrasenhaChange = (event) => {
        setConfirmarContrasena(event.target.value);
    };

    // const handleD0Change = (event) => {
    //     setD0(event.target.value);
    // };
    // const handleD1Change = (event) => {
    //     setD1(event.target.value);
    // };
    // const handleD2Change = (event) => {
    //     setD2(event.target.value);
    // };
    // const handleD3Change = (event) => {
    //     setD3(event.target.value);
    // };
    // const handleD4Change = (event) => {
    //     setD4(event.target.value);
    // };
    // const handleD5Change = (event) => {
    //     setD5(event.target.value);
    // };


    const digits = useDigitInput({
        acceptedCharacters: /^[0-9]$/,
        length: 6,
        value,
        onChange,
    });

    const gotoLogin = () => {
        //console.log(typeof parseInt(digits[0].value, 10), digits[0].value)
        //console.log(typeof state.d0['d0'], state.d0['d0'])
        //console.log(digits[0].value == state.d0['d0'])

        if (/^\d{8}$/.test(nuevaContrasenha)) {
            if (digits[0].value == state.d0['d0'] &&
                digits[1].value == state.d1['d1'] &&
                digits[2].value == state.d2['d2'] &&
                digits[3].value == state.d3['d3'] &&
                digits[4].value == state.d4['d4'] &&
                digits[5].value == state.d5['d5']) {

                // confirma que la nuevaContrasenha y su confirmacion sean iguales
                console.log(nuevaContrasenha)
                console.log(confirmarContrasenha)
                console.log(confirmarContrasenha == nuevaContrasenha)

                if (confirmarContrasenha != '' && confirmarContrasenha == nuevaContrasenha){
                    //envía la peticion al bakcend
                    fetch(`${API}/modificarUsuarioContrasenha`, {  
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ nuevaContrasenha })
                    })

                    //indica que se cambió la contraseña
                    Swal.fire({
                        icon: 'info',
                        title: 'Codigo correcto!' ,
                        text: `Cambio de contraseña exitoso. Vuelva a iniciar sesión`,
                    });
                    
                    //devuelve al menu principal
                    navigate('/', {});
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Contraseña incorrecta!' ,
                        text: `Las contraseñas deben coincidir y no pueden ser vacias.`,
                    });
                }           
                
            }else{ // si no es el codigo da error
                Swal.fire({
                    icon: 'error',
                    title: 'Codigo incorrecto!' ,
                    text: `No se puede reestablecer la contraseña, el código no conincide con el enviado.`,
                });
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Contraseña inaceptada!' ,
                text: `La contraseña debe ser un número de ocho digitos.`,
            });
        }

    }

    //console.log(state.d0['d0'])
    

    return (
        <Fragment>
            <div style={{ marginTop: "10%" }}>
                <div className="container w-50 h-100">
                    <div className="mx-auto my-auto">


                        <h3 className="text-center">Recuperación de contraseña</h3>

                        <div className="input-group my-3 mx-auto" style={{ width: "60%" }}>
                            <p>Hemos enviado a su correo la clave de recuperación para su cuenta.
                                Escriba su nueva contraseña y digite la clave enviada.
                                Si no recuerda su correo, contacte al asistente de su campus o centro de estudio.</p>
                        </div>

                        <div className="input-group my-3 mx-auto" style={{ width: "50%" }}>
                            <span className="input-group-text" style={{ width: "40%" }}>Nueva contraseña</span>
                            <input id="txtNuevaContra1" type="password" className="form-control" value={nuevaContrasenha}
                            onChange={handleNuevaContrasenhaChange}/>
                        </div>

                        <div className="input-group my-3 mx-auto" style={{ width: "50%" }}>
                            <span className="input-group-text" style={{ width: "40%" }}>Confirmar contraseña</span>
                            <input id="txtNuevaContra2" type="password" className="form-control" value={confirmarContrasenha}
                            onChange={handleConfirmarContrasenhaChange}/>
                        </div>

                        <div className="input-group my-3 mx-auto" style={{ width: "50%" }}>
                            <span className="input-group-text" style={{ width: "40%" }}>Clave de recuperación</span>
{/* 
                            <input className="form-control" inputMode="decimal" {...digits[0]} value={d0} onChange={handleD0Change}/>
                            <input className="form-control" inputMode="decimal" {...digits[1]} value={d1} onChange={handleD1Change}/>
                            <input className="form-control" inputMode="decimal" {...digits[2]} value={d2} onChange={handleD2Change}/>
                            <input className="form-control" inputMode="decimal" {...digits[3]} value={d3} onChange={handleD3Change}/>
                            <input className="form-control" inputMode="decimal" {...digits[4]} value={d4} onChange={handleD4Change}/>
                            <input className="form-control" inputMode="decimal" {...digits[5]} value={d5} onChange={handleD5Change}/> */}
                            
                            <input className="form-control" inputMode="decimal" {...digits[0]}/>
                            <input className="form-control" inputMode="decimal" {...digits[1]}/>
                            <input className="form-control" inputMode="decimal" {...digits[2]}/>
                            <input className="form-control" inputMode="decimal" {...digits[3]}/>
                            <input className="form-control" inputMode="decimal" {...digits[4]}/>
                            <input className="form-control" inputMode="decimal" {...digits[5]}/>
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