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

  id = control.modificarEstudiante(request.json['carnet'] if request.json['carnet'] != '' else None, 
                                  request.json['name'] if request.json['name'] != '' else None, 
                                  request.json['apellido1'] if request.json['apellido1'] != '' else None, 
                                  request.json['apellido2'] if request.json['apellido2'] != '' else None, 
                                  request.json['sede'] if request.json['sede'] != '' else None, 
                                  request.json['correo'] if request.json['correo'] != '' else None, 
                                  request.json['numeroTelefono'] if request.json['numeroTelefono'] != '' else None,  
                                  request.json['estado'] if request.json['estado'] != '' else None)
  
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
                             SingletonSesionActual().getUsuario().idUsuario, "se dio de baja al id =" + str(idProfesor))
  return jsonify(str(res))

# designarCoordinador(self, idProfesor):
@app.route('/designarCoordinador/<idProfesor>', methods=['POST'])
def designarCoordinador(idProfesor):
  res = control.designarCoordinador(idProfesor)
  control.bitacoraEquipoGuia(datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "se designo al coordinador con id =" + str(idProfesor))
  return jsonify(str(res))

# modificarProfesor(self, codigo, cedula,nombre,apellido1, apellido2, sede, numeroCelular, 
#                   correoElectronico, numeroOficina,autoridad, estado):
@app.route('/modificarProfesor', methods=['POST'])
def modificarProfesor():
  print(request.json)

  prof = control.getProfesorCodigo(request.json['codigo'])
  id = control.modificarProfesor(prof.id,request.json['cedula'], request.json['name'], 
                             request.json['apellido1'], request.json['apellido2'], request.json['sede'], 
                             request.json['numeroTelefono'], request.json['correo'], request.json['numeroOficina'],None,request.json['estado'])
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
                             SingletonSesionActual().getUsuario().idUsuario, "nuevo profesor con id=" + str(id[0]))
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
@app.route('/verActividad/<idActividad>', methods=['GET'])
def verActividad(idActividad):
  ac = control.verActividad(idActividad)
  print(ac)

  if (ac == None):
     return jsonify("No existe")       

  return actividadToJSON(ac)

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
                             SingletonSesionActual().getUsuario().idUsuario, "se cancelo la actividad con id = " + str(idActividad))
  print(res)
  return str(res)

# def crearActividad(self, nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
#                    recordatorio, medio,enlace, estado, ultimaModificacion):
@app.route('/crearActividad', methods=['POST'])
def crearActividad():
  #print(request.json)

  id = control.crearActividad(request.json['nombre'], request.json['tipo'], request.json['fecha'], 
                               request.json['horaInicio'], request.json['horaFin'], request.json['recordatorio'], 
                               request.json['responsables'], request.json['medio'], request.json['enlace'], request.json['estado'])
  print(id)
  
  control.bitacoraActividad(id[0], datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "nueva actividad")
  return jsonify(str(id))

# def cambiarEstado(self, idActividad, idEstado):
@app.route('/cambiarEstado/<idActividad>/<idEstado>', methods=['POST'])
def cambiarEstado(idActividad, idEstado):
  res = control.cambiarEstado(idActividad, idEstado)
  control.bitacoraActividad(int(idActividad),datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "se cambio el estado de la actividad con id = " + str(idActividad))
  print(res)
  return str(res)

# def getDetalleActividad(self, idActividad):
@app.route('/getDetalleActividad/<idActividad>', methods=['GET'])
def getDetalleActividad(idActividad):
  lista = control.getDetalleActividad(int(idActividad))
  listaComentarios = []
  listaEvidencias = []

  if (lista[0] == None):
     return jsonify("No existe")       
  
  for comment in lista[1]:
    listaComentarios += [actividadToJSON(comment)] 
  for evidencia in lista[2]:
    listaEvidencias += [evidencia.__dict__]
    
  listaSalida = [actividadToJSON(lista[0])] + [listaComentarios] + [listaEvidencias]
  #print(listaSalida)
  return listaSalida

