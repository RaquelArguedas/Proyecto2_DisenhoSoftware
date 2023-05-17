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
    
    def getAllProfesores(self):
        return self.dao.getAllProfesores()
    
    def getAllAsistentes(self):
        return self.dao.getAllAsistentes()
    
    def bitacoraEquipoGuia(self, fecha, hora, idAutor, descripcion):
        return self.dao.bitacoraEquipoGuia(fecha, hora, idAutor, descripcion)
    
    def getAsistenteCorreo(self, correo):
        asistentes = self.dao.getAllAsistentes()
        for asintente in asistentes:
            if (asintente.correoElectronico == correo):
                return asintente
            
    def modificarAsistente(self, id, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina):
        return self.dao.modificarAsistente(id, cedula,nombre,apellido1, apellido2, sede, 
                                           numeroCelular,correoElectronico, numeroOficina)