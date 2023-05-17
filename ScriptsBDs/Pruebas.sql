insert into TipoActividad(descripcion) values ("ORIENTADORA");
insert into TipoActividad(descripcion) values ("MOTIVACIONAL");
insert into TipoActividad(descripcion) values ("APOYO_ESTUDIANTIL");
insert into TipoActividad(descripcion) values ("ORDEN_TECNICO");
insert into TipoActividad(descripcion) values ("RECREATIVA");

insert into EstadoActividad(descripcion) values ("PLANEADA");
insert into EstadoActividad(descripcion) values ("NOTIFICADA");
insert into EstadoActividad(descripcion) values ("REALIZADA");
insert into EstadoActividad(descripcion) values ("CANCELADA");

insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad1", 1, "2023-09-09", "13:00", "15:00", 
						3, 2, "link", 1,"2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad2", 3, "2023-08-08", "11:00", "13:00", 
						3, 2, "link", 1, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad3", 2, "2023-02-01", "09:00", "11:00", 
						3, 2, "link", 1, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad1", 1, "2023-09-09", "13:00", "15:00", 
						3, 2, "link", 2,"2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad2", 3, "2023-08-08", "11:00", "13:00", 
						3, 2, "link", 2, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad3", 2, "2023-02-01", "09:00", "11:00", 
						3, 2, "link", 2, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad1", 1, "2023-09-09", "13:00", "15:00", 
						3, 2, "link", 3,"2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad2", 3, "2023-08-08", "11:00", "13:00", 
						3, 2, "link", 3, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad3", 2, "2023-02-01", "09:00", "11:00", 
						3, 2, "link", 3, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad1", 1, "2023-09-09", "13:00", "15:00", 
						3, 2, "link", 4,"2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad2", 3, "2023-08-08", "11:00", "13:00", 
						3, 2, "link", 4, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Actividad3", 2, "2023-02-01", "09:00", "11:00", 
						3, 2, "link", 4, "2023-10-09");

insert into Rol(descripcion) values("PROFESOR");
insert into Rol(descripcion) values("PROFESOR_COORDINADOR");
insert into Rol(descripcion) values("ASISTENTE");
insert into Rol(descripcion) values("ASISTENTE_CARTAGO");
insert into Rol(descripcion) values("ESTUDIANTE");
          
insert into PlanTrabajo(anno) values(2019);
insert into PlanTrabajo(anno) values(2020);
insert into PlanTrabajo(anno) values(2021);
insert into PlanTrabajo(anno) values(2022);
insert into PlanTrabajo(anno) values(2023);

insert into ActividadesxPlan(idActividad, idPlan) values(1, 1);
insert into ActividadesxPlan(idActividad, idPlan) values(2, 2);
insert into ActividadesxPlan(idActividad, idPlan) values(3, 3);
insert into ActividadesxPlan(idActividad, idPlan) values(1, 5);
insert into ActividadesxPlan(idActividad, idPlan) values(2, 5);
insert into ActividadesxPlan(idActividad, idPlan) values(3, 5);
insert into ActividadesxPlan(idActividad, idPlan) values(4, 5);

insert into Observacion(idActividad, fechaCancelada, detalle) values(1, "2023-09-09", "detalleCan1");

insert into Evidencia(idActividad,linkGrabacion) values 
					(1, "link");
insert into Evidencia(idActividad,linkGrabacion) values 
					(2, "link");
insert into Evidencia(idActividad,linkGrabacion) values 
					(3, "link");
                    
insert into EstadoCuenta(descripcion) values ("ACTIVO");
insert into EstadoCuenta(descripcion) values ("INACTIVO");

insert into Autoridad(descripcion) values ("COORDINADOR");
insert into Autoridad(descripcion) values ("REGULAR");

insert into Sede(descripcion) values ("SJ");
insert into Sede(descripcion) values ("CA");
insert into Sede(descripcion) values ("SC");
insert into Sede(descripcion) values ("AL");
insert into Sede(descripcion) values ("LI");

insert into Usuario(correo, contrasenha, idRol, idSede)
			 values ("rafa@gmail.com", "rafa", 2, 1);
insert into Usuario(correo, contrasenha, idRol, idSede)
			 values ("pau@gmail.com", "pau", 1, 1);
insert into Usuario(correo, contrasenha, idRol, idSede)
			 values ("hugo@gmail.com","hugo", 1, 1);
insert into Usuario(correo, contrasenha, idRol, idSede)
			 values ("as@gmail.com","as", 4, 1); 
insert into Usuario(correo, contrasenha, idRol, idSede)
			 values ("dani@gmail.com", "dani", 5, 1);
