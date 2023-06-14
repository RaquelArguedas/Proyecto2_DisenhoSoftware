from SingletonDAO import SingletonMeta
from datetime import datetime, timedelta

class SingletonSesionActual(metaclass=SingletonMeta):
    usuario = None #aqui se guarda el profesor, asistente o estudiante que inicie sesion
    fechaActual = datetime.now() - timedelta(days=1)


    def setUsuario(self, usuario):
        self.usuario = usuario

    def getUsuario(self):
        return self.usuario
    
    def setFechaActual(self, fechaActual):
        self.fechaActual = fechaActual
    
    def getFechaActual(self):
        return self.fechaActual