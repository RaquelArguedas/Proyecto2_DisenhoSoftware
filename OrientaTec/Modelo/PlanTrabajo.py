import Actividad
class PlanTrabajo:
    actividades = []
    def __init__(self,idPlan, anno,actividades):
        self.idPlan = idPlan
        self.anno = anno
        self.actividades= actividades
    def agregarActividad(self, actividad):
        #validacion de datos
        if type(actividad) is Actividad.Actividad:
            self.actividades.append(actividad)
            return True
        else:
            return False