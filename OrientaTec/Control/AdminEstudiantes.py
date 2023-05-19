from SingletonDAO import *
class AdminEstudiantes:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Metodos
    def consultarEstudiantes(self, ordenamiento):        
        if (type (ordenamiento) == int):
            ordenamiento = Ordenamiento(ordenamiento) 
        if (ordenamiento == Ordenamiento.SEDE):
            salida = sorted(self.dao.consultarEstudiantes(), key=lambda estudiante : estudiante.sede)
            return salida
        if (ordenamiento == Ordenamiento.ALFABETICAMENTE):
            salida = sorted(self.dao.consultarEstudiantes(), key=lambda estudiante : estudiante.nombre)
            return salida
        if(ordenamiento == Ordenamiento.CARNET):
            salida = sorted(self.dao.consultarEstudiantes(), key=lambda estudiante : estudiante.carnet)
            return salida

    def ordenarSede(self, estudiantes):
        salida = []
        for i in range(1, 6): #para cada sede
            for estudiante in estudiantes: 
                if estudiante.sede == i:
                    salida += [estudiante]
        return salida
    
    def ordenarAlfabeticamente(self, estudiantes):
        salida = []
        return salida
    
    def ordenarCarnet(self, estudiantes):
        return None
    
    def modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, 
                            numeroCelular, estado):
        return self.dao.modificarEstudiante(carnet, nombre,apellido1, apellido2, sede, correoElectronico, 
                                            numeroCelular, estado)
    
    def generarExcelEstudiantes(self,sede):
            return self.dao.generarExcelSede(sede)
    
    def cargarExcelEstudiantes(self,nombArchivo):
        return self.dao.cargarExcel(nombArchivo)
    
    def buscarEstudiante(self, carnet):
        return self.dao.buscarEstudiante(carnet)