# def escribirComentario(self, idActividad,autor,fechaHora, contenido, idComentarioPadre):
@app.route('/escribirComentario', methods=['POST'])
def escribirComentario():
  #print(request.json)

  #borrar este y descomentar el otro con los JSON adecuados
  # id = control.escribirComentario(request.json['idActividad'],
  #                                 SingletonSesionActual().getUsuario().idUsuario, datetime.now(), 
  #                                 request.json['contenido'], request.json['idComentarioPadre'])
  
  
  id = control.escribirComentario(1, 1, datetime.now(), "contenido", 1)
  print(id)
  
  # decomentar cuando este listo
  # control.bitacoraActividad(int(request.json['idActividad']), datetime.now().date(), datetime.now().time().strftime('%H:%M'),
  #                            SingletonSesionActual().getUsuario().idUsuario, "comentario agregado")
  return jsonify(str(id))

# def finalizarActividad(self, idActividad,linkGrabacion):
@app.route('/finalizarActividad/<idActividad>/<linkGrabacion>', methods=['POST'])
def finalizarActividad(idActividad, linkGrabacion):
  res = control.finalizarActividad(int(idActividad), linkGrabacion)
  control.bitacoraActividad(int(idActividad),datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "se finalizo la actividad con id = " + str(idActividad))
  print(res)
  return str(res)

# def agregarResponsablesActividad(self, idActividad, responsablesNuevos):
@app.route('/agregarResponsablesActividad/<idActividad>/<idResponsableNuevo>', methods=['POST'])
def agregarResponsablesActividad(idActividad, idResponsableNuevo):

  #si le pasan el codigo y no el id usan la que esta comentada y borran la otra
  #id = control.agregarResponsablesActividad(idActividad, [control.getProfesorCodigo(idResponsableNuevo)])

  id = control.agregarResponsablesActividad(int(idActividad), [control.getProfesor(int(idResponsableNuevo))])
  
  print(id)
  ac = control.verActividad(int(idActividad))
  for p in ac.responsables:
    print(p.id, " ", p.nombre)
  
  return jsonify(str(id))

# def quitarResponsablesActividad(self, idActividad, responsablesEliminados):
@app.route('/quitarResponsablesActividad/<idActividad>/<idResponsableEliminado>', methods=['POST'])
def quitarResponsablesActividad(idActividad, idResponsableEliminado):

  #si le pasan el codigo y no el id usan la que esta comentada y borran la otra
  #id = control.agregarResponsablesActividad(idActividad, [control.getProfesorCodigo(idResponsableNuevo)])

  id = control.quitarResponsablesActividad(int(idActividad), [control.getProfesor(int(idResponsableEliminado))])
  
  print(id)
  ac = control.verActividad(int(idActividad))
  for p in ac.responsables:
    print(p.id, " ", p.nombre)
  
  return jsonify(str(id))
        

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
@app.route('/exists/<correo>/<contrasenha>', methods=['GET'])
def exists(correo, contrasenha):
  print(control.exists(correo, contrasenha))
  return json.dumps(control.exists(correo, contrasenha))

# def modificarUsuario(self, idUsuario, correoElectronico, contrasenha, idRol):
@app.route('/modificarUsuario', methods=['POST'])
def modificarUsuario():
  #print(request.json)

  #Descomentar cuando se envie el codigo y borrar el otro
  
  # id = control.modificarUsuario(int(request.json['idUsuario']), request.json['correoElectronico'], 
  #                            request.json['contrasenha'], request.json['idRol'])

  id = control.modificarUsuario(1, None, None, 1)
  
  print(id)
  
  return jsonify(str(id))


# def crearUsuario(self, correoElectronico, contrasenha, idRol):
@app.route('/crearUsuario', methods=['POST'])
def crearUsuario():
  #print(request.json)

  #borrar este y descomentar el otro con los JSON adecuados
  # id = control.crearUsuario(request.json['correoElectronico'], request.json['contrasenha'], 
  #                             request.json['idRol'])
  
  
  id = control.crearUsuario('correoElectronico', 'contrasenha', 2)
  print(id)
  return jsonify(str(id))

# def getUsuario(self, idUsuario):
@app.route('/getUsuario/<idUsuario>', methods=['GET'])
def getUsuario(idUsuario):
  user = control.getUsuario(int(idUsuario))

  return user.__dict__

# def getUsuarioRol(self, correo, contrasenha):
@app.route('/getUsuarioRol/<correo>/<contrasenha>', methods=['GET'])
def getUsuarioRol(correo, contrasenha):
  return json.dumps(control.getUsuarioRol(correo, contrasenha))





# inicia el servidor
if __name__ == "__main__":
    app.run(debug=True)