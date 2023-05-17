from Funcionario import Funcionario
#Asistente y profesor heredan de funcionario
class AsistenteAdministrativo(Funcionario):
    def __init__(self,id,cedula,nombre,
    apellido1, apellido2, sede, numeroCelular,
    correoElectronico,numeroOficina):
        super().__init__(id,cedula,nombre,
        apellido1, apellido2, sede, numeroCelular,
        correoElectronico, numeroOficina)