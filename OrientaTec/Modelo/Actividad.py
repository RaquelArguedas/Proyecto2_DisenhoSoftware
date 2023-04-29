class Actividad:
    def __init__(self,idActividad, nombreActividad,
    tipoActividad, fechaActividad, horaInicio,
    horaFin, recordatorio,responsables, medio, enlace,
    estado, afiche, ultimaModificacion):
        self.idActividad = idActividad 
        self.nombreActividad = nombreActividad
        self.tipoActividad = tipoActividad
        self.fechaActividad = fechaActividad
        self.horaInicio = horaInicio
        self.horaFin = horaFin
        self.recordatorio = recordatorio
        self.responsables = responsables
        self.medio = medio
        self.enlace = enlace
        self.estado = estado
        self.afiche = afiche
        self.ultimaModificacion = ultimaModificacion
        