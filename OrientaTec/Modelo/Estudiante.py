class Estudiante:
    def __init__(self,carnet, nombre,apellido1,
    apellido2, sede, numeroCelular,correoElectronico, estado):
        self.carnet = carnet
        self.nombre = nombre
        self.apellido1 = apellido1
        self.apellido2 = apellido2
        self.sede = sede
        self.numeroCelular = numeroCelular
        self.correoElectronico = correoElectronico
        self.estado = estado

    def __str__(self):
        return f'Carnet: {self.carnet} ,  nombre: {self.nombre},  apellido1: {self.apellido1},  apellido2: {self.apellido2},  sede: {self.sede},  numeroCelular: {self.numeroCelular},  correoElectronico: {self.correoElectronico}'
    