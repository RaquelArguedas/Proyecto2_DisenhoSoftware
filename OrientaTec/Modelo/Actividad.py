import ast

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
        if(type(self.responsables) == str):
            self.responsables = ast.literal_eval(self.responsables).append(profesor)
        else:
            self.responsables.append(profesor)
        print('lista responsables:', self.responsables )

    def quitarResponsable(self, profesor):
        self.responsables.remove(profesor)  

    def agregarModificacion(self, modificacion):
        self.modificaciones += [modificacion]  