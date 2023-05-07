from SingletonDAO import SingletonMeta

class SingletonSesionActual(metaclass=SingletonMeta):
    usuario = None #aqui se guarda el profesor, asistente o estudiante que inicie sesion


    def setUsuario(self, person):
        self.usuario = person

    def getUsuario(self):
        return self.usuario