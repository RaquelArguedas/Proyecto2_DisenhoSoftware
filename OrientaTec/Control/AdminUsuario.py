from SingletonDAO import *
from SingletonSesionActual import *

class AdminUsuario:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Métodos
    def exists(self, correo, contrasenha):
        usuarios = self.dao.getUsuarios()
        print('AdmUsuario, Usuarios: ', usuarios)
        for user in usuarios:
            if (user.correo == correo and user.contrasenha == contrasenha):
                return True
        return False
    
    def correoRegistrado(self, correo):
        usuarios = self.dao.getUsuarios()
        for user in usuarios:
            if (user.correo == correo):
                return True
        return False

    def modificarUsuario(self, idUsuario, correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats):
        return self.dao.modificarUsuario(idUsuario, correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats)
    
    
    def crearUsuario(self, correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats):
        return self.dao.crearUsuario(correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats)
    
    def getUsuario(self, idUsuario):
        return self.dao.getUsuario(idUsuario)
    
    def getUsuarioCorreo(self, correo):
        usuarios = self.dao.getUsuarios()
        for user in usuarios:
            if (user.correo == correo):
                return user
        return False
    
    def getUsuarioRol(self, correo, contrasenha):
        usuarios = self.dao.getUsuarios()
        for user in usuarios:
            if (user.correo == correo and user.contrasenha == contrasenha):
                return user.idRol
        return -1
    
    #funciones de las notificaciones
    def deleteNotificacionUsuario(self, idNotificacion, idUsuario):
        return self.dao.deleteNotificacionUsuario(idNotificacion, idUsuario)

    def deleteNotificacionesUsuario(self, idUsuario):
        return self.dao.deleteNotificacionesUsuario(idUsuario)

    def cambiarLeida(self, idNotificacion, idUsuario):
        return self.dao.cambiarLeida(idNotificacion, idUsuario)

    def todasLeidas(self, idUsuario, leidas):
        return self.dao.todasLeidas(idUsuario, leidas)

    def createNotificacion(self, idUsuarioEmisor, fechaHora, contenido):
        return self.dao.createNotificacion(idUsuarioEmisor, fechaHora, contenido)
    
    def notificacionUsuarios(self, idNotificacion, idUsuario):
        return self.dao.notificacionUsuarios(idNotificacion, idUsuario)

    
    
    