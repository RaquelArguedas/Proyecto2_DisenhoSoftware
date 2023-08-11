import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icons from 'react-bootstrap-icons';
import { Alert, Card } from 'react-bootstrap'; // Importar el componente Alert
import './Sidebar.css'; // Archivo CSS para estilos personalizados
import { Navbar } from '../navegacion/Navbar'
import { useNavigate, useLocation  } from "react-router-dom";
import { CrearChat } from './Crearchat';
import axios from 'axios'; // Para manejo de solicitudes en el backend
const API = process.env.REACT_APP_API;

export function Sidebar() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [mensaje, setMensaje] = useState('');
  const [mostrarCrearChat, setMostrarCrearChat] = useState(false);

  const [chats, setChats] = useState([
  //{id: 1,nombreChat: 'Chat 1',mensajes: [{contenido: 'Contenido del Chat 1',fechaHora: '12/03/2021 12:00 pm',nombreUsuario: 'Carlos Rodriguez'},
   ]);
 
  const [chatSeleccionado, setChatSeleccionado] = useState(null);
  const seleccionarChat = (chat) => {
    setChatSeleccionado(chat);
  };
  const agregarGrupo = (nuevoGrupo) => {
    setChats((prevChats) => [...prevChats, nuevoGrupo]);
  };

  useEffect(() => { 
    handleGetDetalle();
    if (chats.length > 0) {
      setChatSeleccionado(chats[0]);
    }
  }, []);
  const handleGetDetalle = async () => {
    // Traer los datos y usar el setChats
    try {
      const response = await axios.get(`${API}/getMensajesChats`);
      const data = response.data;
      setChats(data);
      console.log('Data Chats:', data);  
    } catch (error) {
      console.error('Error:', error);
    }     
  };
  const handleSalirDelChat = async () => {
    if (chatSeleccionado) {
      const idChat = chatSeleccionado.id;
      try {
        const response = await axios.post(`${API}/salirChat`, {
          id: idChat
        });
        const data = response.data;
        console.log('Respuesta del backend:', data);
        // Aquí puedes realizar cualquier acción adicional después de salir del chat, si es necesario.
      } catch (error) {
        console.error('Error al llamar a la función salirChat:', error);
      }
      setChats((prevChats) => prevChats.filter((chat) => chat !== chatSeleccionado));
      setChatSeleccionado(null);
    }
  };
  

  const handleEnviarMensaje = async () => {
    const fechaHoraActual = new Date();
    const formattedFechaHora = `${fechaHoraActual.getFullYear()}-${('0' + (fechaHoraActual.getMonth() + 1)).slice(-2)}-${('0' + fechaHoraActual.getDate()).slice(-2)} ${('0' + fechaHoraActual.getHours()).slice(-2)}:${('0' + fechaHoraActual.getMinutes()).slice(-2)}:${('0' + fechaHoraActual.getSeconds()).slice(-2)}`;
    
    const nuevoMensaje = {
      id: chatSeleccionado.id,
      contenido: mensaje,
      fechaHora: formattedFechaHora, // Utiliza el formato 'YYYY-MM-DD HH:MM:SS'
      nombreUsuario: 'Usuario actual'
    };
    
      // Enviar el nuevo mensaje al backend
     try {
       const response = await fetch(`${API}/escribirMensaje`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(nuevoMensaje)
       });
       if (response.ok) {
         // El mensaje se envió correctamente al backend
         console.log('Mensaje enviado al backend');
       } else {
         // Hubo un error al enviar el mensaje al backend
         console.error('Error al enviar el mensaje al backend');
       }
     } catch (error) {
       console.error('Error al enviar el mensaje al backend', error);
    }


  
    setChats((prevChats) => {
      const chatActualizado = prevChats.map((chat) => {
        if (chat === chatSeleccionado) {
          return {
            ...chat,
            mensajes: [...chat.mensajes, nuevoMensaje]
          };
        }
        return chat;
      });
      return chatActualizado;
    });
  
    setMensaje('');
    setChatSeleccionado((prevChatSeleccionado) => {
      const chatActualizado = { ...prevChatSeleccionado };
      chatActualizado.mensajes.push(nuevoMensaje);
      return chatActualizado;
    });
  };

  return (
    <div className='container-fluid'>
      <Navbar linkInicio={state.linkMenu} />
      <div className='row'>
        <div className='col-auto min-vh-100 bg-dark'>
        <button
            className="btn custom-button"
            onClick={() => setMostrarCrearChat(true)}
          >
            Crear nuevo chat &nbsp;&nbsp;<Icons.PlusCircle />
          </button>

          <ul>
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <li
                  key={chat.id}
                  className={`chat-item ${index === 0 ? 'first-chat' : ''} ${chat === chatSeleccionado ? 'active' : ''}`}
                >
                  <a
                    className='nav-link px-2 white-text'
                    onClick={() => seleccionarChat(chat)}
                  >
                    <Icons.ChatDots />{' '}
                    <span className='ms-1 d-none d-sm-inline'>
                      {chat.nombreChat.length > 10 ? chat.nombreChat.slice(0, 10) + '...' : chat.nombreChat}
                    </span>
                  </a>
                </li>
              ))
            ) : (
              <Alert variant="warning">No hay chats en la bandeja de entrada</Alert>
            )}
          </ul>
        </div>
        <div className='col'>
          {chatSeleccionado ? (
            <>
             <div className='row'>
                <div className="col-sm-8 d-flex align-items-center">
                  <h2>{chatSeleccionado.nombreChat}</h2>
                </div>
                <div className="col-sm-4 d-flex justify-content-end align-items-center">
                  <button
                    className="btn btn-dark"
                    onClick={handleSalirDelChat}
                  >
                    Salir del chat &nbsp;&nbsp;<Icons.BoxArrowLeft  />
                  </button>
                </div>
              </div>
              {chatSeleccionado.mensajes.map((mensaje, index) => (
                <Card key={index} className="mb-2">
                  <Card.Header>
                    <strong>{mensaje.nombreUsuario}</strong> - {mensaje.fechaHora}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {mensaje.contenido}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <div className="row">
                <div className="col">
                  <textarea
                    className="w-100"
                    style={{ resize: "none", height: "5rem" }}
                    aria-label="With textarea"
                    maxLength="250"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn btn-outline-success"
                    onClick={handleEnviarMensaje}
                  >
                    <Icons.Send />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Alert variant="info">Selecciona un chat</Alert>
          )}
        </div>
      </div>
            {mostrarCrearChat && (
        <div className="crear-chat-overlay">
          <div className="crear-chat-container">
            <button
              className="close-button"
              onClick={() => setMostrarCrearChat(false)}
            > Cerrar &nbsp;&nbsp;
              <Icons.X />
            </button>
            
            
        <div className='overflow-auto'>
            <CrearChat agregarGrupo={agregarGrupo} chats={chats}/>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}