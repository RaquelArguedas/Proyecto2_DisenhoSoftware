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
						recordatorio, medio, enlace, estado, afiche, ultimaModificacion)
			 values ("Actividad1", 1, "2023-09-09", "13:00", "15:00", 
						3, 2, "link", 1, null, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, afiche, ultimaModificacion)
			 values ("Actividad2", 3, "2023-08-08", "11:00", "13:00", 
						3, 2, "link", 1, null, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, afiche, ultimaModificacion)
			 values ("Actividad3", 2, "2023-02-01", "09:00", "11:00", 
						3, 2, "link", 1, null, "2023-10-09");
                        
insert into Usuario(correo, contrasenha)
			 values ("user1@gmail.com", "con1");
insert into Usuario(correo, contrasenha)
			 values ("user2@gmail.com", "con2");
             
insert into PlanTrabajo(anno) values(2019);
insert into PlanTrabajo(anno) values(2020);
insert into PlanTrabajo(anno) values(2021);
insert into PlanTrabajo(anno) values(2022);
insert into PlanTrabajo(anno) values(2023);

insert into ActividadesxPlan(idActividad, idPlan) values(1, 1);
insert into ActividadesxPlan(idActividad, idPlan) values(2, 2);
insert into ActividadesxPlan(idActividad, idPlan) values(3, 3);

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

insert into Profesor(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, numeroOficina, fotografia, idAutoridad, idEstado)
			 values (1, "Rafael", "Bonilla", "Vargas", 1, 83082888,
						"rafa@gmail.com", 22334455, null, 1, 1);
insert into Profesor(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, numeroOficina, fotografia, idAutoridad, idEstado)
			 values (2, "Paula", "Venegas", "Jimenez", 1, 83082889,
						"pau@gmail.com", 89897813, null, 2, 1);
insert into Profesor(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, numeroOficina, fotografia, idAutoridad, idEstado)
			 values (3, "Hugo", "Rodriguez", "Romero", 1, 83082877,
						"hugo@gmail.com", 23423, null, 2, 1);

insert into ResponsableXActividad(idResponsable, idActividad) 
						   values(1, 1);
insert into ResponsableXActividad(idResponsable, idActividad) 
						   values(1, 2);
insert into ResponsableXActividad(idResponsable, idActividad) 
						   values(2, 1);

insert into EquipoGuia(idCoordinador) values (1);

insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 1);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 2);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 3);

insert into Bitacora(fecha, hora, idAutor) values ("2023-09-09", "12:30", 1);
insert into Bitacora(fecha, hora, idAutor) values ("2023-02-02", "13:30", 1);
insert into Bitacora(fecha, hora, idAutor) values ("2023-03-03", "14:30", 2);

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
						correoElectronico, numeroOficina, fotografia)
			 values (1, "Asistente1", "Hidalgo", "Ramirez", 1, 90,
						"as@gmail.com", 23, null);

insert into Estudiante(nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values ("Daniela", "Mendez", "Arias", 1, 83090909,
						"dani@gmail.com", 1);
insert into Estudiante(nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values ("Mariana", "Mendez", "Arias", 1, 834635609,
						"Mariana@gmail.com", 1);
insert into Estudiante(nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values ("Roberto", "Gutierrez", "Sanchez", 1, 72648432,
						"Roberto@gmail.com", 1);
insert into Estudiante(nombre, apellido1, apellido2, idSede, numeroCelular,
						correoElectronico, idEstado)
			 values ("Olman", "Laguna", "Blop", 1, 784902884,
						"blop@gmail.com", 1);