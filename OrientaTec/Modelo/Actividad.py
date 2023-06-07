class Actividad:
    def __init__(self,idActividad, nombreActividad,
    tipoActividad, fechaActividad, horaInicio,
    horaFin, responsables, recordatorios, medio, enlace,
    estado, ultimaModificacion, modificaciones):
        self.idActividad = idActividad 
        self.nombreActividad = nombreActividad
        self.tipoActividad = tipoActividad
        self.fechaActividad = fechaActividad
        self.horaInicio = horaInicio
        self.horaFin = horaFin
        self.responsables = responsables
        self.recordatorios = recordatorios
        self.medio = medio
        self.enlace = enlace
        self.estado = estado
        self.ultimaModificacion = ultimaModificacion
        self.modificaciones = modificaciones    

    def agregarResponsable(self, profesor):
        # print('type of responsables: ', type(self.responsables))
        # print('responsables: ', self.responsables)
        # print('type of profesor: ', type(profesor))
        # print('profesor: ', profesor)
        self.responsables.append(profesor)

    def quitarResponsable(self, profesor):
        self.responsables.remove(profesor)  

    def agregarModificacion(self, modificacion):
        # print("------------------")
        # print(type(self.modificaciones), self.modificaciones)
        self.modificaciones.append(modificacion) 
        # print(type(self.modificaciones), self.modificaciones)
        # print("------------------")

    def agregarRecordatorio(self, recordatorio):
        self.recordatorios.append(recordatorio)

    def __str__(self):
        return f"Actividad(idActividad={self.idActividad}, nombreActividad='{self.nombreActividad}', tipoActividad='{self.tipoActividad}', fechaActividad='{self.fechaActividad}', horaInicio='{self.horaInicio}', horaFin='{self.horaFin}', responsables='{self.responsables}', recordatorios='{self.recordatorios}', medio='{self.medio}', enlace='{self.enlace}', estado='{self.estado}', ultimaModificacion='{self.ultimaModificacion}', modificaciones='{self.modificaciones}')"
