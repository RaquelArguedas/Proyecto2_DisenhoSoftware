import React, { Fragment, useState, useRef, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Navbar } from './Navbar'
import { BarraLateral } from './BarraLateral'
import { Icon } from '@iconify/react';
import { CardAviso } from './CardAviso'

const API = process.env.REACT_APP_API;

export function Avisos() {
    const state = useLocation().state;
    const [iconNotis, setIconNotis] = useState("streamline:interface-alert-alarm-bell-1-notification-vibrate-ring-sound-alarm-alert-bell-noise");
    const [iconChat, setIconChat] = useState("pepicons-pencil:text-bubble");
    const [tipNotis, setTipNotis] = useState("Notificaciones activas");
    const [tipChat, setTipChat] = useState("Notificaciones activas");
    const [avisos, setAvisos] = useState([]);
    const [usuario, setUsuario] = useState(0);

    let permiteNotis = true;
    let permiteChat = true;
    const btnNotisRef = useRef();
    const btnChatRef = useRef();

    const obtenerUsuario = async () => {
        try {
            const response = await fetch(`${API}/getUsuarioSesionActual`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();

                setUsuario(data.idUsuario)

                permiteNotis = (data.permiteNotis === 1) || (data.permiteNotis === true) || (data.permiteNotis === "True")
                permiteChat = (data.permiteChats === 1) || (data.permiteChats === true) || (data.permiteChats === "True")

                let tempNotis = []
                JSON.parse(data.notificaciones).forEach(element => {
                    tempNotis.push(JSON.parse(element))
                });

                setAvisos(tempNotis)
                cambiarAspectoBtns()
            } else {
                console.log("Error al obtener el nombre de usuario");
            }
        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }
    };

    useEffect(() => {
        obtenerUsuario()
    }, []);

    const cambiarAspectoBtns = () => {
        if (permiteNotis) {
            setIconNotis("streamline:interface-alert-alarm-bell-1-notification-vibrate-ring-sound-alarm-alert-bell-noise");
            setTipNotis("Notificaciones activas");
            btnNotisRef.current.classList.remove('btn-secondary');
            btnNotisRef.current.classList.add('btn-success');
        } else {
            setIconNotis("streamline:interface-alert-alarm-bell-off-disable-silent-notification-off-silence-alarm-bell-alert");
            setTipNotis("Notificaciones silenciadas");
            btnNotisRef.current.classList.remove('btn-success');
            btnNotisRef.current.classList.add('btn-secondary');
        }

        if (permiteChat) {
            setIconChat("pepicons-pencil:text-bubble");
            setTipChat("Chats activos");
            btnChatRef.current.classList.remove('btn-secondary');
            btnChatRef.current.classList.add('btn-success');
        } else {
            setIconChat("pepicons-pencil:text-bubble-off");
            setTipChat("Chats silenciados");
            btnChatRef.current.classList.remove('btn-success');
            btnChatRef.current.classList.add('btn-secondary');
        }
    }

    const handleNotis = async () => {
        permiteNotis = !permiteNotis;

        if(permiteNotis){
            await fetch(`${API}/activarNotis`, {
                method: 'POST'
            });
        }else{
            await fetch(`${API}/desactivarNotis`, {
                method: 'POST'
            });
        }
        
        if (permiteNotis) {
            setIconNotis("streamline:interface-alert-alarm-bell-1-notification-vibrate-ring-sound-alarm-alert-bell-noise");
            setTipNotis("Notificaciones activas");
            btnNotisRef.current.classList.remove('btn-secondary');
            btnNotisRef.current.classList.add('btn-success');
        } else {
            setIconNotis("streamline:interface-alert-alarm-bell-off-disable-silent-notification-off-silence-alarm-bell-alert");
            setTipNotis("Notificaciones silenciadas");
            btnNotisRef.current.classList.remove('btn-success');
            btnNotisRef.current.classList.add('btn-secondary');
        }
    }

    const handleChat = async () => {
        permiteChat = !permiteChat;

        if(permiteChat){
            await fetch(`${API}/activarChats`, {
                method: 'POST'
            });
        }else{
            await fetch(`${API}/desactivarChats`, {
                method: 'POST'
            });
        }

        if (permiteChat) {
            setIconChat("pepicons-pencil:text-bubble");
            setTipChat("Chats activos");
            btnChatRef.current.classList.remove('btn-secondary');
            btnChatRef.current.classList.add('btn-success');
        } else {
            setIconChat("pepicons-pencil:text-bubble-off");
            setTipChat("Chats silenciados");
            btnChatRef.current.classList.remove('btn-success');
            btnChatRef.current.classList.add('btn-secondary');
        }
    }

    const handleBorrarTodo = async () => {
        try {
            const res = await fetch(`${API}/deleteNotificacionesUsuario/${usuario}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();

        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }
        setAvisos([])
    }

    return (
        <Fragment>
            <div className="container">
                <Navbar linkInicio={state.configLinkInicio} />
                <div class="row">
                    <div class="col-sm-3">
                        <BarraLateral />
                    </div>
                    <div class="col-lg m-3 p-3 bg-light">
                        <h4>Buzón de avisos</h4>
                        <div>
                            <button onClick={handleBorrarTodo} className="btn btn-danger mx-2" data-toggle="tooltip" data-placement="bottom" title="Limpiar buzón">
                                <Icon icon="ant-design:clear-outlined" width="24" height="24" />
                            </button>
                            <button onClick={handleNotis} ref={btnNotisRef} className="btn btn-success mx-2" data-toggle="tooltip" data-placement="bottom" title={tipNotis}>
                                <Icon icon={iconNotis} width="24" height="24" />
                            </button>
                            <button onClick={handleChat} ref={btnChatRef} className="btn btn-success mx-2" data-toggle="tooltip" data-placement="bottom" title={tipChat}>
                                <Icon icon={iconChat} width="24" height="24" />
                            </button>
                        </div>
                        <div>
                            {/* se muestra el emisor, la fecha y hora en que se depositó en su buzón y el contenido de la notificación.avisos.map((aviso) =>
                                (
                                    
                                )
                                )*/}
                            {avisos.length > 0 && avisos.map((aviso) =>
                                (
                                    <CardAviso info={aviso} user={usuario} />
                                )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>



        </Fragment>
    )
}
