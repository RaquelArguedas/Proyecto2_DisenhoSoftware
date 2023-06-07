import React, { Fragment, useState, useRef } from 'react'
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
    let permiteNotis = true;
    let permiteChat = true;
    const btnNotisRef = useRef();
    const btnChatRef = useRef();

    const handleNotis = () => {
        permiteNotis = !permiteNotis;

        if (permiteNotis) {
            setIconNotis("streamline:interface-alert-alarm-bell-1-notification-vibrate-ring-sound-alarm-alert-bell-noise");
            setTipNotis("Notificaciones activas");
            btnNotisRef.current.classList.remove('btn-secondary');
            btnNotisRef.current.classList.add('btn-success');
        }else{
            setIconNotis("streamline:interface-alert-alarm-bell-off-disable-silent-notification-off-silence-alarm-bell-alert");
            setTipNotis("Notificaciones silenciadas");
            btnNotisRef.current.classList.remove('btn-success');
            btnNotisRef.current.classList.add('btn-secondary');
        }
    }

    const handleChat = () => {
        permiteChat = !permiteChat;

        if (permiteChat) {
            setIconChat("pepicons-pencil:text-bubble");
            setTipChat("Chats activos");
            btnChatRef.current.classList.remove('btn-secondary');
            btnChatRef.current.classList.add('btn-success');
        }else{
            setIconChat("pepicons-pencil:text-bubble-off");
            setTipChat("Chats silenciados");
            btnChatRef.current.classList.remove('btn-success');
            btnChatRef.current.classList.add('btn-secondary');
        }
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
                            <button className="btn btn-primary mx-2" data-toggle="tooltip" data-placement="bottom" title="Limpiar leídas">
                                <Icon icon="ant-design:clear-outlined" width="24" height="24" />
                            </button>
                            <button className="btn btn-danger mx-2" data-toggle="tooltip" data-placement="bottom" title="Borrar todo">
                                <Icon icon="uiw:delete" width="24" height="24" />
                            </button>
                            <button onClick={handleNotis} ref={btnNotisRef} className="btn btn-success mx-2" data-toggle="tooltip" data-placement="bottom" title={tipNotis}>
                                <Icon icon={iconNotis} width="24" height="24" />
                            </button>
                            <button onClick={handleChat} ref={btnChatRef} className="btn btn-success mx-2" data-toggle="tooltip" data-placement="bottom" title={tipChat}>
                                <Icon icon={iconChat} width="24" height="24" />
                            </button>
                        </div>
                        <div>
                            {/* se muestra el emisor, la fecha y hora en que se depositó en su buzón y el contenido de la notificación.*/}
                            <CardAviso/>
                            <CardAviso/>
                            <CardAviso/>
                            <CardAviso/>
                            <CardAviso/>
                        </div>
                    </div>
                </div>
            </div>



        </Fragment>
    )
}
