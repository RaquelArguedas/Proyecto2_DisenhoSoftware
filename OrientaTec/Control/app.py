import json
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from MainController import *
from SingletonSesionActual import *
from datetime import datetime, timedelta
from io import BytesIO
from PIL import Image
from flask import send_file #nuevo import
import base64

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

  id = control.modificarEstudiante(int(request.json['carnet']) if request.json['carnet'] != '' else None, 
                                  request.json['name'] if request.json['name'] != '' else None, 
                                  request.json['apellido1'] if request.json['apellido1'] != '' else None, 
                                  request.json['apellido2'] if request.json['apellido2'] != '' else None, 
                                  int(request.json['sede']) if request.json['sede'] != '' else None, 
                                  request.json['correo'] if request.json['correo'] != '' else None, 
                                  int(request.json['numeroTelefono']) if request.json['numeroTelefono'] != '' else None,  
                                  int(request.json['estado'] )if request.json['estado'] != '' else None)
  
  return jsonify(str(id))

# buscarEstudiante(self, carnet)
@app.route('/getEstudiante/<carnet>', methods=['GET'])
def buscarEstudiante(carnet):
  print("carnet", carnet)
  est = control.buscarEstudiante(int(carnet))

  if (est == None):
     return jsonify("No existe")
  
  return json.dumps(est.__dict__)

  #return jsonify(jsonStr)

@app.route('/generarExcelEstudiantes/<sede>', methods=['GET'])
def generarExcelEstudiantes(sede):
    if int(sede) == 0: #Genere para LA sede del user
      user = SingletonSesionActual().getUsuario()
      res =  control.generarExcelEstudiantes(user.idSede)
    else: #Genera para todas las sedes
      res =  control.generarExcelEstudiantes(int(sede))
    print('respuesta generarExcel:')
    print(res)
    return json.dumps(res)


# cargarExcelEstudiantes(self,archivo)
#@app.route('/cargarExcelEstudiantes/<archivo>', methods=['POST'])
#def cargarExcelEstudiantes(archivo):
@app.route('/cargarExcelEstudiantes', methods=['POST'])
def cargarExcelEstudiantes():
  archivo = request.files['file']
  res = control.cargarExcelEstudiantes(archivo)
  return jsonify(str(res))


#AdminProfesores
# darBajaProfesor(self, idProfesor)
@app.route('/darBajaProfesor/<idProfesor>', methods=['POST'])
def darBajaProfesor(idProfesor):
  res = control.darBajaProfesor(int(idProfesor))
  control.bitacoraEquipoGuia(datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "se dio de baja al id =" + str(idProfesor))
  return jsonify(str(res))

# designarCoordinador(self, idProfesor):
@app.route('/designarCoordinador/<idProfesor>', methods=['POST'])
def designarCoordinador(idProfesor):
  res = control.designarCoordinador(int(idProfesor))
  control.bitacoraEquipoGuia(datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "se designo al coordinador con id =" + str(idProfesor))
  return jsonify(str(res))

# modificarProfesor(self, codigo, cedula,nombre,apellido1, apellido2, sede, numeroCelular, 
#                   correoElectronico, numeroOficina,autoridad, estado):
@app.route('/modificarProfesor', methods=['POST'])
def modificarProfesor():
  codigo = request.form.get('codigo')
  cedula = request.form.get('cedula')
  name = request.form.get('name')
  apellido1 = request.form.get('apellido1')
  apellido2 = request.form.get('apellido2')
  sede = request.form.get('sede')
  numeroTelefono = request.form.get('numeroTelefono')
  correo = request.form.get('correo')
  numeroOficina = request.form.get('numeroOficina')
  estado = request.form.get('estado')

  if (sede != None):
    sede = int(sede)
  if (estado != None):
    estado = int(estado)
  print(codigo)
  prof = control.getProfesorCodigo(codigo)
  print(prof)
  #prof = control.getProfesorCodigo("SJ-1")
  id = control.modificarProfesor(prof.id,int(cedula), name, apellido1, apellido2, sede, int(numeroTelefono), 
                                  correo, int(numeroOficina),None,estado)
  
  print(id)
  if (request.form.get('image') != "null"):
    control.registrarFotoProfesor(prof.id, request.files['image'])

  return jsonify(str(id))

