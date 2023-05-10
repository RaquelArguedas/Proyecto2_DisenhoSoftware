from SingletonDAO import *
class AdminEquipoGuia:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Metodos    
    def agregarProfesor(self, profesor):
        return self.dao.agregarProfesor(profesor)
        

    def getEquipoGuia(self):
        return self.dao.getConformacionEquipoGuia()
    
    def bitacoraEquipoGuia(self, fecha, hora, idAutor, descripcion):
        return self.dao.bitacoraEquipoGuia(fecha, hora, idAutor, descripcion)