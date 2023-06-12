-- Hecho en MySQL

/*Proyecto 2 
Diseño de Software
Ericka Solano Fernández 
I Semestre 2023*/

#Creación de tablas y bd

CREATE SCHEMA `orientatec` ;
use orientatec;

create table Sede
(idSede int primary key not null auto_increment,
descripcion varchar(50)
);
create table TipoActividad
(idTActividad int primary key not null auto_increment,
descripcion varchar(150)
);

create table EstadoActividad
(idEstadoA int primary key not null auto_increment,
descripcion varchar(50)
);

create table Actividad
(idActividad int primary key not null auto_increment,
nombreActividad varchar(50),
tipoActividad int, foreign key (tipoActividad) references TipoActividad (idTActividad),
fechaActividad date,
horaInicio time,
horaFin time, 
medio int, 
enlace varchar(100),
estado int, foreign key (estado) references EstadoActividad (idEstadoA),
ultimaModificacion date
);

create table Rol
(idRol int primary key not null auto_increment,
descripcion varchar(50)
);

create table Usuario
(idUsuario int primary key not null auto_increment,
correo varchar(100),
contrasenha varchar(50),
idRol int, foreign key (idRol) references Rol (idRol),
idSede int, foreign key (idSede) references Sede (idSede),
permiteNotis bool, 
permiteChats bool
);

create table Notificacion
(idNotificacion int primary key not null auto_increment,
emisor int, foreign key (emisor) references Usuario (idUsuario),
fechaHora datetime,
contenido varchar(50)
);

create table NotificacionXUsuario
(idNotificacionXUsuario int primary key not null auto_increment,
idNotificacion int, foreign key (idNotificacion) references Notificacion (idNotificacion),
idUsuario int, foreign key (idUsuario) references Usuario (idUsuario),
leida bool
);

create table PlanTrabajo
(idPlan int primary key not null auto_increment,
anno int
);

create table ActividadesxPlan
(idActividadesxPlan int primary key not null auto_increment,
idActividad int,foreign key (idActividad) references Actividad (idActividad),
idPlan int, foreign key (idPlan) references PlanTrabajo (idPlan)
);

create table Observacion
(idObservacion int primary key not null auto_increment,
idActividad int,foreign key (idActividad) references Actividad (idActividad),
fechaCancelada date, 
detalle varchar(200)
);

create table Evidencia
(idEvidencia int primary key not null auto_increment,
idActividad int,foreign key (idActividad) references Actividad (idActividad),
linkGrabacion varchar(200)
);

create table EstadoCuenta
(idEstadoC int primary key not null auto_increment,
descripcion varchar(50)
);

create table Autoridad
(idAutoridad int primary key not null auto_increment,
descripcion varchar(50)
);


create table Profesor
(idProfesor int primary key not null auto_increment,
cedula int,
nombre varchar(50),
apellido1 varchar(50),
apellido2 varchar(50),
idSede int,foreign key (idSede) references Sede (idSede),
numeroCelular int,
correoElectronico varchar(200),
numeroOficina int,
idAutoridad int,foreign key (idAutoridad) references Autoridad (idAutoridad),
idEstado int,foreign key (idEstado) references EstadoCuenta (idEstadoC)
);

create table ResponsableXActividad
(idResponsableXActividad int primary key not null auto_increment,
idResponsable int,foreign key (idResponsable) references Profesor (idProfesor),
idActividad int,foreign key (idActividad) references Actividad (idActividad)
);

create table EquipoGuia
(idEquipoGuia int primary key not null auto_increment,
idCoordinador int,foreign key (idCoordinador) references Profesor (idProfesor),
anho int
);

create table ProfesoresXEquipoGuia
(idProfesorXEquipoGuia int primary key not null auto_increment,
idEquipoGuia int,foreign key (idEquipoGuia) references EquipoGuia (idEquipoGuia),
idProfesor int,foreign key (idProfesor) references Profesor (idProfesor)
);

create table Bitacora
(idBitacora int primary key not null auto_increment,
fecha date, 
hora time,
idAutor int,
descripcion varchar(100)
);

create table BitacoraXEquipoGuia
(idBitacoraXEquipoGuia int primary key not null auto_increment,
idEquipoGuia int,foreign key (idEquipoGuia) references EquipoGuia (idEquipoGuia),
idBitacora int,foreign key (idBitacora) references Bitacora (idBitacora)
);

create table BitacoraXActividades
(idBitacoraXActividades int primary key not null auto_increment,
idActividad int,foreign key (idActividad) references Actividad (idActividad),
idBitacora int,foreign key (idBitacora) references Bitacora (idBitacora)
);

create table Comentario
(idComentario int primary key not null auto_increment,
idActividad int,foreign key (idActividad) references Actividad (idActividad),
autor int, 
fechaHora datetime, 
contenido varchar(200),
idComentarioPadre int -- si es 0, es un comentario nuevo, no una respuesta
);

create table Recordatorio
(idRecordatorio int primary key not null auto_increment,
idActividad int,foreign key (idActividad) references Actividad (idActividad),
fecha date
);


create table AsistenteAdministrativo
(idAsistente int primary key not null auto_increment,
cedula int,
nombre varchar(50),
apellido1 varchar(50),
apellido2 varchar(50),
idSede int,foreign key (idSede) references Sede (idSede),
numeroCelular int,
correoElectronico varchar(200),
numeroOficina int
);

create table Estudiante
(carnet int primary key not null,
nombre varchar(50),
apellido1 varchar(50),
apellido2 varchar(50),
idSede int,foreign key (idSede) references Sede (idSede),
numeroCelular int,
correoElectronico varchar(200),
idEstado int, foreign key (idEstado) references EstadoCuenta (idEstadoC)
);

