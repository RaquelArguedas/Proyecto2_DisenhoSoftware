from SingletonDAO import *
from Modelo.Sede import *
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
    
    #PENDIENTE
    def generarExcelEstudiantes(self,sede):
        numSede = 0
        if sede == Sede.SJ: numSede = 1
        if sede == Sede.CA: numSede = 2
        if sede == Sede.SC: numSede = 3
        if sede == Sede.AL: numSede = 4
        if sede == Sede.LI: numSede = 5

        if numSede == 0:
            return self.dao.generarExcelTodos()
        else:
            return self.dao.generarExcelSede(numSede)
        
    def cargarExcelEstudiantes(self):
        return self.dao.cargarExcel(self)
    
    def cargarExcelEstudiantes(self):
        return False
    
    def buscarEstudiante(self, carnet):
        return self.dao.buscarEstudiante(carnet)