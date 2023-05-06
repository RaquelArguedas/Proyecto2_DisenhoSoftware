from SingletonDAO import *
class AdminProfesores:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Metodos    
    def darBajaProfesor(self, idProfesor):
        return self.dao.darBajaProfesor(idProfesor)

    def designarCoordinador(self, idProfesor):
        #actualiza el profesor designado con autoridad en 2
        return self.dao.modificarProfesor(idProfesor, None,None,None, None, None, None, None,None,1, None)

    def modificarProfesor(self, codigo, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado):
        return self.dao.modificarProfesor(codigo, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado)
        
    def getProfesor(self, idProfesor):
        return self.dao.getProfesor(idProfesor)

    def crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado):
        return self.dao.crearProfesor(cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado)

