from SingletonDAO import *
from PublisherActividades import * #servicio del publicador

class AdminActividades:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()
        self.publicador = PublisherActividades()

    #Metodos
    #Devuelve una Actividad
    def verActividad(self, idActividad):
        return self.dao.verActividad(idActividad)
    
    def modificarActividad(self, idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
                    horaFin, recordatorio, medio, enlace,estado):
        return self.dao.modificarActividad(idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
                    horaFin, recordatorio, medio, enlace,estado)
    
    def crearEvidencia(self, idActividad, enlace):
        return self.dao.crearEvidencia(idActividad, enlace)
    
    def getEvidencia(self, idActividad):
        return self.dao.getEvidencia(idActividad)
    
    def cancelarActividad(self, idActividad):
        return self.dao.modificarActividad(idActividad, None,None, None, None, None, None, None, None, 4)
    
    def crearActividad(self, nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
                       recordatorio, responsables, medio,enlace, estado):
        return self.dao.crearActividad(nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
                       recordatorio, responsables, medio,enlace, estado)
    
    def cambiarEstado(self, idActividad, idEstado):
        return self.dao.modificarActividad(idActividad, None,None, None, None, None, None, None, None, idEstado)


    def registrarFotoAfiche(self,idActividad,image):
        self.dao.registrarFotoAfiche(idActividad,image)

    def registrarFotoEvLista(self,idEvidencia,image):
        self.dao.registrarFotoEvLista(idEvidencia,image)

    def registrarFotoEv(self,idEvidencia,image):
        self.dao.registrarFotoEv(idEvidencia,image)

    def setFotoAfiche(self,idBuscado, image):
        self.dao.setFotoAfiche(idBuscado, image)
    
    def getFotoAfiche(self,idBuscado):
        return self.dao.getFotoAfiche(idBuscado)

    def getEvLista(self,idBuscado):
        return self.dao.getEvLista(idBuscado)

    def getFotoEv(self, idBuscado):
        return self.dao.getFotoEv(idBuscado)
    
    #devuelve una Actividad, sus comentarios e evidencias
    def getDetalleActividad(self, idActividad):
        lista = []
        lista += [self.dao.verActividad(idActividad)]
        lista += [self.dao.verComentariosActividad(idActividad)]
        lista += [self.dao.verEvidenciasActividad(idActividad)]
        return lista
            
    def getPublicador(self):
        return self.publicador #getPublicador para suscribir o desuscribir, si es que aplica aquí

    def escribirComentario(self, idActividad,autor,fechaHora, contenido, idComentarioPadre):
        return self.dao.crearComentario(idActividad,autor,fechaHora, contenido, idComentarioPadre)

    def finalizarActividad(self, idActividad,linkGrabacion):
        respuesta = self.cambiarEstado(idActividad, 3) #actualiza la actividad
        if (respuesta == None):#crea las evidencias
            return self.dao.crearEvidencia(idActividad,linkGrabacion)
        return respuesta #si hay un error actualizando la actividad no crea evidencias y devuelve el error
    
    def agregarResponsablesActividad(self, idActividad, responsablesNuevos):
        return self.dao.agregarResponsablesActividad(idActividad, responsablesNuevos)

    def quitarResponsablesActividad(self, idActividad, responsablesEliminados):
        return self.dao.quitarResponsablesActividad(idActividad, responsablesEliminados)
    
    #Crear Observación
    def crearObservacion(self, idActividad, fechaCancelacion, detalle):
        return self.dao.crearObservacion(idActividad, fechaCancelacion, detalle)
            
    def bitacoraActividad(self, idActividad, fecha, hora, idAutor, descripcion):
        return self.dao.bitacoraActividad(idActividad, fecha, hora, idAutor, descripcion)
