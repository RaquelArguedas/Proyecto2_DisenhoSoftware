from SingletonDAO import *
class AdminEquipoGuia:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Metodos    
    def agregarProfesor(self, profesor, idEquipoGuia):
        return self.dao.agregarProfesor(profesor, idEquipoGuia)
        

    def getEquipoGuia(self):
        return self.dao.getConformacionEquipoGuia()