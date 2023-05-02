from AdminActividades import *
from AdminEquipoGuia import *
from AdminPlanActividades import *
from AdminEstudiantes import *
from AdminProfesores import *

class MainController:
    def __init__(self):
        self.controlPlanActividades = AdminPlanActividades()
        self.controlActividades = AdminActividades()
        self.controlProfesor = AdminProfesores()
        self.controlEstudiante = AdminEstudiantes()
        self.controlEquipoGuia = AdminEquipoGuia()

    
    #AdminProfesores
    def darBajaProfesor(self, idProfesor):
        return self.controlProfesor.darBajaProfesor(idProfesor)

    def designarCoordinador(self, idProfesor):
        return self.controlProfesor.designarCoordiandor(idProfesor)

    def modificarProfesor(self, codigo, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,fotografia,autoridad, estado):
        return self.controlProfesor.modificarProfesor(codigo, cedula,nombre,apellido1, apellido2, sede, 
                                               numeroCelular, correoElectronico, numeroOficina,fotografia,
                                               autoridad, estado)

    def getProfesor(self, idProfesor):
        return self.controlProfesor.getProfesor(idProfesor)
    
    def crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,fotografia,autoridad, estado):
        return self.controlProfesor.crearProfesor(cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,fotografia,autoridad, estado)
    
    #AdminEquipoGuia
    def agregarProfesor(self, profesor, idEquipoGuia):
        return self.controlEquipoGuia.agregarProfesor(profesor, idEquipoGuia)
    
    def getEquipoGuia(self):
        return self.controlEquipoGuia.getEquipoGuia()
    
    #AdminEstudiantes
    def consultarEstudiantes(self):
        return self.controlEstudiante.consultarEstudiantes()
    
    def modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, 
                            numeroCelular, estado):
        return self.controlEstudiante.modificarEstudiante(carnet, nombre,apellido1, apellido2, sede, 
                                                          correoElectronico, numeroCelular, estado)
    
    #PENDIENTE
    def generarExcelEstudiantes(self):
        return self.controlEstudiante.generarExcelEstudiantes()
    
    def buscarEstudiante(self, carnet):
        return self.controlEstudiante.buscarEstudiante(carnet)

    #AdminActividades
    def verActividad(self, idActividad):
        return self.controlActividades.verActividad(idActividad)
    
    def modificarActividad(self, idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
                    horaFin, recordatorio,responsables, medio, enlace,estado, afiche, ultimaModificacion):
        return self.controlActividades.modificarActividad(idActividad, nombreActividad,tipoActividad, 
                                                          fechaActividad, horaInicio,horaFin, recordatorio,
                                                          responsables, medio, enlace,estado, afiche, 
                                                          ultimaModificacion)

    def cancelarActividad(self, idActividad):
        return self.controlActividades.cancelarActividad(idActividad)
    
    def crearActividad(self, nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
                       recordatorio, medio,enlace, estado, afiche, ultimaModificacion):
        return self.controlActividades.crearActividad(nombreActividad, tipoActividad, fechaActividad,
                                                      horaInicio, horaFin, recordatorio, medio,enlace, 
                                                      estado, afiche, ultimaModificacion)
    
    def cambiarEstado(self, idActividad, idEstado):
        return self.controlActividades.cambiarEstado(idActividad, idEstado)
    
    def getDetalleActividad(self, idActividad):
        return self.controlActividades.getDetalleActividad(idActividad)
    
    def escribirComentario(self, idActividad,autor,fechaHora, contenido, idComentarioPadre):
        return self.controlActividades.escribirComentario(idActividad,autor,fechaHora, contenido,
                                                         idComentarioPadre)
    
    def finalizarActividad(self, idActividad, fotografias,linkGrabacion,listaAsistencia):
        return self.controlActividades.finalizarActividad(idActividad, fotografias,linkGrabacion,listaAsistencia)
    

    #AdminPlanActividades
    def consultarProximaActividad(self):
        return self.controlPlanActividades.consultarProximaActividad()
    
    def consultarActividades(self):
        return self.controlPlanActividades.consultarActividades()
    
    def definirPlanActividades(self, idPlan, listaActividades):
        self.controlPlanActividades.definirPlanActividades(idPlan, listaActividades)

    def crearPlanActividades(self, anno):
        return self.controlPlanActividades.crearPlanActividades(anno)
    
        