//__________________Genera excel de TODAS sola SEDES________________________
const API = process.env.REACT_APP_API;
const XLSX = require('xlsx'); //dk


async function GenerarExelPorCampus(){
  console.log('GENERAR EXCEL POR CAMPUS');

  // Obtener la LISTA de estudiantes de la SEDE
  const listaEstResponseSJ = await fetch(`${API}/generarExcelEstudiantes/${1}`)
  const listaEstDataSJ = await listaEstResponseSJ.json();

  const listaEstResponseCA = await fetch(`${API}/generarExcelEstudiantes/${2}`)
  const listaEstDataCA = await listaEstResponseCA.json();

  const listaEstResponseSC = await fetch(`${API}/generarExcelEstudiantes/${3}`)
  const listaEstDataSC = await listaEstResponseSC.json();

  const listaEstResponseAL = await fetch(`${API}/generarExcelEstudiantes/${4}`)
  const listaEstDataAL = await listaEstResponseAL.json();

  const listaEstResponseLI = await fetch(`${API}/generarExcelEstudiantes/${5}`)
  const listaEstDataLI = await listaEstResponseLI.json();
  //console.log(listaEstData);

  // Crea un nuevo libro de trabajo
  const wb = XLSX.utils.book_new();

  // Crea una hoja de trabajo con los datos de la lista de estudiantes
  const wsSJ = XLSX.utils.aoa_to_sheet(listaEstDataSJ);
  const wsCA = XLSX.utils.aoa_to_sheet(listaEstDataCA);
  const wsSC = XLSX.utils.aoa_to_sheet(listaEstDataSC);
  const wsAL = XLSX.utils.aoa_to_sheet(listaEstDataAL);
  const wsLI = XLSX.utils.aoa_to_sheet(listaEstDataLI);

  // Agrega la hoja de trabajo al libro de trabajo
  XLSX.utils.book_append_sheet(wb, wsSJ, 'SJ');
  XLSX.utils.book_append_sheet(wb, wsCA, 'CA');
  XLSX.utils.book_append_sheet(wb, wsSC, 'SC');
  XLSX.utils.book_append_sheet(wb, wsAL, 'AL');
  XLSX.utils.book_append_sheet(wb, wsLI, 'LI');

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