insert into Usuario(correo, contrasenha, idRol, idSede)
			 values ("Mariana@gmail.com", "Mariana", 5, 1);
insert into Usuario(correo, contrasenha, idRol, idSede)
			 values ("Roberto@gmail.com","Roberto", 5, 1);
insert into Usuario(correo, contrasenha, idRol, idSede)
			 values ("blop@gmail.com","blop", 5, 1); 

insert into Profesor(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, numeroOficina, idAutoridad, idEstado)
			 values (187, "Rafael", "Bonilla", "Vargas", 1, 83082888,
						"rafa@gmail.com", 22334455, 1, 1);
insert into Profesor(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, numeroOficina, idAutoridad, idEstado)
			 values (2, "Paula", "Venegas", "Jimenez", 1, 83082889,
						"pau@gmail.com", 89897813, 2, 1);
insert into Profesor(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, numeroOficina, idAutoridad, idEstado)
			 values (3, "Hugo", "Rodriguez", "Romero", 1, 83082877,
						"hugo@gmail.com", 23423, 2, 1);
insert into Profesor(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, numeroOficina, idAutoridad, idEstado)
			 values (189, "Boniyo", "Bonilla", "Vargas", 1, 83082888,
						"rafa@gmail.com", 22334455, 1, 1);

insert into ResponsableXActividad(idResponsable, idActividad) 
						   values(1, 1);
insert into ResponsableXActividad(idResponsable, idActividad) 
						   values(1, 2);
insert into ResponsableXActividad(idResponsable, idActividad) 
						   values(2, 1);

insert into EquipoGuia(idCoordinador, anho) values (1,2023);

insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 1);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 2);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 3);

insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-09-09", "12:30", 1, "se hizo un cambio");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-02-02", "13:30", 1, "se hizo un cambio");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-03-03", "14:30", 2, "se hizo un cambio");

insert into BitacoraXEquipoGuia(idEquipoGuia, idBitacora) values (1, 1);
insert into BitacoraXEquipoGuia(idEquipoGuia, idBitacora) values (1, 2);
insert into BitacoraXEquipoGuia(idEquipoGuia, idBitacora) values (1, 3);

insert into BitacoraXActividades(idActividad, idBitacora) values (1, 1);
insert into BitacoraXActividades(idActividad, idBitacora) values (1, 1);
insert into BitacoraXActividades(idActividad, idBitacora) values (2, 2);

insert into Comentario(idActividad, autor, fechaHora, contenido, idComentarioPadre)
				values(1, 1, "2023-09-09 09:00:00", "Comentario1", 0);
insert into Comentario(idActividad, autor, fechaHora, contenido, idComentarioPadre)
				values(1, 2, "2023-09-09 09:30:00", "Comentario1.1", 1);
insert into Comentario(idActividad, autor, fechaHora, contenido, idComentarioPadre)
				values(1, 2, "2023-09-09 10:00:00", "Comentario2", 0);
insert into Comentario(idActividad, autor, fechaHora, contenido, idComentarioPadre)
				values(1, 2, "2023-09-09 10:30:00", "Comentario2.2", 2);

insert into Recordatorio (idActividad, fechas) values (1, "fechas1");
insert into Recordatorio (idActividad, fechas) values (2, "fechas2");

insert into AsistenteAdministrativo(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, numeroOficina)
			 values (1, "Asistente1", "Hidalgo", "Ramirez", 2, 90,
						"as@gmail.com", 23);


insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (202103257,"Daniela", "Mendez", "Arias", 2, 83090909,
						"dani@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (202094,"Mariana", "Mendez", "Arias", 2, 834635609,
						"Mariana@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (20198,"Roberto", "Gutierrez", "Sanchez", 3, 72648432,
						"Roberto@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (37492,"Roberto", "Gutierrez", "Sanchez", 5, 72648432,
						"Roberto@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (20210324,"Olman", "Laguna", "Blop", 5, 784902884,
						"blop@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (204323,"Daniela", "Mendez", "Arias", 1, 83090909,
						"dani@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (202143,"Mariana", "Mendez", "Arias", 1, 834635609,
						"Mariana@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (20290, "Roberto", "Gutierrez", "Sanchez", 1, 72648432,
						"Roberto@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (201803,"Olman", "Laguna", "Blop", 1, 784902884,
						"blop@gmail.com", 1);
					
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (28422,"Olman", "Laguna", "Blop", 3, 784902884,
						"blop@gmail.com", 1);
                        
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (20240,"Daniela", "Mendez", "Arias", 4, 83090909,
						"dani@gmail.com", 1);
insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values (20220,"Mariana", "Mendez", "Arias", 5, 834635609,
						"Mariana@gmail.com", 1);
