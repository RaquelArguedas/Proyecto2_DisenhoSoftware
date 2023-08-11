from SingletonDAO import *
from SingletonSesionActual import *
from AdminUsuario import *

class PublisherActividades:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()
        self.admUsuario = AdminUsuario()
        self.suscriptores = self.admUsuario.getUsuariosPermiteNotis()

    #Métodos
    def suscribir(self, usuarioSub):
        if not(usuarioSub in self.suscriptores):
            self.suscriptores.append(usuarioSub)
    
    def desuscribir(self, usuarioSub):
        if (usuarioSub in self.suscriptores):
            self.suscriptores.remove(usuarioSub)

    def notificar(self, idNotificacion):
        for sub in self.suscriptores:
            self.admUsuario.notificacionUsuarios(idNotificacion, sub.idUsuario) #predispuesto
