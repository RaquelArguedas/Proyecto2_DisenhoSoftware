class Usuario:
    def __init__(self, idUsuario, correo, contrasenha, idRol, idSede):
        self.idUsuario = idUsuario
        self.correo = correo
        self.contrasenha = contrasenha
        self.idRol = idRol
        self.idSede = idSede

    def setContrasenha(self, contrasenha):
        self.contrasenha = contrasenha