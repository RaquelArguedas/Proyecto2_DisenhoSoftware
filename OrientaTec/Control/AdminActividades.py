from SingletonDAO import *
class AdminActividades:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Metodos
    #Devuelve una Actividad
    def verActividad(self, idActividad):
        return self.dao.verActividad(idActividad)
    
    def modificarActividad(self, idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
                    horaFin, recordatorio,responsables, medio, enlace,estado):
        return self.dao.modificarActividad(idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
                    horaFin, recordatorio,responsables, medio, enlace,estado)
    
    def cancelarActividad(self, idActividad):
        return self.dao.modificarActividad(idActividad, None,None, None, None,
                    None, None,None, None, None,4, None)
    
    def crearActividad(self, nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
                       recordatorio, medio,enlace, estado, ultimaModificacion ):
        return self.dao.crearActividad(nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
                       recordatorio, medio,enlace, estado, ultimaModificacion)
    
    def cambiarEstado(self, idActividad, idEstado):
        return self.dao.modificarActividad(idActividad, None,None, None, None,
                    None, None,None, None, None, idEstado, None)

    #devuelve una Actividad, sus comentarios e evidencias
    def getDetalleActividad(self, idActividad):
        lista = []
        lista += [self.dao.verActividad(idActividad)]
        lista += [self.dao.verComentariosActividad(idActividad)]
        lista += [self.dao.verEvidenciasActividad(idActividad)]
        return lista
            
    def escribirComentario(self, idActividad,autor,fechaHora, contenido, idComentarioPadre):
        return self.dao.crearComentario(idActividad,autor,fechaHora, contenido, idComentarioPadre)

    def finalizarActividad(self, idActividad,linkGrabacion):
        respuesta = self.cambiarEstado(idActividad, 3) #actualiza la actividad
        if (respuesta == None):#crea las evidencias
            return self.dao.crearEvidencia(idActividad,linkGrabacion)
        return respuesta #si hay un error actualizando la actividad no crea evidencias y devuelve el error
