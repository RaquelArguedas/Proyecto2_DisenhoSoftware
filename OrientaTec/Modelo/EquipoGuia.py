import Profesor
class EquipoGuia:
    def __init__(self, coordinador,modificaciones, listaProfesores, anho):
        self.coordinador = coordinador
        self.modificaciones = modificaciones
        self.listaProfesores = listaProfesores
        self.anho = anho

    def agregarProfesor(self, profesor):
        #validacion de datos
        if type(profesor) is Profesor.Profesor:
            self.listaProfesores.append(profesor)
            return True
        else:
            return False
        
    def agregarModificacion(self, modificacion):
        self.modificaciones += [modificacion]