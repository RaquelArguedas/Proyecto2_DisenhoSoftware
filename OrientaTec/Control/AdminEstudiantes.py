from SingletonDAO import *
class AdminEstudiantes:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Metodos
    def consultarEstudiantes(self, ):
        return self.dao.consultarEstudiantes()
    
    def modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, 
                            numeroCelular, estado):
        return self.dao.modificarEstudiante(carnet, nombre,apellido1, apellido2, sede, correoElectronico, 
                                            numeroCelular, estado)
    
    #PENDIENTE
    def generarExcelEstudiantes(self):
        return False
    
    def buscarEstudiante(self, carnet):
        return self.dao.buscarEstudiante(carnet)