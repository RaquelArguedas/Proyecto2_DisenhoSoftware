import React, { useState } from 'react';
import './Crearchat.css';
import { Sidebar } from './Sidebar';
import axios from 'axios'; // Para manejo de solicitudes en el backend

export function CrearChat({agregarGrupo, chats}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [groupName, setGroupName] = useState('');

  const data = [ //Acá se debe llamar a función que obtenga info de estudiantes 
    { id: 1, carnet: '001', nombre: 'Juan' },
    { id: 2, carnet: '002', nombre: 'Pedro' },
    { id: 3, carnet: '003', nombre: 'María' },
    // Agrega más elementos de datos aquí...

  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (item) => {
    const isSelected = selectedItems.find((selectedItem) => selectedItem.id === item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = async () => { //cambio realizado
    // Validar que se hayan seleccionado al menos dos elementos
    if (selectedItems.length < 2) {
      alert('Debes seleccionar al menos dos integrantes');
      return;
    }

    // Enviar los carnets seleccionados al backend
    // Aquí puedes agregar tu lógica para enviar la solicitud al backend con los carnets seleccionados
    const miembrosSeleccionados = selectedItems.map((item) => item.carnet); //cambio Sophya
    console.log('Carnets seleccionados:', miembrosSeleccionados); //cambio Sophya
     // Crear el nuevo grupo
     const nuevoGrupo = {
      id: chats.length + 1,
      nombreChat: groupName,
      mensajes: [] // Puedes agregar mensajes iniciales si es necesario
    };
    
    try {
      // Enviar la solicitud POST al backend para crear el chat
      const response = await axios.post(`${API}/crearChat`);
      const nuevoChat = response.data;

      // Agregar el nuevo grupo a Sidebar
      agregarGrupo(nuevoChat);

      // Restablecer los valores después de crear el grupo
      setSelectedItems([]);
      setGroupName('');
    } catch (error) {
      console.log('Error al crear el chat:', error);
    }
    
    // Llamar a la función agregarGrupo para agregar el nuevo grupo a Sidebar
    //agregarGrupo(nuevoGrupo);
    // Restablecer los valores después de crear el grupo
    //setSelectedItems([]);
    //setGroupName('');
  };

  const filteredData = data.filter((item) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const carnetLowerCase = item.carnet.toLowerCase();
    const nombreLowerCase = item.nombre.toLowerCase();

    return carnetLowerCase.includes(searchTermLowerCase) || nombreLowerCase.includes(searchTermLowerCase);
  });

  return (
    <div>
      <div className='row'>
        <div className="input-group w-50 my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del grupo"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>
        <div className='class="mb-2"'>
          <button onClick={handleCreateGroup}>Crear grupo</button>
        </div>
      </div>
      <div className="input-group w-50 my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar integrante"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Nombre</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.carnet}</td>
              <td>{item.nombre}</td>
              <td>
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  checked={selectedItems.find((selectedItem) => selectedItem.id === item.id) !== undefined}
                  onChange={() => handleCheckboxChange(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4>Integrantes seleccionados:</h4>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>{item.carnet}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}