# modificarAsistente(self, id, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
#                        correoElectronico, numeroOficina):
@app.route('/modificarAsistente', methods=['POST'])
def modificarAsistente():
  id = request.form.get('id')
  cedula = request.form.get('cedula')
  name = request.form.get('name')
  apellido1 = request.form.get('apellido1')
  apellido2 = request.form.get('apellido2')
  sede = request.form.get('sede')
  numeroTelefono = request.form.get('numeroTelefono')
  correo = request.form.get('correo')
  numeroOficina = request.form.get('numeroOficina')

  print(id)

  if (sede != None):
    sede = int(sede)
  
  res = control.modificarAsistente(int(id),int(cedula), name, apellido1, apellido2, sede, int(numeroTelefono), 
                                  correo, int(numeroOficina))
  
  print(res)
  if (request.form.get('image') != "null"):
    control.registrarFotoAsistente(int(id), request.files['image'])

  return jsonify(str(id))

# getProfesorCodigo(self, idProfesor):
@app.route('/getProfesorCodigo/<codigo>', methods=['GET'])
def getProfesorCodigo(codigo):
  prof = control.getProfesorCodigo(codigo)
  print(prof.nombre)

  if (prof == None):
    return jsonify("No existe")
  
  return json.dumps(prof.__dict__)

# getProfesorCedula(self, idProfesor):
@app.route('/getProfesorCedula/<cedula>', methods=['GET'])
def getProfesorCedula(cedula):
  prof = control.getProfesorCedula(int(cedula))

  if (prof == None):
    return jsonify("No existe")
  
  return json.dumps(prof.__dict__)

# crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular, correoElectronico, numeroOficina,autoridad, estado):
@app.route('/crearProfesor', methods=['POST'])
def crearProfesor():
  cedula = request.form.get('cedula')
  name = request.form.get('name')
  apellido1 = request.form.get('apellido1')
  apellido2 = request.form.get('apellido2')
  sede = request.form.get('sede')
  numeroTelefono = request.form.get('numeroTelefono')
  correo = request.form.get('correo')
  numeroOficina = request.form.get('numeroOficina')

  id = control.crearProfesor(int(cedula), name, apellido1, apellido2, int(sede), int(numeroTelefono), 
                             correo, numeroOficina,2,1)
  
  print(id)
  if (request.form.get('image') != "null"):
    control.registrarFotoProfesor(id[0], request.files['image'])

  control.agregarProfesor(control.getProfesor(id[0])) #se agrega al equipo guia
  control.bitacoraEquipoGuia(datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "nuevo profesor con id=" + str(id[0]))
  
  return jsonify(str(id))

def is_base64_valid(base64_string):
    try:
        base64.b64decode(base64_string)
        return True
    except (TypeError):
        return False

# getFotoProfesor
@app.route('/getFotoProfesor/<idProfesor>', methods=['GET'])
def getFotoProfesor(idProfesor):
  imagen = control.getFotoProfesor(int(idProfesor))
  
  if (imagen!=None and is_base64_valid(base64.b64encode(imagen).decode('utf-8'))):
    return base64.b64encode(imagen).decode('utf-8')
  else:
    return "None"
  
# getFotoAsistente
@app.route('/getFotoAsistente/<id>', methods=['GET'])
def getFotoAsistente(id):
  imagen = control.getFotoAsistente(int(id))
  
  if (imagen!=None and is_base64_valid(base64.b64encode(imagen).decode('utf-8'))):
    return base64.b64encode(imagen).decode('utf-8')
  else:
    return "None"
  
# getFotoAfiche
@app.route('/getFotoAfiche/<id>', methods=['GET'])
def getFotoAfiche(id):
  imagen = control.getFotoAfiche(int(id))
  
  if (imagen!=None and is_base64_valid(base64.b64encode(imagen).decode('utf-8'))):
    return base64.b64encode(imagen).decode('utf-8')
  else:
    return "None"
  
# getFotoProfesor
@app.route('/getFotoProfesorCodigo/<codigo>', methods=['GET'])
def getFotoProfesorCodigo(codigo):
  idProfesor = control.getProfesorCodigo(codigo).id
  imagen = control.getFotoProfesor(int(idProfesor))

  base64_image = None
  if (imagen != None):
    base64_image = base64.b64encode(imagen).decode('utf-8')

  if is_base64_valid(base64_image):
    return base64_image
  else:
    return "None"

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

# getAllProfesores(self):
@app.route('/getAllProfesores', methods=['GET'])
def getAllProfesores():
  listaProfesores = control.getAllProfesores()
  listaSalida = []
  for p in listaProfesores:
    listaSalida += [json.dumps(p.__dict__)]
  return listaSalida



#AdminActividades
# def verActividad(self, idActividad):
@app.route('/verActividad/<idActividad>', methods=['GET'])
def verActividad(idActividad):
  ac = control.verActividad(int(idActividad))

  if (ac == None):
     return jsonify("No existe")   

  #print(actividadToJSON(ac))    

  return actividadToJSON(ac)




