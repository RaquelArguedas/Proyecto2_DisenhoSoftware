class Usuario:
    def __init__(self, idUsuario, correo, contrasenha, idRol, idSede, permiteNotis, permiteChats, notificaciones):
        self.idUsuario = idUsuario
        self.correo = correo
        self.contrasenha = contrasenha
        self.idRol = idRol
        self.idSede = idSede
        self.permiteNotis = permiteNotis
        self.permiteChats = permiteChats
        self.notificaciones = notificaciones

    def setContrasenha(self, contrasenha):
        self.contrasenha = contrasenha

    def setPermiteNotis(self, permiteNotis):
        self.permiteNotis = permiteNotis

    def setPermiteChats(self, permiteChats):
        self.permiteChats = permiteChats

    def getPermiteNotis(self):
       return self.permiteNotis

    def getPermiteChats(self):
        return self.permiteChats
    
    def __str__(self):
        return f"Usuario(idUsuario={self.idUsuario}, correo='{self.correo}', contrasenha='{self.contrasenha}', " \
               f"idRol={self.idRol}, idSede={self.idSede}, permiteNotis={self.permiteNotis}, " \
               f"permiteChats={self.permiteChats}, notificaciones={self.notificaciones})"