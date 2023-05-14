from AdminActividades import *
from AdminEquipoGuia import *
from AdminPlanActividades import *
from AdminEstudiantes import *
from AdminProfesores import *
from AdminUsuario import *

class MainController:
    def __init__(self):
        self.controlPlanActividades = AdminPlanActividades()
        self.controlActividades = AdminActividades()
        self.controlProfesor = AdminProfesores()
        self.controlEstudiante = AdminEstudiantes()
        self.controlEquipoGuia = AdminEquipoGuia()
        self.controlUsuario = AdminUsuario()

    
    #AdminProfesores
    def darBajaProfesor(self, idProfesor):
        return self.controlProfesor.darBajaProfesor(idProfesor)

    def designarCoordinador(self, idProfesor):
        return self.controlProfesor.designarCoordinador(idProfesor)

    def modificarProfesor(self, codigo, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado):
        return self.controlProfesor.modificarProfesor(codigo, cedula,nombre,apellido1, apellido2, sede, 
                                               numeroCelular, correoElectronico, numeroOficina,
                                               autoridad, estado)

    def getProfesor(self, idProfesor):
        return self.controlProfesor.getProfesor(idProfesor)
    
    def getProfesorCodigo(self, codigo):
        return self.controlProfesor.getProfesorCodigo(codigo)
    
    def crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado):
        return self.controlProfesor.crearProfesor(cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado)
    
    #AdminEquipoGuia
    def agregarProfesor(self, profesor):
        return self.controlEquipoGuia.agregarProfesor(profesor)
    
    def getEquipoGuia(self):
        return self.controlEquipoGuia.getEquipoGuia()
    
    def getAllProfesores(self):
        return self.controlEquipoGuia.getAllProfesores()
    
    def bitacoraEquipoGuia(self, fecha, hora, idAutor, descripcion):
        return self.controlEquipoGuia.bitacoraEquipoGuia(fecha, hora, idAutor, descripcion)
    
    #AdminEstudiantes
    def consultarEstudiantes(self, ordenamiento):
        return self.controlEstudiante.consultarEstudiantes(ordenamiento)
    
    def modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, 
                            numeroCelular, estado):
        return self.controlEstudiante.modificarEstudiante(carnet, nombre,apellido1, apellido2, sede, 
                                                          correoElectronico, numeroCelular, estado)
    
    #PENDIENTE
    def generarExcelEstudiantes(self):
        return self.controlEstudiante.generarExcelEstudiantes()
    
    def cargarExcelEstudiantes(self):
        return self.controlEstudiante.cargarExcelEstudiantes()
    
    def buscarEstudiante(self, carnet):
        return self.controlEstudiante.buscarEstudiante(carnet)

    #AdminActividades
    def verActividad(self, idActividad):
        return self.controlActividades.verActividad(idActividad)
    
    def modificarActividad(self, idActividad, nombreActividad,tipoActividad, fechaActividad, horaInicio,
                    horaFin, recordatorio, medio, enlace,estado):
        return self.controlActividades.modificarActividad(idActividad, nombreActividad,tipoActividad, 
                                                          fechaActividad, horaInicio,horaFin, recordatorio,
                                                          medio, enlace,estado)

    def cancelarActividad(self, idActividad):
        return self.controlActividades.cancelarActividad(idActividad)
    
    def crearActividad(self, nombreActividad, tipoActividad, fechaActividad,horaInicio, horaFin, 
                       recordatorio, responsables, medio,enlace, estado):
        return self.controlActividades.crearActividad(nombreActividad, tipoActividad, fechaActividad,
                                                      horaInicio, horaFin, recordatorio, responsables, medio,enlace, 
                                                      estado)
    
    def cambiarEstado(self, idActividad, idEstado):
        return self.controlActividades.cambiarEstado(idActividad, idEstado)
    
    def getDetalleActividad(self, idActividad):
        return self.controlActividades.getDetalleActividad(idActividad)
    
    def escribirComentario(self, idActividad,autor,fechaHora, contenido, idComentarioPadre):
        return self.controlActividades.escribirComentario(idActividad,autor,fechaHora, contenido,
                                                         idComentarioPadre)
    
    def finalizarActividad(self, idActividad,linkGrabacion):
        return self.controlActividades.finalizarActividad(idActividad,linkGrabacion)
    
    def agregarResponsablesActividad(self, idActividad, responsablesNuevos):
        return self.controlActividades.agregarResponsablesActividad(idActividad, responsablesNuevos)

    def quitarResponsablesActividad(self, idActividad, responsablesEliminados):
        return self.controlActividades.quitarResponsablesActividad(idActividad, responsablesEliminados)
            
    def bitacoraActividad(self, idActividad, fecha, hora, idAutor, descripcion):
        return self.controlActividades.bitacoraActividad(idActividad, fecha, hora, idAutor, descripcion)
    

    #AdminPlanActividades
    def consultarProximaActividad(self):
        return self.controlPlanActividades.consultarProximaActividad()
    
    def consultarActividades(self):
        return self.controlPlanActividades.consultarActividades()
    
    def consultarActividadesEstado(self, estado):
        return self.controlPlanActividades.consultarActividadesEstado(estado)
    
    def definirPlanActividades(self, idPlan, listaActividades):
        self.controlPlanActividades.definirPlanActividades(idPlan, listaActividades)

    def crearPlanActividades(self, anno):
        return self.controlPlanActividades.crearPlanActividades(anno)
    
        

    #AdminUsuario
    def exists(self, correo, contrasenha):
        return self.controlUsuario.exists(correo, contrasenha)

    def modificarUsuario(self, idUsuario, correoElectronico, contrasenha, idRol):
        return self.controlUsuario.modificarUsuario(idUsuario, correoElectronico, contrasenha, idRol)
    
    
    def crearUsuario(self, correoElectronico, contrasenha, idRol):
        return self.controlUsuario.crearUsuario(correoElectronico, contrasenha, idRol)
    
    def getUsuario(self, idUsuario):
        return self.controlUsuario.getUsuario(idUsuario)
    
    def getUsuarioCorreo(self, correo, contrasenha):
        return self.controlUsuario.getUsuarioCorreo(correo, contrasenha)
    
    def getUsuarioRol(self, correo, contrasenha):
        return self.controlUsuario.getUsuarioRol(correo, contrasenha)
    