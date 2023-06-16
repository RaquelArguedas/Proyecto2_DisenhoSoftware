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
    
    def getProfesorCedula(self, cedula):
        return self.controlProfesor.getProfesorCedula(cedula)
    
    def getAllProfesores(self):
        return self.controlEquipoGuia.getAllProfesores()
    
    def crearProfesor(self,cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado):
        return self.controlProfesor.crearProfesor(cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina,autoridad, estado)
    
    def registrarFotoProfesor(self,idProfe,bin):
        self.controlProfesor.registrarFotoProfesor(idProfe, bin)
    
    def getFotoProfesor(self,idProfe):
        return self.controlProfesor.getFotoProfesor(idProfe)
    
    def getProfesorCorreo(self, correo):
        return self.controlProfesor.getProfesorCorreo(correo)
    
    #AdminEquipoGuia
    def agregarProfesor(self, profesor):
        return self.controlEquipoGuia.agregarProfesor(profesor)
    
    def getEquipoGuia(self):
        return self.controlEquipoGuia.getEquipoGuia()
    
    def getAllProfesores(self):
        return self.controlEquipoGuia.getAllProfesores()
    
    def bitacoraEquipoGuia(self, fecha, hora, idAutor, descripcion):
        return self.controlEquipoGuia.bitacoraEquipoGuia(fecha, hora, idAutor, descripcion)
    
    def getAllAsistentes(self):
        return self.controlEquipoGuia.getAllAsistentes()
    
    def modificarAsistente(self, id, cedula,nombre,apellido1, apellido2, sede, numeroCelular,
                        correoElectronico, numeroOficina):
        return self.controlEquipoGuia.modificarAsistente(id, cedula,nombre,apellido1, apellido2, sede, 
                                                         numeroCelular,correoElectronico, numeroOficina)
    
    def getAsistenteCorreo(self, correo):
        return self.controlEquipoGuia.getAsistenteCorreo(correo)
    
    def getFotoAsistente(self,id):
        return self.controlEquipoGuia.getFotoAsistente(id)
    
    def registrarFotoAsistente(self,id, image):
        return self.controlEquipoGuia.registrarFotoAsistente(id, image)
    
    #AdminEstudiantes
    def consultarEstudiantes(self, ordenamiento):
        return self.controlEstudiante.consultarEstudiantes(ordenamiento)
    
    def modificarEstudiante(self, carnet, nombre,apellido1, apellido2, sede, correoElectronico, 
                            numeroCelular, estado):
        return self.controlEstudiante.modificarEstudiante(carnet, nombre,apellido1, apellido2, sede, 
                                                          correoElectronico, numeroCelular, estado)
    
    def generarExcelEstudiantes(self,sede):
        return self.controlEstudiante.generarExcelEstudiantes(sede)
    
    def cargarExcelEstudiantes(self,nombArchivo):
        return self.controlEstudiante.cargarExcelEstudiantes(nombArchivo)
    
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
    
    def crearEvidencia(self, idActividad, enlace):
        return self.controlActividades.crearEvidencia(idActividad, enlace)
    
    def getEvidencia(self, idActividad):
        return self.controlActividades.getEvidencia(idActividad)

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
    
    #Suscribir y desuscribir del Publisher Actividades
    def suscribir(self, idUsuario):
        self.controlActividades.getPublicador().suscribir(idUsuario)

    def desuscribir(self, idUsuario):
        self.controlActividades.getPublicador().desuscribir(idUsuario)
    
    #Crear Observación - Parche de Alonso
    def crearObservacion(self, idActividad, fechaCancelacion, detalle):
        return self.controlActividades.crearObservacion(idActividad, fechaCancelacion, detalle)
            
    def bitacoraActividad(self, idActividad, fecha, hora, idAutor, descripcion):
        return self.controlActividades.bitacoraActividad(idActividad, fecha, hora, idAutor, descripcion)
    
    def registrarFotoAfiche(self,idActividad,image):
        self.controlActividades.registrarFotoAfiche(idActividad,image)

    def registrarFotoEvLista(self,idEvidencia,image):
        self.controlActividades.registrarFotoEvLista(idEvidencia,image)

    def registrarFotoEv(self,idEvidencia,image):
        self.controlActividades.registrarFotoEv(idEvidencia,image)

    def setFotoAfiche(self,idBuscado, image):
        self.controlActividades.setFotoAfiche(idBuscado, image)
    
    def getFotoAfiche(self,idBuscado):
        return self.controlActividades.getFotoAfiche(idBuscado)

    def getEvLista(self,idBuscado):
        return self.controlActividades.getEvLista(idBuscado)

    def getFotoEv(self, idBuscado):
        return self.controlActividades.getFotoEv(idBuscado)
    
    #AdminPlanActividades
    def consultarProximaActividad(self):
        return self.controlPlanActividades.consultarProximaActividad()
    
    def consultarActividades(self):
        return self.controlPlanActividades.consultarActividades()
    
    def consultarTodasActividades(self):
        return self.controlPlanActividades.consultarTodasActividades()
    
    def consultarActividadesEstado(self, estado):
        return self.controlPlanActividades.consultarActividadesEstado(estado)
    
    def definirPlanActividades(self, idPlan, listaActividades):
        self.controlPlanActividades.definirPlanActividades(idPlan, listaActividades)

    def crearPlanActividades(self, anno):
        return self.controlPlanActividades.crearPlanActividades(anno)
    
        

    #AdminUsuario
    def exists(self, correo, contrasenha):
        return self.controlUsuario.exists(correo, contrasenha)
    
    def correoRegistrado(self, correo):
        return self.controlUsuario.correoRegistrado(correo)

    def modificarUsuario(self, idUsuario, correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats):
        return self.controlUsuario.modificarUsuario(idUsuario, correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats)
    
    
    def crearUsuario(self, correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats):
        return self.controlUsuario.crearUsuario(correoElectronico, contrasenha, idRol, idSede, permiteNotis, permiteChats)
    
    def getUsuario(self, idUsuario):
        return self.controlUsuario.getUsuario(idUsuario)
    
    def getUsuarioCorreo(self, correo):
        return self.controlUsuario.getUsuarioCorreo(correo)
    
    def getUsuarioRol(self, correo, contrasenha):
        return self.controlUsuario.getUsuarioRol(correo, contrasenha)
    
    def getUsuarioNombre(self,idUsuario):
        return self.controlUsuario.getUsuarioNombre(idUsuario)
    #funciones de las notificaciones
    def deleteNotificacionUsuario(self, idNotificacion, idUsuario):
        return self.controlUsuario.deleteNotificacionUsuario(idNotificacion, idUsuario)

    def deleteNotificacionesUsuario(self, idUsuario):
        return self.controlUsuario.deleteNotificacionesUsuario(idUsuario)

    def cambiarLeida(self, idNotificacion, idUsuario):
        return self.controlUsuario.cambiarLeida(idNotificacion, idUsuario)

    def todasLeidas(self, idUsuario, leidas):
        return self.controlUsuario.todasLeidas(idUsuario, leidas)
        
    def notificarActividades(self, fechaActual):
        return self.controlActividades.notificarActividades(fechaActual)
    
    def createNotificacion(self, idUsuarioEmisor, fechaHora, contenido):
        return self.controlUsuario.createNotificacion(idUsuarioEmisor, fechaHora, contenido)
    
    
    
    
    #---NUEVOS CAMBIOS---

    #Admin Estudiantes NUEVOS CAMBIOS
    def getFotoEstudiante(self,idEstudiante):
        return self.controlEstudiante.getFotoEstudiante(idEstudiante)
    
    def registrarFotoEstudiante(self,carnet,bin):
        self.controlEstudiante.registrarFotoEstudiante(carnet, bin)   

    #Uso de chats 
    def escribirMensaje(self, idChat,idAutor,fechaHora, contenido):
        return self.controlProfesor.escribirMensaje(idChat,idAutor,fechaHora, contenido)
    
    def crearChat(self,nombre,miembros,idAutor):
        return self.controlProfesor.crearChat(nombre,miembros,idAutor)
    
    def getChats(self,idUsuario):
        return self.controlUsuario.getChats(idUsuario)
    def getMensajes(self,idChat):
        return self.controlUsuario.getMensajes(idChat) 
    