# def modificarActividad(self, idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
#                 horaFin, recordatorio,responsables, medio, enlace,estado):
@app.route('/modificarActividad', methods=['POST'])
def modificarActividad():
  id = request.form.get('id')
  nombre = request.form.get('nombre')
  tipo = request.form.get('tipo')
  fecha = datetime.strptime(request.form.get('fecha'), '%Y-%m-%d')
  horaInicio = (datetime.strptime(request.form.get('horaInicio'), '%H:%M:%S')).time()
  horaFin = (datetime.strptime(request.form.get('horaFin'), '%H:%M:%S')).time()
  periodicidad = request.form.get('periodicidad')
  fechaRecordatorioB = request.form.get('fechaRecordatorioB')
  recordatorio = request.form.get('recordatorio')
  medio = request.form.get('medio')
  enlace = request.form.get('enlace')
  estado = request.form.get('estado')

  print("periodicidad", periodicidad)
  print("fechaRec", datetime.strptime(fechaRecordatorioB, '%m/%d/%Y'))
  print("recordatorio", recordatorio)

  #creacion de recordatorios
  fechaRecordatorioB = datetime.strptime(fechaRecordatorioB, '%m/%d/%Y')
  periodicidad = int(periodicidad)
  recordatorios = int(recordatorio)

  # Crear una lista vacía para almacenar las fechas de recordatorio
  lista = []
  # Calcular las fechas de recordatorio adicionales
  fechaActual = fechaRecordatorioB
  while len(lista) < recordatorios and fechaActual < fecha:
      lista.append(fechaActual.date())
      fechaActual += timedelta(days=periodicidad)
      print("fechaActual < fecha", fechaActual < fecha, fechaActual, fecha)

  if (tipo != None):
    tipo = int(tipo)
  if (estado != None):
    estado = int(estado)
  if (medio != None):
    medio = int(medio)

  res = control.modificarActividad(int(id),nombre, tipo, fecha.date(), horaInicio, horaFin, 
                                   lista, medio, enlace, estado )

  print("ID: ", id)
  if (request.form.get('image') != "null"):
    control.registrarFotoAfiche(int(id), request.files['image'])

  control.bitacoraActividad(int(id), datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "se modificó la actividad.")

  return jsonify(str(id))


# def crearEvidencias
@app.route('/crearEvidencias', methods=['POST'])
def crearEvidencias():
  idActividad = request.form.get('idActividad')
  enlace = request.form.get('enlace')

  respuesta = control.crearEvidencia(idActividad, enlace)
  print(respuesta, type(respuesta[0]), respuesta[0])

  if (request.form.get('image') != "null"):
    control.registrarFotoEv(int(idActividad), request.files['image'])
  
  print("idActividad: ",idActividad)

  control.bitacoraActividad(idActividad, datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "se agregaron evidencias al realizarla")
  return jsonify(respuesta[0])

@app.route('/agregarListaEv/<idActividad>', methods=['POST'])
def agregarListaEv(idActividad):
  print("////////////////",idActividad)
  if (request.form.get('image') != "null"):
    control.registrarFotoEvLista(int(idActividad), request.files['image'])
  return jsonify(str(1))

# getFotoEvLista
@app.route('/getFotoEvLista/<idActividad>', methods=['GET'])
def getFotoEvLista(idActividad):
  imagenes = control.getEvLista(int(idActividad))
  dicImagenes = {}
  base64_image = None
  print("imagenes", len(imagenes))
  for i in range(len(imagenes)):
    imagen = imagenes[i]
    if (imagen != None):
      base64_image = base64.b64encode(imagen).decode('utf-8')
      if is_base64_valid(base64_image):
        dicImagenes[str(i)] = base64_image
      
  return dicImagenes
  
# getFotoEv
@app.route('/getFotoEv/<idActividad>', methods=['GET'])
def getFotoEv(idActividad):
  imagen = control.getFotoEv(int(idActividad))

  base64_image = None
  if (imagen != None):
    base64_image = base64.b64encode(imagen).decode('utf-8')

  if is_base64_valid(base64_image):
    return base64_image
  else:
    return "None"
  
