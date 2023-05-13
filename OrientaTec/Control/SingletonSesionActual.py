from SingletonDAO import SingletonMeta

class SingletonSesionActual(metaclass=SingletonMeta):
    usuario = None #aqui se guarda el profesor, asistente o estudiante que inicie sesion


    def setUsuario(self, usuario):
        self.usuario = usuario

    def getUsuario(self):
        return self.usuario