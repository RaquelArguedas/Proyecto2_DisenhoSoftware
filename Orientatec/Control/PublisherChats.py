from SingletonDAO import *
from SingletonSesionActual import *
from AdminUsuario import *

class PublisherChats:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()
        self.admUsuario = AdminUsuario()
        self.suscriptores = self.admUsuario.getUsuariosPermiteChats()

    #Métodos
    def suscribir(self, usuarioSub):
        if not(usuarioSub in self.suscriptores):
            self.suscriptores.append(usuarioSub)
    
    def desuscribir(self, usuarioSub):
        if (usuarioSub in self.suscriptores):
            self.suscriptores.remove(usuarioSub)

    def notificar(self, idNotificacion, miembros):
        for sub in self.suscriptores:
            if (sub.idUsuario in miembros):
                self.admUsuario.notificacionUsuarios(idNotificacion, sub.idUsuario)