# getEnlaceEv
@app.route('/getEnlaceEv/<idActividad>', methods=['GET'])
def getEnlaceEv(idActividad):
  ev = control.getEvidencia(int(idActividad))
  return jsonify(ev.linkGrabacion)

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
  nombre = request.form.get('nombre')
  tipo = request.form.get('tipo')
  fecha = request.form.get('fecha')
  horaInicio = request.form.get('horaInicio')
  horaFin = request.form.get('horaFin')
  periodicidad = request.form.get('periodicidad')
  fechaRecordatorioB = request.form.get('fechaRecordatorioB')
  recordatorio = request.form.get('recordatorio')
  responsables = request.form.get('responsables')
  medio = request.form.get('medio')
  enlace = request.form.get('enlace')
  estado = request.form.get('estado')
  
  print("periodicidad", periodicidad)
  print("fechaRec", datetime.strptime(fechaRecordatorioB, '%m/%d/%Y'))
  print("recordatorio", recordatorio)

  #creacion de recordatorios
  fechaRecordatorioB = datetime.strptime(fechaRecordatorioB, '%m/%d/%Y')
  fechaLimite = datetime.strptime(fecha, '%m/%d/%Y')
  periodicidad = int(periodicidad)
  recordatorios = int(recordatorio)

  # Crear una lista vacía para almacenar las fechas de recordatorio
  lista = []
  # Calcular las fechas de recordatorio adicionales
  fechaActual = fechaRecordatorioB
  while len(lista) < recordatorios and fechaActual < fechaLimite:
      lista.append(fechaActual.date())
      fechaActual += timedelta(days=periodicidad)

  print(lista)

  print("res: ", responsables)
  id = control.crearActividad(nombre, int(tipo), datetime.strptime(fecha, '%m/%d/%Y'), 
                               datetime.strptime(horaInicio, '%H:%M'), datetime.strptime(horaFin, '%H:%M'), 
                               lista, json.loads(responsables), int(medio), enlace, int(estado))
  print(id)

  try:
    control.registrarFotoAfiche(id[0], request.files['image'])
  except:
    print("Error: Ocurrió una excepción")
    
  control.bitacoraActividad(id[0], datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "nueva actividad")
  return jsonify(str(id))

# def cambiarEstado(self, idActividad, idEstado):
@app.route('/cambiarEstado/<idActividad>/<idEstado>', methods=['POST'])
def cambiarEstado(idActividad, idEstado):
  res = control.cambiarEstado(int(idActividad), int(idEstado))
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
  
  commentReparsed = {} #Importate: para el comentario hay que armar una estructura que incluye el nombre del autor
  #Lo hago porque no quiero cambiar el modelo - Atte: Alonso
  for comment in lista[1]:
    commentReparsed = {'idActividad': comment.idActividad,
                       'autor': control.getProfesor(comment.autor).nombre+' '
                       +control.getProfesor(comment.autor).apellido1+' '
                       +control.getProfesor(comment.autor).apellido2,
                       'fechaHora': comment.fechaHora.__str__(),
                       'contenido': comment.contenido,
                       'idComentarioPadre': comment.idComentarioPadre,
                       'idComentario': comment.idComentario}
    listaComentarios += [commentReparsed] 

  for evidencia in lista[2]:
    listaEvidencias += [evidencia.__dict__]
    
  listaSalida = [actividadToJSON(lista[0])] + [listaComentarios] + [listaEvidencias]
  print(listaSalida)
  return listaSalida

# def escribirComentario(self, idActividad,autor,fechaHora, contenido, idComentarioPadre):
@app.route('/escribirComentario', methods=['POST'])
def escribirComentario():
  print(request.form)

  #borrar este y descomentar el otro con los JSON adecuados
  id = control.escribirComentario(int(request.form.get('idActividad')),
                                   SingletonSesionActual().getUsuario().idUsuario, datetime.now(), 
                                   request.form.get('contenido'), int(request.form.get('idComentarioPadre')))
  
  print(id)
  
  control.bitacoraActividad(int(request.json['idActividad']), datetime.now().date(), datetime.now().time().strftime('%H:%M'),
                             SingletonSesionActual().getUsuario().idUsuario, "comentario agregado")
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
@app.route('/agregarResponsablesActividad/', methods=['POST'])
def agregarResponsablesActividad():

  #si le pasan el codigo y no el id usan la que esta comentada y borran la otra
  #id = control.agregarResponsablesActividad(idActividad, [control.getProfesorCodigo(idResponsableNuevo)])

  print('request.json: ', request.json)
  id = control.agregarResponsablesActividad(int(request.json['idActividad']), [request.json['idResponsableNuevo']])
  
  print(id)
  #Error: ac.responsables lo devuelve como un string y no deja convertirlo a JSon
  #ac = control.verActividad(int(request.json['idActividad']))
  #for p in ac.responsables:
  # #print(p.id, " ", p.nombre)
  # print(p)
  
  return jsonify(str(id))

