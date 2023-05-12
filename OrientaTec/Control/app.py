import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from MainController import *
from datetime import datetime, timedelta

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
  #jsonLista = json.dumps(listaSalida)
  #return jsonify(jsonLista)
  return listaSalida

# modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, numeroCelular, estado)

# buscarEstudiante(self, carnet)
@app.route('/getEstudiante/<carnet>', methods=['GET'])
def buscarEstudiante(carnet):
  est = control.buscarEstudiante(carnet)
  print(est) #esto se imprime en la terminar de VS

  # if (est == None):
  #    jsonStr = "No existe"
  # else:
  #   jsonStr = json.dumps(est.__dict__)

  if (est == None):
     return jsonify("No existe")
  
  return json.dumps(est.__dict__)

  #return jsonify(jsonStr)

#PENDIENTE como las dos pendientes solamente interactuan a nivel de BD no deberia modificarse nada aca
# generarExcelEstudiantes():
@app.route('/generarExcelEstudiantes', methods=['POST'])
def generarExcelEstudiantes():
  res = control.generarExcelEstudiantes()
  return jsonify(str(res))

# cargarExcelEstudiantes()
@app.route('/cargarExcelEstudiantes', methods=['POST'])
def cargarExcelEstudiantes():
  res = control.cargarExcelEstudiantes()
  return jsonify(str(res))


#AdminProfesores
# darBajaProfesor(self, idProfesor)
@app.route('/darBajaProfesor/<idProfesor>', methods=['POST'])
def darBajaProfesor(idProfesor):
  res = control.darBajaProfesor(idProfesor)
  return jsonify(str(res))

# designarCoordinador(self, idProfesor):
@app.route('/designarCoordinador/<idProfesor>', methods=['POST'])
def designarCoordinador(idProfesor):
  res = control.designarCoordinador(idProfesor)
  return jsonify(str(res))

# modificarProfesor(self, codigo, cedula,nombre,apellido1, apellido2, sede, numeroCelular, 
#                   correoElectronico, numeroOficina,autoridad, estado):
@app.route('/modificarProfesor', methods=['POST'])
def modificarProfesor():
  print(request.json)

  #Descomentar cuando se envie el codigo y borrar el otro
  #prof = control.getProfesorCodigo(request.json['codigo'])

  prof = control.getProfesorCodigo("SJ-1")
  id = control.modificarProfesor(prof.id,request.json['cedula'], request.json['name'], 
                             request.json['apellido1'], request.json['apellido2'], request.json['sede'], 
                             request.json['numeroTelefono'], request.json['correo'], request.json['numeroOficina'],None,None)
  return jsonify(str(id))

# getProfesorCodigo(self, idProfesor):
@app.route('/getProfesorCodigo/<codigo>', methods=['GET'])
def getProfesorCodigo(codigo):
  prof = control.getProfesorCodigo(codigo)

  if (prof == None):
     return jsonify("No existe")
  
  return json.dumps(prof.__dict__)

# crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular, correoElectronico, numeroOficina,autoridad, estado):
@app.route('/crearProfesor', methods=['POST'])
def crearProfesor():
  print(request.json)

  id = control.crearProfesor(request.json['cedula'], request.json['name'], request.json['apellido1'], 
                             request.json['apellido2'], request.json['sede'], request.json['numeroTelefono'], 
                             request.json['correo'], request.json['numeroOficina'],2,1)
  
  control.agregarProfesor(control.getProfesor(id[0]))
  return jsonify(str(id))


#AdminEquipoGuia
# getEquipoGuia(self):
@app.route('/getEquipoGuia', methods=['GET'])
def getEquipoGuia():
  listaProfesores = control.getEquipoGuia()
  listaSalida = []
  for p in listaProfesores:
    listaSalida += [json.dumps(p.__dict__)]
  # jsonLista = json.dumps(listaSalida)
  # return jsonify(jsonLista)
  return listaSalida

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
@app.route('/consultarProximaActividad', methods=['GET'])
def consultarProximaActividad():
  ac = control.consultarProximaActividad()
  print(ac)

  if (ac == None):
     return jsonify("No existe")
  
  acDic = ac.__dict__

  for clave in acDic:
    print(acDic[clave], " ", type(acDic[clave]))
    if (type(acDic[clave]) == datetime):
      print(acDic[clave])
  
  return json.dumps(acDic)

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