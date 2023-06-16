from Usuario import Usuario

class EstudianteAdapter(Usuario):
    def __init__(self,carnet,correoElectronico, idRol, idSede):
        self.correo = correoElectronico
        self.contrasenha = carnet
        self.idRol = idRol
        self.idSede = idSede

    def setContrasenha(self, contrasenha):
        self.contrasenha = contrasenha

    def getUsername(self):
        return self.correoElectronico
    
    def getPassword(self):
        return self.carnet
    