import Funcionario 
#Asistente y profesor heredan de funcionario
class Profesor(Funcionario):
    def __init__(self,codigo,cedula,nombre,
    apellido1, apellido2, sede, numeroCelular,
    correoElectronico, fotografia, numeroOficina,
    autoridad):
        Funcionario.__init__(self, codigo,cedula,nombre,
        apellido1, apellido2, sede, numeroCelular,
        correoElectronico, fotografia, numeroOficina)
        self.autoridad = autoridad

'''def _init_(self,codigo,cedula,nombre,
    apellido1, apellido2, sede, numeroCelular,
    correoElectronico, fotografia, numeroOficina):
        self.codigo = codigo
        self.cedula = cedula
        self.nombre = nombre
        self.apellido1 = apellido1
        self.apellido2 = apellido2
        self.sede = sede
        self.numeroCelular = numeroCelular
        self.correoElectronico = correoElectronico
        self.fotografia = fotografia #Acá se va a guardar el id de MongoDB
        self.numeroOficina = numeroOficina

'''
    