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
    
    def getProfesorCodigo(self, codigo):
        return self.dao.getProfesorCodigo(codigo)
    
    def getProfesorCedula(self, cedula):
        return self.dao.getProfesorCedula(cedula)

    def crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado):
        return self.dao.crearProfesor(cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado)
    
    #fotos
    def registrarFotoProfesor(self,idProfe,bin):
        self.dao.registrarFotoProfesor(idProfe, bin)

    def getFotoProfesor(self,idProfe):
        return self.dao.getFotoProfesor(idProfe)
    
    
    def getProfesorCorreo(self, correo):
        profesores = self.dao.getAllProfesores()
        for prof in profesores:
            if (prof.correoElectronico == correo):
                return prof
    
    #Uso de chats 
    def escribirMensaje(self, idChat,idAutor,fechaHora, contenido):
        
        return self.dao.escribirMensaje(idChat,idAutor,fechaHora, contenido)

