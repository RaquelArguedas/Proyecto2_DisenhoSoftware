# basado en codigo de Refactoring.Guru, adjuntamos el enlace a continuacion
# https://refactoring.guru/design-patterns/singleton/python/example#:~:text=Singleton%20is%20a%20creational%20design,the%20modularity%20of%20your%20code.

import mysql.connector 
from datetime import datetime, date, timedelta

import sys
#Anexo el Directorio en donde se encuentra la clase a llamar
sys.path.append('./Modelo')
#Importo la Clase
from Usuario import *
from Estudiante import *
from EquipoGuia import *
from Actividad import *
from Profesor import *
from AsistenteAdministrativo import *
from Bitacora import *
from PlanTrabajo import *
from Recordatorio import *
from Evidencia import *
from Observacion import *
from Comentario import *
from Sede import *
from Ordenamiento import *



class SingletonMeta(type):

    _instances = {}

    def __call__(cls, *args, **kwargs):

        if cls not in cls._instances:  #metodo obligatorio getInstance
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class SingletonDAO(metaclass=SingletonMeta):
    
    #Atributos
    #Atributos de conexión
    connection = None
    cursor = None

    #Atributos del modelo
    usuarios = []
    estudiantes = []
    equiposGuia = []
    actividades = []
    profesores = []
    asistentes = []
    bitacoras = []
    planesTrabajo = []
    recordatorios = []
    evidencias = []
    observaciones = []
    comentarios = []

    #Constructor que instancia los objetos necesarios del modelo
    def __init__(self):
        self.usuarios = self.setFromBD("SELECT * from ", "Usuario")
        self.estudiantes = self.setFromBD("SELECT * from ", "Estudiante")
        self.bitacoras = self.setFromBD("SELECT * from ", "Bitacora")
        self.profesores = self.setFromBD("SELECT * from ", "Profesor")
        self.equiposGuia = self.setFromBD("SELECT * from ", "EquipoGuia")
        self.actividades = self.setFromBD("SELECT * from ", "Actividad")
        self.asistentes = self.setFromBD("SELECT * from ", "AsistenteAdministrativo")
        self.planesTrabajo = self.setFromBD("SELECT * from ", "PlanTrabajo")
        self.recordatorios = self.setFromBD("SELECT * from ", "Recordatorio")
        self.evidencias = self.setFromBD("SELECT * from ", "Evidencia")
        self.observaciones = self.setFromBD("SELECT * from ", "Observacion")
        self.comentarios = self.setFromBD("SELECT * from ", "Comentario")
    
    #Auxiliar del constructor 
    def setFromBD(self, command, tablaBD):
        self.connectServer()

        try:
            self.cursor.execute(command + tablaBD)

            salida = self.cursor.fetchall()

            lista = []
            objeto = []
            for row in salida:
                for item in row:
                    objeto += [item]
                lista += [self.generarObjeto(tablaBD, objeto)]
                objeto = []
            return lista
            
            
        except Exception as ex:
            print(ex)

        self.closeConnection()

    #Auxiliar del constructor
    def generarObjeto(self, tablaBD, lista):
        objeto = None
        
        if (tablaBD == "Usuario"):
            objeto = Usuario(lista[0], lista[1], lista[2], lista[3])
        elif (tablaBD == "Estudiante"):
            objeto = Estudiante(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6])
        elif (tablaBD == "EquipoGuia"):
            objeto = EquipoGuia(lista[1], self.generarBitacorasEquipoGuia(lista[0]), self.generarProfesores(str(lista[0])), lista[2])
        elif (tablaBD == "Actividad"):    
            objeto = Actividad.Actividad(lista[0], lista[1],lista[2], lista[3], lista[4],lista[5], lista[6],self.generarResposables(lista[0]), lista[7], lista[8],lista[9], lista[10],self.generarBitacorasActividades(lista[0]))
        elif (tablaBD == "Profesor"):
            objeto = Profesor(self.generarCodigoProfesor(lista[5],lista[0]), lista[0],lista[1],lista[2],lista[3], lista[4], lista[5], lista[6],lista[7], lista[8], lista[9], lista[10])
        elif (tablaBD == "AsistenteAdministrativo"):
            objeto = AsistenteAdministrativo(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], lista[7], lista[8])
        elif (tablaBD == "Bitacora"):
            objeto = Bitacora(lista[0], lista[1], lista[2], lista[3], lista[4])
        elif (tablaBD == "PlanTrabajo"):
            objeto = PlanTrabajo(lista[0], lista[1], self.obtenerActividadesPlan(lista[0]))
        elif (tablaBD == "Recordatorio"):
            objeto = Recordatorio(lista[0], lista[1])
        elif (tablaBD == "Evidencia"):
            objeto = Evidencia(lista[0], lista[1])
        elif (tablaBD == "Observacion"):
            objeto = Observacion(lista[0], lista[1], lista[2])
        elif (tablaBD == "Comentario"):
            objeto = Comentario(lista[1], lista[2], lista[3], lista[4], lista[5])

        return objeto

    def generarProfesores(self, idEquipoGuia):
        self.connectServer()

        try:
            self.cursor.execute("select profesor.idProfesor from profesoresxequipoguia  inner join profesor on profesor.idProfesor = profesoresxequipoguia.idProfesor where idEquipoGuia = " + str(idEquipoGuia))

            salida = self.cursor.fetchall()

            lista = []
            for row in salida:
                lista += [self.getProfesor(row[0])]
            return lista
            
            
        except Exception as ex:
            print(ex)

        self.closeConnection()

    def generarCodigoProfesor(self, idSede, id):
        return Sede(idSede).name +"-"+str(id)

    def generarResposables(self, idActividad):
        self.connectServer()

        try:
            self.cursor.execute("select profesor.idProfesor from responsablexactividad  inner join profesor on profesor.idProfesor = responsablexactividad.idResponsable where idActividad = " + str(idActividad))

            salida = self.cursor.fetchall()

            lista = []
            for row in salida:
                lista += [self.getProfesor(row[0])]

            return lista
            
            
        except Exception as ex:
            print(ex)

        self.closeConnection()

    def obtenerActividadesPlan(self, idPlan):
        self.connectServer()

        try:
            self.cursor.execute("select idActividad from actividadesxplan where idPlan = " + str(idPlan))

            salida = self.cursor.fetchall()

            lista = []
            for row in salida:
                lista += [self.verActividad(row[0])]

            return lista
            
            
        except Exception as ex:
            print(ex)

        self.closeConnection()

    def generarBitacorasEquipoGuia(self, idEquipoGuia):
        self.connectServer()

        try:
            self.cursor.execute("select idBitacora from bitacoraxequipoguia where idEquipoGuia = " + str(idEquipoGuia))

            salida = self.cursor.fetchall()

            lista = []
            for row in salida:
                lista += [self.getBitacora(row[0])]

            return lista
            
            
        except Exception as ex:
            print(ex)

        self.closeConnection()

    def generarBitacorasActividades(self, idActividad):
        self.connectServer()

        try:
            self.cursor.execute("select idBitacora from bitacoraxactividades where idActividad= " + str(idActividad))

            salida = self.cursor.fetchall()

            lista = []
            for row in salida:
                lista += [self.getBitacora(row[0])]

            return lista
            
            
        except Exception as ex:
            print(ex)

        self.closeConnection()

    def getBitacora(self, idBitacora):
        for i in range (len(self.bitacoras)):
            if (self.bitacoras[i].idBitacora == idBitacora):
                return self.bitacoras[i]
        return None 

    #Métodos
    #función que realiza la conexión a MySQL
    def connectServer(self):
        try:
            self.connection = mysql.connector.connect(
                host = 'localhost',
                port = 3306,
                user = 'root',
                password = '123456',
                db = 'orientatec'
            )
            if self.connection.is_connected():
                self.cursor = self.connection.cursor()
                #print("Connection succesful")
        except Exception as ex:
            print(ex)


    #función que cierra la conexión a MySQL
    def closeConnection(self):
        if self.connection!=None:
            self.connection.close()
            #print("Connection closed")

    
    #+getActividades():Collection<Actividad>
    def getActividades(self):
        return self.actividades

    # +getPlanTrabajo():planTrabajo: PlanTrabajo 
    def getPlanTrabajo(self):
        return self.planesTrabajo[-1]

    # +getConformacionEquipoGuía():Collection<Profesores>
    def getConformacionEquipoGuia(self):
        return self.equiposGuia[-1].listaProfesores 
    
    # +agregarProfesor(profesor: Profesor): boolean
    def agregarProfesor(self, profesor, idEquipoGuia):

        args = [profesor.id, idEquipoGuia]

        #se agrega a la bd
        id = self.executeStoredProcedure('createprofesoresxequipoguia', args)
        if(len(id)==1):
            #se agrega al equipo guia del año actual el profesor
            self.equiposGuia[idEquipoGuia-1].agregarProfesor(profesor)
        
        return id
    
    # +verActividad(id): Actividad
    def verActividad(self, id):
        for i in range (len(self.actividades)):
            if (self.actividades[i].idActividad == id):
                return self.actividades[i]
        return None 
    
    #devuelve los comentario de una actividad
    def verComentariosActividad(self, idActividad):
        lista = []
        for i in range (len(self.comentarios)):
            if (self.comentarios[i].idActividad == idActividad):
                lista += [self.comentarios[i]]
        return lista 

    #devuelve la evidencia de una actividad
    def verEvidenciasActividad(self, idActividad):
        lista = []
        for i in range (len(self.evidencias)):
            if (self.evidencias[i].idActividad == idActividad):
                lista += [self.evidencias[i]]
        return lista

    # +agregarActividad(actividad: Actividad): boolean
    def agregarActividad(self, actividad, idPlan):
        
        args = [actividad.idActividad, idPlan]

        #se agrega a la bd
        id = self.executeStoredProcedure('createActividadesxPlan', args)
        
        if(len(id)==1):
            #se agrega al plan la actividad
            for plan in self.planesTrabajo:
                if (plan.idPlan == idPlan):
                    plan.agregarActividad(actividad)
        
        return id
    
    def crearPlanTrabajo(self, anno):
        
        args = [anno]

        #se agrega a la bd
        id = self.executeStoredProcedure('createPlanTrabajo', args)
        
        if(len(id)==1):
            #se obtiene el id y se le agrega
            salida = PlanTrabajo(id[0], anno, []) 

            #se agrega a la lista de planes
            self.planesTrabajo += [salida]
        
        return id

    # +consultarProximaActividad: actividad: Actividad
    def consultarProximaActividad(self):
        # Creando lista de fechas
        fechas = []
        for actividad in self.actividades:
            h = actividad.horaInicio
            fechas += [datetime.combine(actividad.fechaActividad, (datetime.min + h).time())]
                    
        # busca la fecha mas cercana a la actual
        cloz_dict = {
        d.timestamp() - datetime.now().timestamp() : d
        for d in fechas}

        # encontrando la fecha mas cercana
        min = 9000000000000000
        for key in cloz_dict:
            if (key>=0 and key<min):
                min = key

        #obtiene el indice de la actividad que tiene la fecha mas cercana
        index = list(cloz_dict.keys()).index(min)
        
        return self.actividades[index]

    # +modificarActividad(data): boolean
    def modificarActividad(self, idActividad, nombreActividad,
                            tipoActividad, fechaActividad, horaInicio,
                            horaFin, recordatorio, medio, enlace,
                            estado):
        
        ultimaModificacion = date.today()
        
        args = [idActividad, nombreActividad, tipoActividad, fechaActividad, horaInicio,
                horaFin, recordatorio, medio, enlace, estado, ultimaModificacion]

        #se modifica en la bd
        respuesta = self.executeStoredProcedure('updateActividad', args)

        #Si no hubo errores dentro de la BD, realiza las modificaciones correspondientes
        if (respuesta == None):
            #se modifica en lista
            for i in range(len(self.actividades)):
                if (self.actividades[i].idActividad == idActividad):
                    if (nombreActividad != None):
                        self.actividades[i].nombreActividad = nombreActividad
                    if (tipoActividad != None):
                        self.actividades[i].tipoActividad = tipoActividad
                    if (fechaActividad != None):
                        self.actividades[i].fechaActividad = fechaActividad
                    if (horaInicio != None):
                        self.actividades[i].horaInicio = horaInicio
                    if (horaFin != None):
                        self.actividades[i].horaFin = horaFin
                    if (recordatorio != None):
                        self.actividades[i].recordatorio = recordatorio
                    if (medio != None):
                        self.actividades[i].medio = medio
                    if (enlace != None):
                        self.actividades[i].enlace = enlace
                    if (estado != None):
                        self.actividades[i].estado = estado
                    if (ultimaModificacion != None):
                        self.actividades[i].ultimaModificacion = ultimaModificacion
                
        return respuesta
    
    def agregarResponsablesActividad(self, idActividad, responsablesNuevos):
        actividad = None
        #se obtiene la actividad
        for ac in self.actividades:
            if (ac.idActividad == idActividad):
                actividad = ac

        for responsable in responsablesNuevos:
            #agregar en tabla responsablexactividad
            self.executeStoredProcedure("createResponsableXActividad", [responsable.id, idActividad])

            #agregar a la actividad el responsable
            actividad.agregarResponsable(responsable)

    def quitarResponsablesActividad(self, idActividad, responsablesEliminados):
        actividad = None
        #se obtiene la actividad
        for ac in self.actividades:
            if (ac.idActividad == idActividad):
                actividad = ac

        for responsable in responsablesEliminados:
            #quitar en tabla responsablexactividad
            self.executeStoredProcedure("quitarResponsablesActividad", [responsable.id, idActividad])

            #quita a la actividad el responsable
            actividad.quitarResponsable(responsable)
            
    def bitacoraEquipoGuia(self, fecha, hora, idAutor, descripcion):
        #crear bitacora
        idBitacora = self.executeStoredProcedure("createBitacora", [fecha, hora, idAutor, descripcion])

        if (len(idBitacora) == 1):
            #insertar en la lista del singleton
            bitacora = Bitacora(idBitacora[0], fecha, hora, idAutor, descripcion)

            self.bitacoras += [bitacora]

            #crear bitacoraxequipoguia
            self.executeStoredProcedure("modificarEquipoGuia", [date.today().year, idBitacora[0]])

            #insertar en modificaciones del equipo guia
            self.equiposGuia[-1].agregarModificacion(bitacora)

    def bitacoraActividad(self, idActividad, fecha, hora, idAutor, descripcion):
        #crear bitacora
        idBitacora = self.executeStoredProcedure("createBitacora", [fecha, hora, idAutor, descripcion])

        if (len(idBitacora) == 1):
            #insertar en la lista del singleton
            bitacora = Bitacora(idBitacora[0], fecha, hora, idAutor, descripcion)

            self.bitacoras += [bitacora]

            #crear bitacoraxactividad
            self.executeStoredProcedure("createbitacoraxactividades", [idActividad, idBitacora[0]])

            #insertar en modificaciones de la actividad
            self.verActividad(idActividad).agregarModificacion(bitacora)



    # +cancelarActividad(): boolean, se hizo crear observacion, ya que para modificar el estado de una actividad se hace con modificarActividad()
    def crearObservacion(self, idActividad, fechaCancelacion, detalle):
        
        args = [idActividad, fechaCancelacion, detalle]

        #se agrega a la bd
        id = self.executeStoredProcedure('createObservacion', args)
        
        #si no hubo errores
        if (len(id) == 1):
            #creamos el objeto
            objeto = Observacion(idActividad, fechaCancelacion, detalle) 

            #se agrega a la lista de Observaciones
            self.observaciones += [objeto]
            print(objeto, ", len: ",len(self.observaciones))
        else:
            return id

    # +publicarActividad(data): boolean
    def publicarActividad(self, idActividad):
        respuesta = self.modificarActividad(idActividad, None, None, None, None, None, None,None, None, None, 2, None)

        if (respuesta == None):
            for actividad in self.actividades:
                if (actividad.idActividad == idActividad):
                    actividad.estado = 2

        return respuesta

    # +crearActividad(data): void
    def crearActividad(self, nombreActividad, tipoActividad, fechaActividad,
                horaInicio, horaFin, recordatorio, responsables, medio,  
                enlace, estado):
        
        ultimaModificacion = date.today()

        args = [nombreActividad, tipoActividad, fechaActividad,
                horaInicio, horaFin, recordatorio, medio,  
                enlace, estado, ultimaModificacion]

        #se agrega a la bd
        id = self.executeStoredProcedure('createActividad', args)
        if(len(id)==1):
            #se obtiene el id y se le agrega
            salida = Actividad.Actividad(id[0], nombreActividad, tipoActividad, fechaActividad,
                    horaInicio, horaFin, recordatorio, [], medio,  
                    enlace, estado, ultimaModificacion, [])

            #se agrega a la lista de Actividades
            self.actividades += [salida]

            self.agregarResponsablesActividad(id[0], responsables)
        
        return id


    def crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado):

        args = [cedula, nombre, apellido1, 
                apellido2, sede, numeroCelular, correoElectronico, 
                numeroOficina, autoridad, estado]

        #se agrega a la bd
        id = self.executeStoredProcedure('createProfesor', args)
        if(len(id)==1):
            #se obtiene el id y se le agrega
            prof = Profesor(self.generarCodigoProfesor(sede,id[0]), id[0], cedula, nombre, apellido1, 
                apellido2, sede, numeroCelular, correoElectronico, 
                numeroOficina, autoridad, estado) 
            #se agrega a la lista de Actividades
            self.profesores += [prof]
        
        return id

    
    # +modificarProfesor(idProfesor, ): boolean
    def modificarProfesor(self, id, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado):
        
        args = [id,cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                correoElectronico, numeroOficina,autoridad, estado]

        #se modifica en la bd
        respuesta = self.executeStoredProcedure('updateProfesor', args)

        #Si no hubo errores dentro de la BD, realiza las modificaciones correspondientes
        if (respuesta == None):
            #se modifica en lista
            for i in range(len(self.profesores)):
                if (self.profesores[i].id == id):
                    if (cedula != None):
                        self.profesores[i].cedula = cedula
                    if (nombre != None):
                        self.profesores[i].nombre = nombre
                    if (apellido1 != None):
                        self.profesores[i].apellido1 = apellido1
                    if (apellido2 != None):
                        self.profesores[i].apellido2 = apellido2
                    if (sede != None):
                        self.profesores[i].sede = sede
                        self.profesores[i].codigo = self.generarCodigoProfesor(sede,self.profesores[i].id)
                    if (numeroCelular != None):
                        self.profesores[i].numeroCelular = numeroCelular
                    if (correoElectronico != None):
                        self.modificarUsuarioCorreo(self.profesores[i].correoElectronico, correoElectronico)
                        self.profesores[i].correoElectronico = correoElectronico
                    if (numeroOficina != None):
                        self.profesores[i].numeroOficina = numeroOficina
                    if (autoridad != None):
                        self.profesores[i].autoridad = autoridad
                    if (estado != None):
                        self.profesores[i].estado = estado
        return respuesta

    # +darBajaProfesor(idProfesor: int): boolean
    def darBajaProfesor(self, idProfesor):
        
        #borra en la BD que un profesor corresponda al equipo guia actual
        respuesta = self.executeStoredProcedure("darDeBaja", [idProfesor])

        #borar al profesor de la lista del equipo guia actual
        for profesor in self.equiposGuia[-1].listaProfesores:
            if (profesor.id == idProfesor):
                self.equiposGuia[-1].listaProfesores.remove(profesor)

        #cambia el estado del profesor
        self.modificarProfesor(idProfesor, None,None,None, None, None, None, None, None,None, 2)

        return respuesta
    
    # +crearComentario(comentario):void
    def crearComentario(self, idActividad,autor,fechaHora, contenido, idComentarioPadre):
        
        args = [idActividad,autor,fechaHora,contenido, idComentarioPadre]

        #se agrega a la bd
        id = self.executeStoredProcedure('createComentario', args)
        if(len(id)==1):
            #se obtiene el id y se le agrega
            salida = Comentario(idActividad,autor,fechaHora,contenido, idComentarioPadre)

            #se agrega a la lista de Actividades
            self.comentarios += [salida]
        
        return id

    # +crearEvidencia(): boolean
    def crearEvidencia(self, idActividad,linkGrabacion):
        args = [idActividad,linkGrabacion]

        #se agrega a la bd
        id = self.executeStoredProcedure('createEvidencia', args)
        
        if(len(id)==1):
            salida = Evidencia(idActividad,linkGrabacion)

            #se agrega a la lista de Actividades
            self.evidencias += [salida]
        
        return id

    # +getProfesor(id:int):profesor:Profesor
    def getProfesor(self, idProfesor):
        for prof in self.profesores:
            if(prof.id == idProfesor):
                return prof

    # +consultarEstudiantes(ordenamiento: enum): Collection<Estudiante>
    def consultarEstudiantes(self):
        return self.estudiantes

    # +buscarEstudiante(id:int) : Estudiante
    def buscarEstudiante(self, carnet):
        for estudiante in self.estudiantes:
            if (int(carnet) == estudiante.carnet):
                return estudiante
        return None

    # +modificarEstudiante(estudiante Estudiante): boolean
    def modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, numeroCelular, estado):
        
        args = [carnet, nombre, apellido1, apellido2, sede,  numeroCelular,
                correoElectronico, estado]
        
        #se modifica en la bd
        respuesta = self.executeStoredProcedure('updateEstudiante', args)

        #Si no hubo errores dentro de la BD, realiza las modificaciones correspondientes
        if (respuesta == None):
            #se modifica en lista

            for i in range(len(self.estudiantes)):
                if (self.estudiantes[i].carnet == carnet):
                    if (carnet != None):
                        self.estudiantes[i].carnet = carnet
                    if (nombre != None):
                        self.estudiantes[i].nombre = nombre
                    if (apellido1 != None):
                        self.estudiantes[i].apellido1 = apellido1
                    if (apellido2 != None):
                        self.estudiantes[i].apellido2 = apellido2
                    if (sede != None):
                        self.estudiantes[i].sede = sede
                    if (correoElectronico != None):
                        self.modificarUsuarioCorreo(self.estudiantes[i].correoElectronico, correoElectronico)
                        self.estudiantes[i].correoElectronico = correoElectronico
                    if (numeroCelular != None):
                        self.estudiantes[i].numeroCelular = numeroCelular
        return respuesta

    #modificarUsuario(data):id
    def modificarUsuario(self, idUsuario, correoElectronico, contrasenha, idRol):
        
        args = [idUsuario, correoElectronico, contrasenha, idRol]
        
        #se modifica en la bd
        respuesta = self.executeStoredProcedure('updateUsuario', args)

        #Si no hubo errores dentro de la BD, realiza las modificaciones correspondientes
        if (respuesta == None):
            #se modifica en lista

            for i in range(len(self.usuarios)):
                if (self.usuarios[i].idUsuario == idUsuario):
                    if (correoElectronico != None):
                        self.usuarios[i].correo = correoElectronico
                    if (contrasenha != None):
                        self.usuarios[i].contrasenha = contrasenha
                    if (idRol != None):
                        self.usuarios[i].idRol = idRol
        return respuesta

    #+crearUsuario(data):id
    def crearUsuario(self, correoElectronico, contrasenha, idRol):
        args = [correoElectronico, contrasenha, idRol]

        #se agrega a la bd
        id = self.executeStoredProcedure('createUsuario', args)
        
        if(len(id)==1):
            salida = Usuario(id[0], correoElectronico, contrasenha, idRol)

            #se agrega a la lista de Actividades
            self.usuarios += [salida]
        
        return id

    #+getUsuario(id):usuario
    def getUsuario(self, idUsuario):
        for user in self.usuarios:
            if(user.idUsuario == idUsuario):
                return user

    #getUsuarios():Collection<Usuario>
    def getUsuarios(self):
        return self.usuarios
    
    def modificarUsuarioCorreo(self, correoAnterior, correoNuevo):        
        for user in self.usuarios:
            if (user.correo == correoAnterior):
                self.modificarUsuario(user.idUsuario, correoNuevo, None, None)


    #ejecuta un procedimiento almacenado y devuelve una lista con resultados
    def executeStoredProcedure(self, storedProcName, args):
        self.connectServer()

        try:
            self.cursor.callproc(storedProcName, args)
            self.connection.commit()
            for result in self.cursor.stored_results():
                out = result.fetchall()
                return out[0]
                
        except Exception as ex:
            print(ex)

        self.closeConnection()





