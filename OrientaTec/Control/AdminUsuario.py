from SingletonDAO import *
from SingletonSesionActual import *

class AdminUsuario:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Métodos
    def exists(self, correo, contrasenha):
        usuarios = self.dao.getUsuarios()
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
    def getUsuariosPermiteNotis(self):
        usuarios = self.dao.getUsuarios()
        lista = []
        for user in usuarios:
            if (user.permiteNotis == True):
                lista.append(user)
        return lista
    
    def getUsuariosPermiteChats(self):
        usuarios = self.dao.getUsuarios()
        lista = []
        for user in usuarios:
            
            if (user.permiteChats == True):
                lista.append(user)
        return lista

    def deleteNotificacionUsuario(self, idNotificacion, idUsuario):
        return self.dao.deleteNotificacionUsuario(idNotificacion, idUsuario)

    def deleteNotificacionesUsuario(self, idUsuario):
        return self.dao.deleteNotificacionesUsuario(idUsuario)

    def cambiarLeida(self, idNotificacion, idUsuario):
        return self.dao.cambiarLeida(idNotificacion, idUsuario)

    def todasLeidas(self, idUsuario, leidas):
        return self.dao.todasLeidas(idUsuario, leidas)

    def createNotificacion(self, idEmisor, fechaHora, contenido, tipoEmisor):
        return self.dao.createNotificacion(idEmisor, fechaHora, contenido, tipoEmisor)
    
    def notificacionUsuarios(self, idNotificacion, idUsuario):
        return self.dao.notificacionUsuarios(idNotificacion, idUsuario)
    
    def getIdUsuario(self, usuario):
        return self.dao.getIdUsuario(usuario)
    
    def getChats(self,idUsuario):
        return self.dao.getChats(idUsuario)

    def getMensajes(self,idChat):
        return self.dao.getMensajes(idChat) 
    
    
    def getUsuarioNombre(self,idUsuario):
        return self.dao.getUsuarioNombre(idUsuario)
    
    def generarMiembros(self, idChat):
        return self.dao.generarMiembros(idChat) 

    def salirChat(self, idChat,idUsuario):
        return self.dao.salirChat(idChat,idUsuario)
