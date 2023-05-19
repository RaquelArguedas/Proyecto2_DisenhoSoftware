class Actividad:
    def __init__(self,idActividad, nombreActividad,
    tipoActividad, fechaActividad, horaInicio,
    horaFin, recordatorio,responsables, medio, enlace,
    estado, ultimaModificacion, modificaciones):
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
        self.ultimaModificacion = ultimaModificacion
        self.modificaciones = modificaciones    

    def agregarResponsable(self, profesor):
        print('type of responsables: ', type(self.responsables))
        print('responsables: ', self.responsables)
        print('type of profesor: ', type(profesor))
        print('profesor: ', profesor)
        self.responsables.append(profesor)

    def quitarResponsable(self, profesor):
        self.responsables.remove(profesor)  

    def agregarModificacion(self, modificacion):
        print("------------------")
        print(type(self.modificaciones), self.modificaciones)
        self.modificaciones.append(modificacion) 
        print(type(self.modificaciones), self.modificaciones)
        print("------------------")