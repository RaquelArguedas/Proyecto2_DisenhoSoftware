import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from MainController import *
from SingletonSesionActual import *
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

# modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, numeroCelular, 
# estado)
@app.route('/modificarEstudiante', methods=['POST'])
def modificarEstudiante():
  print(request.json)

  #Descomentar cuando se envie el carnet y borrar el otro
  # id = control.modificarEstudiante(request.json['carnet'], request.json['name'], 
  #                            request.json['apellido1'], request.json['apellido2'], request.json['sede'], 
  #                           request.json['correo'], request.json['numeroTelefono'],  request.json['estado'])
  
  id = control.modificarEstudiante(20198, request.json['name'], 
                             request.json['apellido1'], request.json['apellido2'], request.json['sede'], 
                            request.json['correo'], request.json['numeroTelefono'],  request.json['estado'])
  
  return jsonify(str(id))

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
  control.bitacoraEquipoGuia(datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario(), "se dio de baja al id =" + str(idProfesor))
  return jsonify(str(res))

# designarCoordinador(self, idProfesor):
@app.route('/designarCoordinador/<idProfesor>', methods=['POST'])
def designarCoordinador(idProfesor):
  res = control.designarCoordinador(idProfesor)
  control.bitacoraEquipoGuia(datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario(), "se designo al coordinador con id =" + str(idProfesor))
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
  control.bitacoraEquipoGuia(datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario(), "nuevo profesor con id=" + str(id[0]))
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


#AdminActividades
# def verActividad(self, idActividad):
#     return self.controlActividades.verActividad(idActividad)

# def modificarActividad(self, idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
#                 horaFin, recordatorio,responsables, medio, enlace,estado):
@app.route('/modificarActividad', methods=['POST'])
def modificarActividad():
  #print(request.json)

  #Descomentar cuando se envie el codigo y borrar el otro
  #ac = control.verActividad(int(request.json['idActividad']))

  ac = control.verActividad(1)
  
  # id = control.modificarActividad(ac.idActividad,request.json['nombreActividad'], int(request.json['tipoActividad']), 
  #                            request.json['fechaActividad'], request.json['horaInicio'], request.json['horaFin'], 
  #                            int(request.json['recordatorio']), int(request.json['medio']),
  #                            request.json['enlace'],int(request.json['estado']))

  id = control.modificarActividad(ac.idActividad,'nonname', 1, 
                             datetime.now().date(), datetime.now().time(), datetime.now().time(), 
                             1, 1,'enlace',1)
  
  print(id)
  
  return jsonify(str(id))

# def cancelarActividad(self, idActividad):
@app.route('/cancelarActividad/<idActividad>', methods=['POST'])
def cancelarActividad(idActividad):

  res = control.cancelarActividad(int(idActividad))
  control.bitacoraActividad(int(idActividad),datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario(), "se cancelo la actividad con id = " + str(idActividad))
  print(res)
  return str(res)

# def crearActividad(self, nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
#                    recordatorio, medio,enlace, estado, ultimaModificacion):
@app.route('/crearActividad', methods=['POST'])
def crearActividad():
  #print(request.json)

  #borrar este y descomentar el otro con los JSON adecuados
  # id = control.crearActividad(request.json['nombre'], request.json['tipo'], request.json['fecha'], 
  #                             request.json['horaInicio'], request.json['horaFin'], request.json['recordatorio'], 
  #                             request.json['medio'], request.json['enlace'], request.json['estado'])
  
  
  responsablesNuevos = [] #eliminar cuando envien la lista de responsables
  id = control.crearActividad("nombre", 1, datetime.now().date(), 
                              datetime.now().time().strftime('%H:%M'), datetime.now().time().strftime('%H:%M'),
                              1,responsablesNuevos, 1, "enlace", 1)
  print(id)
  
  control.bitacoraActividad(id[0], datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario(), "nueva actividad")
  return jsonify(str(id))

# def cambiarEstado(self, idActividad, idEstado):
@app.route('/cambiarEstado/<idActividad>/<idEstado>', methods=['POST'])
def cambiarEstado(idActividad, idEstado):
  res = control.cambiarEstado(idActividad, idEstado)
  control.bitacoraActividad(int(idActividad),datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario(), "se cambio el estado de la actividad con id = " + str(idActividad))
  print(res)
  return str(res)

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
        

#AdminPlanActividades
# def consultarProximaActividad(self):
@app.route('/consultarProximaActividad', methods=['GET'])
def consultarProximaActividad():
  ac = control.consultarProximaActividad()
  print(ac)

  if (ac == None):
     return jsonify("No existe")       

  return actividadToJSON(ac)

# def consultarActividades(self):
@app.route('/consultarActividades', methods=['GET'])
def consultarActividades():
  actividades = control.consultarActividades()
  listaSalida = []

  for ac in actividades:
    listaSalida += [actividadToJSON(ac)]
  return listaSalida

@app.route('/consultarActividadesEstado/<estado>', methods=['GET'])
def consultarActividadesEstado(estado):
  actividades = control.consultarActividadesEstado(estado)
  listaSalida = []

  for ac in actividades:
    listaSalida += [actividadToJSON(ac)]

  return listaSalida

# def definirPlanActividades(self, idPlan, listaActividades):
@app.route('/definirPlanActividades/<idActividad>', methods=['POST'])
def definirPlanActividades(idActividad):

  control.definirPlanActividades(1, [control.verActividad(int(idActividad))])
  return "Definido"

#funcion auxiliar que convierte una actividad a un JSON aceptable
def actividadToJSON(ac):
  acDic = ac.__dict__

  for clave in acDic:
    if (type(acDic[clave]) != int and type(acDic[clave]) != str):
      acDic[clave] = str(acDic[clave])
    if (type(acDic[clave]) == list):
      for p in acDic[clave]:
        listaSalida += [json.dumps(p.__dict__)]
      acDic[clave] = listaSalida

  return json.dumps(acDic)

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