# def quitarResponsablesActividad(self, idActividad, responsablesEliminados):
@app.route('/quitarResponsablesActividad/', methods=['POST'])
def quitarResponsablesActividad():

  #si le pasan el codigo y no el id usan la que esta comentada y borran la otra
  #id = control.agregarResponsablesActividad(idActividad, [control.getProfesorCodigo(idResponsableNuevo)])

  id = control.quitarResponsablesActividad(int(request.json['idActividad']), [request.json['idResponsableEliminado']])
  
  print(id)
  # ac = control.verActividad(request.json['idActividad'])
  # for p in ac.responsables:
  #   print(p.id, " ", p.nombre)
  
  return jsonify(str(id))
        

#AdminPlanActividades
# def consultarProximaActividad(self):
@app.route('/consultarProximaActividad', methods=['GET'])
def consultarProximaActividad():
  ac = control.consultarProximaActividad()

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

# def consultarTodasActividades(self):
@app.route('/consultarTodasActividades', methods=['GET'])
def consultarTodasActividades():
  actividades = control.consultarTodasActividades()
  print(actividades)
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

  control.definirPlanActividades(3, [control.verActividad(int(idActividad))])
  return "Definido"

#funcion auxiliar que convierte una actividad a un JSON aceptable
def actividadToJSON(ac):
  dicOriginal = ac.__dict__
  acDic = dict(dicOriginal)
  
  for clave in acDic:
    listaSalida = []
    #print('type:', type(acDic[clave]), acDic[clave])

    if (type(acDic[clave]) == list):
      #print('enter list')
      for p in acDic[clave]:
        listaSalida += [actividadToJSON(p)]
      acDic[clave] = json.dumps(listaSalida)
      #print("//", acDic[clave])

    if (type(acDic[clave]) != int and type(acDic[clave]) != str):
      #print('enter no int/str')
      #print(type(acDic[clave]))
      acDic[clave] = str(acDic[clave]) #21:54:00 
  
  return json.dumps(acDic)



#AdminUsuario
# def exists(self, correo, contrasenha):
@app.route('/exists/<correo>/<contrasenha>', methods=['GET'])
def exists(correo, contrasenha):
  res = control.exists(correo, contrasenha)
  print(res)
  return jsonify(res)

# def correoRegistrado(self, correo, contrasenha):
@app.route('/correoRegistrado/<correo>', methods=['GET'])
def correoRegistrado(correo):
  res = control.correoRegistrado(correo)
  print("Estoy en app")
  print(res)
  return jsonify(res)

# def modificarUsuario(self, idUsuario, correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats):
@app.route('/modificarUsuarioContrasenha', methods=['POST'])
def modificarUsuarioContrasenha():

  print(request.json)
  contrasenha = request.json['nuevaContrasenha']

  #Descomentar cuando se envie el codigo y borrar el otro
  print(SingletonSesionActual().getUsuario().idUsuario, " ",SingletonSesionActual().getUsuario().contrasenha)
  
  #se modifica en la BD y en los objetos 
  id = control.modificarUsuario(SingletonSesionActual().getUsuario().idUsuario, None, contrasenha, None, None, None, None)
  #se modifica en la sesionActual
  SingletonSesionActual().getUsuario().setContrasenha(contrasenha) 

  print(SingletonSesionActual().getUsuario().idUsuario, " ",SingletonSesionActual().getUsuario().contrasenha)
  
  return jsonify(str(id))


# def crearUsuario(self, correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats):
@app.route('/crearUsuario', methods=['POST'])
def crearUsuario():  
  id = control.crearUsuario('correoElectronico', 'contrasenha', 2)

  print(id)
  return jsonify(str(id))

# En App.py
#def crearNuevoUsuarioEstudiante(carnet,correoElectronico, idRol, idSede):
    #adapter = EstudianteAdapter(carnet,correoElectronico, idRol, idSede)
    #control.crearUsuario(adapter)#Debería ser así pero crear usuario recibe los campos directamente

# def getUsuario(self, idUsuario):
@app.route('/getUsuario/<idUsuario>', methods=['GET'])
def getUsuario(idUsuario):
  user = control.getUsuario(int(idUsuario))

  return user.__dict__

# def getUsuarioRol(self, correo, contrasenha):
@app.route('/getUsuarioActualRol', methods=['GET'])
def getUsuarioActualRol():
  user = SingletonSesionActual().getUsuario()
  return json.dumps(control.getUsuarioRol(user.correo, user.contrasenha))

