class Evidencia:
    fotografias = []
    listaAsistencia =[]
    def __init__(self,idActividad,fotografias,linkGrabacion,listaAsistencia):
        self.idActividad =idActividad
        self.fotografias= fotografias
        self.linkGrabacion =linkGrabacion
        self.listaAsistencia= listaAsistencia