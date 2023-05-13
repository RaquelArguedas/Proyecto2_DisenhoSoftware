import axios from 'axios';

export function uploadFile(file) { // Define una función llamada uploadFile que recibe un archivo como argumento
  const formData = new FormData(); // Crear un objeto FormData que puede ser utilizado para enviar datos al servidor
  formData.append('file', file); // Agregar el archivo al objeto FormData con la clave 'file'
  console.log('El archivo se agregó al objeto formData:', formData.get('file')); // Mostrar en la consola el archivo agregado al objeto FormData
  // Enviar el archivo al backend usando una función de envío o una librería como axios
  // axios.post('/upload', formData)
  //   .then(() => console.log('El archivo se ha subido con éxito'))
  //   .catch(() => console.error('Ocurrió un error al subir el archivo'));
  // La función axios.post() se utiliza comúnmente para enviar archivos al backend. 
  // Esta función enviaría el archivo al servidor a través de una solicitud POST a la ruta '/upload'.
  // Si la solicitud tiene éxito, se muestra un mensaje en la consola indicando que el archivo se ha subido correctamente.
  // Si la solicitud falla, se muestra un mensaje en la consola indicando que se ha producido un error.
}
