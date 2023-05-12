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
    
    def consultarActividadesEstado(self, estado):
        actividades = self.consultarActividades()
        listaSalida = []
        for ac in actividades:
            if (ac.estado == int(estado)):
                listaSalida += [ac]
        return listaSalida
    
    def definirPlanActividades(self, idPlan, listaActividades):
        for actividad in listaActividades:
            self.dao.agregarActividad(actividad, idPlan)

        

    def crearPlanActividades(self, anno):
        return self.dao.crearPlanTrabajo(anno)