# def iniciarSesion(self, correo):
@app.route('/iniciarSesion/<correo>', methods=['POST'])
def iniciarSesion(correo):
  SingletonSesionActual().setUsuario(control.getUsuarioCorreo(correo))
  #print("....",SingletonSesionActual().getUsuario().idUsuario)
  return str(SingletonSesionActual().getUsuario().idUsuario)

#Crear Observación - Parche de Alonso
@app.route('/crearObservacion', methods=['POST'])
def crearObservacion():
  id = control.crearObservacion(int(request.json['idActividad']), datetime.today(), request.json['detalle'])
  #print(id)
  return jsonify(str(id))

# def getUsuarioSesionActual(self):
@app.route('/getUsuarioSesionActual', methods=['GET'])
def getUsuarioSesionActual():
  #SingletonSesionActual().setUsuario(control.getUsuarioCorreo("as@gmail.com","as"))
  user = SingletonSesionActual().getUsuario()
  return actividadToJSON(user)

# def getInfoUsuarioSesionActual(self):
@app.route('/getInfoUsuarioSesionActual', methods=['GET'])
def getInfoUsuarioSesionActual():
  #SingletonSesionActual().setUsuario(control.getUsuarioCorreo("as@gmail.com","as"))
  user = SingletonSesionActual().getUsuario()
  listaPersonas = control.getAllProfesores() + control.getAllAsistentes() + control.consultarEstudiantes(1)
  for p in listaPersonas:
    if (user.correo == p.correoElectronico):
      #print("---", p.__dict__)
      return jsonify(p.__dict__)
    
  
  return user.__dict__

# def getFechaSimulada(self):
@app.route('/getFechaSimulada', methods=['GET'])
def getFechaSimulada():
  fecha = SingletonSesionActual().getFechaActual()
  return jsonify(fecha)

# def setFechaSimulada(self, newDate):
@app.route('/setFechaSimulada/<newDate>', methods=['POST'])
def setFechaSimulada(newDate):
  print("....",SingletonSesionActual().getFechaActual())
  fechaActualNueva = (datetime.strptime(newDate, '%a %b %d %Y %H:%M:%S GMT%z (hora estándar central)')).date()
  SingletonSesionActual().setFechaActual(fechaActualNueva)
  print("....",SingletonSesionActual().getFechaActual())
  control.notificarActividades(fechaActualNueva) #funcion que busca las actividades que deberian notificarse
  return str(SingletonSesionActual().getFechaActual())

#Notificaciones del usuario
# def activarNotis(self):
@app.route('/activarNotis', methods=['POST'])
def activarNotis():
  
  #se modifica en la BD y en los objetos 
  id = control.modificarUsuario(SingletonSesionActual().getUsuario().idUsuario, None, None, None, None, True, None)
  #se modifica en la sesionActual
  SingletonSesionActual().getUsuario().setPermiteNotis(True) 

  control.suscribir(SingletonSesionActual().getUsuario())

  return jsonify(str(id))

# def desactivarNotis(self):
@app.route('/desactivarNotis', methods=['POST'])
def desactivarNotis():
  
  #se modifica en la BD y en los objetos 
  id = control.modificarUsuario(SingletonSesionActual().getUsuario().idUsuario, None, None, None, None, False, None)
  #se modifica en la sesionActual
  SingletonSesionActual().getUsuario().setPermiteNotis(False) 

  control.desuscribir(SingletonSesionActual().getUsuario())

  return jsonify(str(id))

# def activarChats(self):
@app.route('/activarChats', methods=['POST'])
def activarChats():
  
  #se modifica en la BD y en los objetos 
  id = control.modificarUsuario(SingletonSesionActual().getUsuario().idUsuario, None, None, None, None, None, True)
  #se modifica en la sesionActual
  SingletonSesionActual().getUsuario().setPermiteChats(True) 

  print(SingletonSesionActual().getUsuario().idUsuario, " ",SingletonSesionActual().getUsuario().getPermiteChats())
  return jsonify(str(id))

# def getPermiteNotis(self):
@app.route('/getPermiteNotis', methods=['POST'])
def getPermiteNotis():
  permite = SingletonSesionActual().getUsuario().getPermiteNotis()
  print(SingletonSesionActual().getUsuario().idUsuario, " ", permite)
  return jsonify(str(permite))

# def getPermiteChats(self):
@app.route('/getPermiteChats', methods=['POST'])
def getPermiteChats():
  permite = SingletonSesionActual().getUsuario().getPermiteChats()
  print(SingletonSesionActual().getUsuario().idUsuario, " ", permite)
  return jsonify(str(permite))

