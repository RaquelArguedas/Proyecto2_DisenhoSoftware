from SingletonDAO import *
from SingletonSesionActual import *
from AdminUsuario import *

ACTIVIDAD = 0 #para no hacer un enum, o dos métodos distintos

class PublisherActividades:
    #Constructor
    def __init__(self):
        self.admUsuario = AdminUsuario()
        self.suscriptores = self.admUsuario.getSuscriptores(ACTIVIDAD)

    #Métodos
    def suscribir(self, usuarioSub):
        self.suscriptores.append(usuarioSub)
    
    def desuscribir(self, usuarioSub):
        self.suscriptores.remove(usuarioSub)

    def notificar(self, aviso):
        for sub in self.suscriptores:
            self.admUsuario.notificar(sub, aviso) #predispuesto
     