import axios from 'axios';

export function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  console.log('El archivo se agregó al objeto formData:', formData.get('file'));
  // Enviar el archivo al backend usando una función de envío o una librería como axios
  // axios.post('/upload', formData)
  //   .then(() => console.log('El archivo se ha subido con éxito'))
  //   .catch(() => console.error('Ocurrió un error al subir el archivo'));
}