//___________GENERAR excel para TODAS sola SEDES____________________


// Pruebas SOPHY , ignorar 
import React, { Fragment, useRef, useState } from 'react'

const API = 'http://localhost:5000'; //process.env.REACT_APP_API;
const XLSX = require('xlsx');

//Esto genera un excel con la info de TODAS las sedes
function GenerarExelPorCampus(){
    // Ya la función del back se encarga de crear el archivo y devolerlo
    const wb = fetch(`${API}/generarExcelEstudiantes/${sede}`, { 
        method: "GET",
        headers: {
         "Content-Type": "application/json",
     }
    })

    // Genera el archivo de Excel y lo guarda en un objeto binario
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Define el nombre del archivo
    const fileName = 'DatosPorCampus.xlsx';

    // Crea un objeto Blob a partir del archivo binario
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // Descarga el archivo usando la función window.location.href
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    // Elimina el objeto URL
    URL.revokeObjectURL(url);
}

// Convierte una cadena en un arreglo de bytes
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}

export default GenerarExelPorCampus;