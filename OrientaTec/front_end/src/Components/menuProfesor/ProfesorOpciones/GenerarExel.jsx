//___________GENERAR excel para UNA sola SEDE____________________
import axios from 'axios';

const GenerarExel = async () => {
    try {
        //Obtener la Sede de la persona que hizo la consulta 
        const sede = await fetch(`${API}/getSedeUsuarioSesionActual/`, { 
            method: "GET",
            headers: {
            "Content-Type": "application/json",
        }
        });

        const response = await axios.get('/generarExcelEstudiantes', {
            responseType: 'blob', // Indicar que se espera una respuesta de tipo blob (archivo binario)
        });

        // Crear un objeto URL para el archivo descargado
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un enlace temporal y hacer clic en él para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'DatosDelCampus.xlsx');
        document.body.appendChild(link);
        link.click();

        // Eliminar el objeto URL y el enlace temporal
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error al descargar el archivo', error);
    }
};

// Pruebas SOPHY
//import React, { Fragment, useRef, useState } from 'react'

//const API = 'http://localhost:5000'; //process.env.REACT_APP_API;
//const XLSX = require('xlsx');

//Esto genera un excel con la info de TODAS las sedes
//function GenerarExel(){
    //Obtener la Sede de la persona que hizo la consulta 
   // const sede = fetch(`${API}/getSedeUsuarioSesionActual/`, { 
     //   method: "GET",
       // headers: {
        // "Content-Type": "application/json",
     //}
    //})
    //console.log("pase Sede")
    
    // Ya la función del back se encarga de crear el archivo y devolerlo
   // const wb = fetch(`${API}/generarExcelEstudiantes/${sede}`, { 
    //    method: "GET",
     //   headers: {
       //  "Content-Type": "application/json",
     //}
    //})
    //console.log("pase generar")

    // Genera el archivo de Excel y lo guarda en un objeto binario
    //const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Define el nombre del archivo
    //const fileName = 'DatosDelCampus.xlsx';

    // Crea un objeto Blob a partir del archivo binario
    //const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // Descarga el archivo usando la función window.location.href
    //const url = URL.createObjectURL(blob);
    //const link = document.createElement('a');
    //link.href = url;
    //link.download = fileName;
    //link.click();

    // Elimina el objeto URL
    //URL.revokeObjectURL(url);
//}

// Convierte una cadena en un arreglo de bytes
//function s2ab(s) {
 // const buf = new ArrayBuffer(s.length);
  //const view = new Uint8Array(buf);
  //for (let i = 0; i < s.length; i++) {
   // view[i] = s.charCodeAt(i) & 0xFF;
 // }
  //return buf;
//}

export default GenerarExel;
