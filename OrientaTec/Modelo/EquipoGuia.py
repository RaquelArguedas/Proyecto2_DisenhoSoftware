import Profesor
class EquipoGuia:
    def __init__(self, coordinador,ultimaModificacion, listaProfesores):
        self.coordinador = coordinador
        self.ultimaModificacion = ultimaModificacion
        self.listaProfesores = listaProfesores

    def agregarProfesor(self, profesor):
        #validacion de datos
        if type(profesor) is Profesor.Profesor:
            self.listaProfesores.append(profesor)
            return True
        else:
            return False