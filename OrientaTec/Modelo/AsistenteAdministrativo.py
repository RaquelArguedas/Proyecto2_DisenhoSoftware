from Funcionario import Funcionario
#Asistente y profesor heredan de funcionario
class AsistenteAdministrativo(Funcionario):
    def __init__(self,codigo,cedula,nombre,
    apellido1, apellido2, sede, numeroCelular,
    correoElectronico, fotografia, numeroOficina):
        super().__init__(codigo,cedula,nombre,
        apellido1, apellido2, sede, numeroCelular,
        correoElectronico, fotografia, numeroOficina)