import Actividad
class PlanTrabajo:
    actividades = []
    def __init__(self,anno,actividades):
        self.anno =anno
        self.actividades= actividades
    def agregarActividad(self, actividad):
        #validacion de datos
        if isinstance(actividad,Actividad):
            self.actividades.append(actividad)
            return true
        else:
            return false