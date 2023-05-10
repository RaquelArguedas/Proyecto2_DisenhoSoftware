import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from MainController import *

# Instantiation
app = Flask(__name__)

# Settings
CORS(app)
control = MainController()

# Routes

#AdminEstudiantes
# consultarEstudiantes(self, ordenamiento):
@app.route('/consultarEstudiantes/<ordenamiento>', methods=['GET'])
def consultarEstudiantes(ordenamiento):
  listaEstudiantes = control.consultarEstudiantes(int(ordenamiento))
  listaSalida = []
  for e in listaEstudiantes:
    listaSalida += [json.dumps(e.__dict__)]
  jsonLista = json.dumps(listaSalida)
  return jsonify(jsonLista)

# modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, numeroCelular, estado)

# buscarEstudiante(self, carnet)
@app.route('/getEstudiante/<carnet>', methods=['GET'])
def buscarEstudiante(carnet):
  est = control.buscarEstudiante(carnet)
  print(est) #esto se imprime en la terminar de VS

  if (est == None):
     jsonStr = "No existe"
  else:
    jsonStr = json.dumps(est.__dict__)

  return jsonify(jsonStr)

#PENDIENTE generarExcelEstudiantes():



#AdminProfesores
# def darBajaProfesor(self, idProfesor):
#     return self.controlProfesor.darBajaProfesor(idProfesor)

# def designarCoordinador(self, idProfesor):
#     return self.controlProfesor.designarCoordinador(idProfesor)

# def modificarProfesor(self, codigo, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
#                     correoElectronico, numeroOficina,autoridad, estado):
#     return self.controlProfesor.modificarProfesor(codigo, cedula,nombre,apellido1, apellido2, sede, 
#                                            numeroCelular, correoElectronico, numeroOficina,
#                                            autoridad, estado)

# def getProfesor(self, idProfesor):
#     return self.controlProfesor.getProfesor(idProfesor)

# crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular, correoElectronico, numeroOficina,autoridad, estado):
@app.route('/crearProfesor', methods=['POST'])
def crearProfesor():
  print(request.json)

  #descomentar cuando se envie bien la sede
  # id = control.crearProfesor(request.json['cedula'], request.json['name'], request.json['apellido1'], 
  #                            request.json['apellido2'], request.json['sede'], request.json['numeroTelefono'], 
  #                            request.json['correo'], request.json['numeroOficina'],2,1)

  id = control.crearProfesor(request.json['cedula'], request.json['name'], request.json['apellido1'], 
                             request.json['apellido2'], request.json['sede'], request.json['numeroTelefono'], 
                             request.json['correo'], request.json['numeroOficina'],2,1)
  
  control.agregarProfesor(control.getProfesor(id[0]))
  return jsonify(str(id))


#AdminEquipoGuia
# def agregarProfesor(self, profesor, idEquipoGuia):
#     return self.controlEquipoGuia.agregarProfesor(profesor, idEquipoGuia)

# def getEquipoGuia(self):
#     return self.controlEquipoGuia.getEquipoGuia()

# def bitacoraEquipoGuia(self, fecha, hora, idAutor, descripcion):
#     return self.controlEquipoGuia.bitacoraEquipoGuia(fecha, hora, idAutor, descripcion)
  



#AdminActividades
# def verActividad(self, idActividad):
#     return self.controlActividades.verActividad(idActividad)

# def modificarActividad(self, idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
#                 horaFin, recordatorio,responsables, medio, enlace,estado):
#     return self.controlActividades.modificarActividad(idActividad, nombreActividad,tipoActividad, 
#                                                       fechaActividad, horaInicio,horaFin, recordatorio,
#                                                       responsables, medio, enlace,estado)

# def cancelarActividad(self, idActividad):
#     return self.controlActividades.cancelarActividad(idActividad)

# def crearActividad(self, nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
#                    recordatorio, medio,enlace, estado, ultimaModificacion):
#     return self.controlActividades.crearActividad(nombreActividad, tipoActividad, fechaActividad,
#                                                   horaInicio, horaFin, recordatorio, medio,enlace, 
#                                                   estado, ultimaModificacion)

# def cambiarEstado(self, idActividad, idEstado):
#     return self.controlActividades.cambiarEstado(idActividad, idEstado)

# def getDetalleActividad(self, idActividad):
#     return self.controlActividades.getDetalleActividad(idActividad)

# def escribirComentario(self, idActividad,autor,fechaHora, contenido, idComentarioPadre):
#     return self.controlActividades.escribirComentario(idActividad,autor,fechaHora, contenido,
#                                                      idComentarioPadre)

# def finalizarActividad(self, idActividad,linkGrabacion):
#     return self.controlActividades.finalizarActividad(idActividad,linkGrabacion)

# def agregarResponsablesActividad(self, idActividad, responsablesNuevos):
#     return self.controlActividades.agregarResponsablesActividad(idActividad, responsablesNuevos)

# def quitarResponsablesActividad(self, idActividad, responsablesEliminados):
#     return self.controlActividades.quitarResponsablesActividad(idActividad, responsablesEliminados)
        
# def bitacoraActividad(self, idActividad, fecha, hora, idAutor, descripcion):
#     return self.controlActividades.bitacoraActividad(idActividad, fecha, hora, idAutor, descripcion)
  

#AdminPlanActividades
# def consultarProximaActividad(self):
#     return self.controlPlanActividades.consultarProximaActividad()

# def consultarActividades(self):
#     return self.controlPlanActividades.consultarActividades()

# def definirPlanActividades(self, idPlan, listaActividades):
#     self.controlPlanActividades.definirPlanActividades(idPlan, listaActividades)

# def crearPlanActividades(self, anno):
#     return self.controlPlanActividades.crearPlanActividades(anno)
  
      

#AdminUsuario
# def exists(self, correo, contrasenha):
#     return self.controlUsuario.exists(correo, contrasenha)

# def modificarUsuario(self, idUsuario, correoElectronico, contrasenha, idRol):
#     return self.controlUsuario.modificarUsuario(idUsuario, correoElectronico, contrasenha, idRol)


# def crearUsuario(self, correoElectronico, contrasenha, idRol):
#     return self.controlUsuario.crearUsuario(correoElectronico, contrasenha, idRol)

# def getUsuario(self, idUsuario):
#     return self.controlUsuario.getUsuario(idUsuario)








# inicia el servidor
if __name__ == "__main__":
    app.run(debug=True)