from SingletonDAO import *
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

    def modificarUsuario(self, idUsuario, correoElectronico, contrasenha, idRol):
        return self.dao.modificarUsuario(idUsuario, correoElectronico, contrasenha, idRol)
    
    
    def crearUsuario(self, correoElectronico, contrasenha, idRol):
        return self.dao.crearUsuario(correoElectronico, contrasenha, idRol)
    
    def getUsuario(self, idUsuario):
        return self.dao.getUsuario(idUsuario)