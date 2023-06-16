import React, { useState } from 'react';
import './Crearchat.css';
import { Sidebar } from './Sidebar';
import axios from 'axios'; // Para manejo de solicitudes en el backend
const API = process.env.REACT_APP_API;

export function CrearChat({ agregarGrupo, chats }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectEstudiantesI, setselectEstudiantesI] = useState([]);
  const [selectProfesorI, setselectProfesorI] = useState([]);
  const [groupName, setGroupName] = useState('');

  const [dataEstudiante, setDataEstudiante] = useState([
    //{ carnet: '001', nombre: 'Juan' },
  ]);
  const [dataProfesor, setDataProfesores] = useState([
   //  { codigo: '2021', nombre: 'Juan' },
  ]);
  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    try {
      const response = await axios.get(`${API}/getAllProfesoresFront`);
      const data = response.data;
      setDataProfesores(data);
      console.log('Data Profesores:', data);

      const responseE = await axios.get(`${API}/getAllEstudiantesFront`);
      const dataE = responseE.data;
      setDataEstudiante(dataE);
      console.log('Data Estudiantes:', dataE);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleCheckboxChange = (item) => {
    const isSelected = selectEstudiantesI.find((selectedItem) => selectedItem.carnet === item.carnet);
    if (isSelected) {
      setselectEstudiantesI(selectEstudiantesI.filter((selectedItem) => selectedItem.carnet !== item.carnet));
    } else {
      setselectEstudiantesI([...selectEstudiantesI, item]);
    }
  };
  
  const handleCheckbox = (item) => {
    const isSelected = selectProfesorI.find((selectedItem) => selectedItem.codigo === item.codigo);
    if (isSelected) {
      setselectProfesorI(selectProfesorI.filter((selectedItem) => selectedItem.codigo !== item.codigo));
    } else {
      setselectProfesorI([...selectProfesorI, item]);
    }
  };
  

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = async () => {
    // Validar que se hayan seleccionado al menos dos elementos
    if (selectProfesorI.length < 1) {
      alert('Debes seleccionar al menos un profesor como integrante');
      return;
    }

    // Enviar los carnets seleccionados al backend
    // Aquí puedes agregar tu lógica para enviar la solicitud al backend con los carnets seleccionados
    console.log('Carnets seleccionados:', selectEstudiantesI.map((item) => item.carnet));
    // Crear el nuevo grupo
    const nuevoGrupo = {
      id: chats.length + 1,
      nombreChat: groupName,
      mensajes: [] // Puedes agregar mensajes iniciales si es necesario
    };

    // Llamar a la función agregarGrupo para agregar el nuevo grupo a Sidebar
    agregarGrupo(nuevoGrupo);
    // Enviar la solicitud POST al backend para crear el chat
    try {
      await axios.post(`${API}/crearChat`, {
        nombreChat: groupName,
        estudiantes: selectEstudiantesI.map((item) => item.carnet),
        profesores: selectProfesorI.map((item) => item.codigo)
      });
    } catch (error) {
      console.error('Error al llamar a la función crearChat:', error);
    }
    // Restablecer los valores después de crear el grupo
    setselectEstudiantesI([]);
    setselectProfesorI([]);
    setGroupName('');
  };

  const filteredData = dataEstudiante.filter((item) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    //const carnetLowerCase = item.carnet.toLowerCase(); 
    const carnetLowerCase = typeof item.carnet === 'string' ? item.carnet.toLowerCase() : '';
    const nombreLowerCase = item.nombre.toLowerCase();

    return carnetLowerCase.includes(searchTermLowerCase) || nombreLowerCase.includes(searchTermLowerCase);
  });
  const filteredDat = dataProfesor.filter((item) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const codigotLowerCase = item.codigo.toLowerCase();
    const nombreLowerCase = item.nombre.toLowerCase();

    return codigotLowerCase.includes(searchTermLowerCase) || nombreLowerCase.includes(searchTermLowerCase);
  });

  return (
    <div>
      <div className='row'>
        <div className="input-group  my-3">
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
      <div className="input-group  my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar integrante"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="row">
        <div className='col'>
        <div>
        <p>Integrantes seleccionados:</p>
        <ul>
          {selectProfesorI.map((item) => (
            <li key={item.codigo}>{item.codigo} - {item.nombre}</li>
          ))}
        </ul>
        <ul>
          {selectEstudiantesI.map((item) => (
            <li key={item.carnet}>{item.carnet} - {item.nombre}</li>
          ))}
        </ul>
      </div>
        </div>
        <div className="col">
          <div>
            <p>
              Seleccione uno o más profesores:
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {filteredDat.map((item) => (
                  <tr key={item.codigo}>
                    <td>{item.codigo}</td>
                    <td>{item.nombre}</td>
                    <td>
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                        checked={selectProfesorI.find((selectedItem) => selectedItem.codigo === item.codigo) !== undefined}
                        onChange={() => handleCheckbox(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col">
          
          <div>
            <p>
              Seleccione los estudiantes integrantes:
            </p>
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
                  <tr key={item.carnet}>
                    <td>{item.carnet}</td>
                    <td>{item.nombre}</td>
                    <td>
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                        checked={selectEstudiantesI.find((selectedItem) => selectedItem.carnet === item.carnet) !== undefined}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