#funciones de las notificaciones idNotificacion, idUsuario
# def deleteNotificacionUsuario(self, idNotificacion, idUsuario):
#        return self.controlUsuario.deleteNotificacionUsuario(idNotificacion, idUsuario)
@app.route('/deleteNotificacionUsuario/<idNotificacion>/<idUsuario>', methods=['POST'])
def deleteNotificacionUsuario(idNotificacion, idUsuario):
  res = control.deleteNotificacionUsuario(idNotificacion,idUsuario)
  return jsonify(str(res))

# def deleteNotificacionesUsuario(self, idUsuario):
#       return self.controlUsuario.deleteNotificacionesUsuario(idUsuario)
@app.route('/deleteNotificacionesUsuario/<idUsuario>', methods=['POST'])
def deleteNotificacionesUsuario(idUsuario):
  res = control.deleteNotificacionesUsuario(idUsuario)
  return jsonify(str(res))

#   def cambiarLeida(self, idNotificacion, idUsuario):
#       return self.controlUsuario.cambiarLeida(idNotificacion, idUsuario)
@app.route('/cambiarLeida/<idNotificacion>/<idUsuario>', methods=['POST'])
def cambiarLeida(idNotificacion, idUsuario):
  res = control.cambiarLeida(idNotificacion, idUsuario)
  return jsonify(str(res))

#   def todasLeidas(self, idUsuario, leidas):
#       return self.controlUsuario.todasLeidas(idUsuario, leidas)
@app.route('/todasLeidas/<idUsuario>/<leidas>', methods=['POST'])
def todasLeidas(idUsuario, leidas):
  res = control.todasLeidas(idUsuario, leidas)
  return jsonify(str(res))

#   def createNotificacion(self, idUsuarioEmisor, fechaHora, contenido):
#       return self.controlUsuario.createNotificacion(idUsuarioEmisor, fechaHora, contenido)
@app.route('/createNotificacion/<idUsuarioEmisor>/<fechaHora>/<contenido>', methods=['POST'])
def createNotificacion(idUsuarioEmisor, fechaHora, contenido):
  res = control.createNotificacion(idUsuarioEmisor, fechaHora, contenido)
  return jsonify(str(res))
  
#   def notificacionUsuarios(self, idNotificacion, idUsuario):
#       return self.controlUsuario.notificacionUsuarios(idNotificacion, idUsuario)
@app.route('/notificacionUsuarios/<idNotificacion>/<idUsuario>', methods=['POST'])
def notificacionUsuarios(idNotificacion, idUsuario):
  res = control.notificacionUsuarios(idNotificacion, idUsuario)
  return jsonify(str(res))

#NUEVO CAMBIO
# def getSedeUsuarioSesionActual(self):
@app.route('/getSedeUsuarioSesionActual', methods=['GET'])
def getSedeUsuarioSesionActual():
  user = SingletonSesionActual().getUsuario()
  return jsonify(user.__dict__['idSede'])

#Cambios NUEVOS
# getFotoEstudiante
@app.route('/getFotoEstudiante/<carnet>', methods=['GET'])
def getFotoEstudiante(carnet):
  print("carnet:")
  print(carnet)
  imagen = control.getFotoEstudiante(int(carnet))

  base64_image = None
  if (imagen != None):
    base64_image = base64.b64encode(imagen).decode('utf-8')

  if is_base64_valid(base64_image):
    return base64_image
  else:
    return "None"

# modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, numeroCelular, 
# estado)
@app.route('/modificarEstudianteFront', methods=['POST'])
def modificarEstudianteFront():
  #print('respuesta:',request.files)
  carnet = request.form.get('carnet')
  name = request.form.get('name')
  apellido1 = request.form.get('apellido1')
  apellido2 = request.form.get('apellido2')
  sede = request.form.get('sede')
  numeroTelefono = request.form.get('numeroTelefono')
  correo = request.form.get('correo')
  estado = request.form.get('estado')

  if (sede != None):
    sede = int(sede)
  if (estado != None):
    estado = int(estado)
  if (carnet != None):
    carnet = int(carnet) 
  if (numeroTelefono != None):
    numeroTelefono = int(numeroTelefono)
  id = control.modificarEstudiante(carnet, 
                                  name if name != '' else None, 
                                  apellido1 if apellido1 != '' else None, 
                                  apellido2 if apellido2 != '' else None, 
                                  sede, 
                                  correo if correo != '' else None, 
                                  numeroTelefono,  
                                  estado)  
  print(id)
  if (request.files['image'] != None):
    control.registrarFotoEstudiante(carnet, request.files['image'])
  return jsonify(str(id))

