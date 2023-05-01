from SingletonDAO import *
class AdminPlanActividades:
    #Constructor
    def __init__(self):
        self.dao = SingletonDAO()

    #Metodos
    def consultarProximaActividad(self):
        return self.dao.consultarProximaActividad()
    
    def consultarActividades(self):
        return self.dao.getActividades()
    
    def definirPlanActividades(self, idPlan, listaActividades):
        for actividad in listaActividades:
            self.dao.agregarActividad(actividad, idPlan)

    def crearPlanActividades(self, anno):
        return self.dao.crearPlanTrabajo(anno)
