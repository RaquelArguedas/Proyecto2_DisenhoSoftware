const XLSX = require('xlsx');

function GenerarExel(){
  // Crea un nuevo libro de trabajo
  const wb = XLSX.utils.book_new();

  // Crea una hoja de trabajo con datos de ejemplo
  const wsData = [['Nombre', 'Apellido'], ['Juan', 'Pérez'], ['María', 'Gómez']];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Agrega la hoja de trabajo al libro de trabajo
  XLSX.utils.book_append_sheet(wb, ws, 'Hoja 1');

  // Genera el archivo de Excel y lo guarda en un objeto binario
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

  // Define el nombre del archivo
  const fileName = 'DatosDelCampus.xlsx';

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

export default GenerarExel;