# def enviarMensaje(self, idChat,autor,fechaHora, contenido):
@app.route('/escribirMensaje', methods=['POST'])
def escribirMensaje():
  #print(request.form)
  print('escribir mensaje APP.PY')
  id = control.escribirMensaje(int(request.json['id']),
                                  request.json['contenido'],
                                   SingletonSesionActual().getUsuario().idUsuario, 
                                  request.json['fechaHora'] )
                                  #datetime.now())
  #datetime.now().time().strftime('%H:%M')
  print(id)
  return jsonify(str(id))

@app.route('/crearChat', methods=['POST'])
def crearChat():
  print('Nombre chat:', request.json['nombreChat'])
  miembrosSeleccionados = request.json['estudiantes'] + request.json['profesores']
  print('Miembros:', miembrosSeleccionados)
  id = control.crearChat(request.json['nombreChat'],
                         miembrosSeleccionados,
                         SingletonSesionActual().getUsuario().idUsuario)
  
  print(id)
  return jsonify(str(id))


# def getInfoUsuarioSesionActual(self):
@app.route('/getProfesoresEstudiantes', methods=['GET'])
def getProfesoresEstudiantes():
  listaPersonas = []
  listaProfesores = control.getAllProfesores() 
  listaEstudiantes = control.consultarEstudiantes(1)
  listaPersonas.append(listaProfesores)
  listaPersonas.append(listaEstudiantes)
  #print('listaPersonas: ',listaPersonas)
  listaSalida = []
  if (listaPersonas == None):
     return jsonify("No hay información") 
     
  profesorReparsed = {} #Estrcutrua para enviar al front
  estudianteReparsed = {} #Estrcutrua para enviar al front
  for profesor in listaPersonas[0]:
    profesorReparsed = {'id': profesor.codigo,
                       'nombre': profesor.nombre+' '
                       +profesor.apellido1+' '
                       +profesor.apellido2}
    listaSalida += [profesorReparsed] 
  for estudiante in listaPersonas[1]:
    estudianteReparsed = {'id': estudiante.carnet,
                       'nombre': estudiante.nombre+' '
                       +estudiante.apellido1+' '
                       +estudiante.apellido2}
    listaSalida += [estudianteReparsed] 
  #print(listaSalida)
  return listaSalida

@app.route('/getAllProfesoresFront', methods=['GET'])
def getAllProfesoresFront():
  #print('GET ALL PROFESORES')
  listaSalida = []
  listaProfesores = control.getAllProfesores()
  profesorReparsed = {} #Estrcutrua para enviar al front
  for profesor in listaProfesores:
    profesorReparsed = {'codigo': profesor.codigo,
                       'nombre': profesor.nombre+' '
                       +profesor.apellido1+' '
                       +profesor.apellido2}
    listaSalida += [profesorReparsed] 
  #print(listaSalida)
  return listaSalida

@app.route('/getAllEstudiantesFront', methods=['GET'])
def getAllEstudiantesFront():
  listaSalida = []
  listaEstudiantes = control.consultarEstudiantes(1)
  estudianteReparsed = {} #Estrcutrua para enviar al front
  for estudiante in listaEstudiantes:
    estudianteReparsed = {'carnet': estudiante.carnet,
                       'nombre': estudiante.nombre+' '
                       +estudiante.apellido1+' '
                       +estudiante.apellido2}
    listaSalida += [estudianteReparsed] 
  #print(listaSalida)
  return listaSalida

@app.route('/getMensajesChats', methods=['GET'])
def getMensajesChats():
  listaSalida = []
  chatReparsed = {} #Estrcutrua para enviar al front
  mensajeReparsed={}
  idUsuario = SingletonSesionActual().getUsuario().idUsuario
  listaChats = control.getChats(int(idUsuario))
  print('listaChats:')
  print(listaChats)
  for chat in listaChats: #cada chat es una lista de idChat y nombre
    listaMensajexChat = []
    #obtener todos los mensajes de ese chat
    listaMensajes = control.getMensajes(int(chat[0]))
    print('listaMensajes APP.PY_')
    print(listaMensajes)
    for mensaje in listaMensajes:     
      nombreUsuario = control.getUsuarioNombre(int(mensaje.autor))
      mensajeReparsed = {'contenido': mensaje.contenido,
                      'fechaHora': mensaje.fechaHora,
                      'nombreUsuario': nombreUsuario}
      listaMensajexChat+=[mensajeReparsed]
    #después de obtener todos los mensajes 
    chatReparsed = {'id': chat[0],
                    'nombreChat': chat[1],
                    'mensajes': listaMensajexChat}
    listaSalida+=[chatReparsed]
  #print(listaSalida)
  return listaSalida

# inicia el servidor
if __name__ == "__main__":
    app.run(debug=True)