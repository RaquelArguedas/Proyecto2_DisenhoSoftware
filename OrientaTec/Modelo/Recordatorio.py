class Recordatorio:
    def __init__(self,idActividad,fecha):
        self.idActividad =idActividad
        self.fecha = fecha

    def __str__(self):
        return f"Recordatorio: ID Actividad = {self.idActividad}, Fecha = {self.fecha}"