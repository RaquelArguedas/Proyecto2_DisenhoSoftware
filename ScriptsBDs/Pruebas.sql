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
			 values ("Juegos1", 5, "2023-09-09", "13:00", "15:00", 
						3, 2, "link", 1,"2023-05-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Juegos2", 5, "2023-09-08", "11:00", "13:00", 
						3, 2, "link", 1, "2023-05-08");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Charla Autoestima", 2, "2023-09-07", "09:00", "11:00", 
						3, 2, "link", 1, "2023-05-07");


insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Moderar tu tiempo", 1, "2023-07-03", "13:00", "15:00", 
						3, 2, "link", 1,"2023-05-03");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Tips de APA", 3, "2023-07-03", "11:00", "13:00", 
						3, 2, "link", 1, "2023-5-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Deseas cambiar de carrera", 2, "2023-07-01", "09:00", "11:00", 
						3, 2, "link", 1, "2023-5-09");
                        
                        
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Recursos del TEC", 1, "2023-05-09", "13:00", "15:00", 
						3, 2, "link", 1,"2023-05-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Charla Becas Estudiantiles", 1, "2023-05-08", "11:00", "13:00", 
						3, 2, "link", 3, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Si se puede", 2, "2023-05-01", "09:00", "11:00", 
						3, 2, "link", 1, "2023-10-09");
    
    
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Moderar tu tiempo", 1, "2023-04-09", "13:00", "15:00", 
						3, 2, "link", 1,"2023-10-09");
                        
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Block Chain", 4, "2023-10-08", "11:00", "13:00", 
						3, 2, "link", 1, "2023-10-09");
insert into Actividad(nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
						recordatorio, medio, enlace, estado, ultimaModificacion)
			 values ("Charla web", 4, "2023-10-01", "09:00", "11:00", 
						3, 2, "link", 1, "2023-10-09");

insert into Rol(descripcion) values("PROFESOR");
insert into Rol(descripcion) values("PROFESOR_COORDINADOR");
insert into Rol(descripcion) values("ASISTENTE");
insert into Rol(descripcion) values("ASISTENTE_CARTAGO");
insert into Rol(descripcion) values("ESTUDIANTE");
          
-- insert into PlanTrabajo(anno) values(2019);
-- insert into PlanTrabajo(anno) values(2020);
insert into PlanTrabajo(anno) values(2021);
insert into PlanTrabajo(anno) values(2022);
insert into PlanTrabajo(anno) values(2023);

insert into ActividadesxPlan(idActividad, idPlan) values(1, 3);
insert into ActividadesxPlan(idActividad, idPlan) values(2, 3);
insert into ActividadesxPlan(idActividad, idPlan) values(3, 3);
insert into ActividadesxPlan(idActividad, idPlan) values(4, 3);
insert into ActividadesxPlan(idActividad, idPlan) values(5, 3);
insert into ActividadesxPlan(idActividad, idPlan) values(6, 3);
insert into ActividadesxPlan(idActividad, idPlan) values(7, 3);


insert into EstadoCuenta(descripcion) values ("ACTIVO");
insert into EstadoCuenta(descripcion) values ("INACTIVO");

insert into Autoridad(descripcion) values ("COORDINADOR");
insert into Autoridad(descripcion) values ("REGULAR");

insert into Sede(descripcion) values ("SJ");
insert into Sede(descripcion) values ("CA");
insert into Sede(descripcion) values ("SC");
insert into Sede(descripcion) values ("AL");
insert into Sede(descripcion) values ("LI");

INSERT INTO usuario (correo, contrasenha, idRol, idSede) VALUES
('jorge.gonzalez@hotmail.com', 12345678, 2, 3),
('lucia.lopez@yahoo.com', 23456789, 1, 4),
('daniel.perez@outlook.com', 34567890, 2, 5),
('isabel.rodriguez@gmail.com', 45678901, 1, 1),
('luis.garcia@hotmail.com', 56789012, 2, 2),
('marta.sanchez@yahoo.com', 67890123, 1, 3),
('alejandro.fernandez@outlook.com', 78901234, 2, 4),
('sara.gomez@gmail.com', 89012345, 1, 5),
('juan.martinez@hotmail.com', 90123456, 2, 1),
('carmen.lopez@yahoo.com', 01234567, 1, 2);


INSERT INTO profesor (cedula, nombre, apellido1, apellido2, idSede, numeroCelular, correoElectronico, numeroOficina, idAutoridad, idEstado) VALUES
(467890235, 'Jorge', 'González', 'Soto', 3, 68890123, 'jorge.gonzalez@hotmail.com', 20234567, 2, 2),
(578901346, 'Lucía', 'López', 'Martínez', 4, 67889012, 'lucia.lopez@yahoo.com', 20345678, 1, 1),
(689012457, 'Daniel', 'Pérez', 'Gómez', 5, 68778901, 'daniel.perez@outlook.com', 20456789 ,2 ,2),
(790123568 ,'Isabel' ,'Rodríguez' ,'López' ,1 ,67877890 ,'isabel.rodriguez@gmail.com' ,20567890 ,1 ,1),
(901234679 ,'Luis' ,'García' ,'Sánchez' ,2 ,68866789 ,'luis.garcia@hotmail.com' ,20678901 ,2 ,2),
(112345780 ,'Marta' ,'Sánchez' ,'Díaz' ,3 ,67865678 ,'marta.sanchez@yahoo.com' ,20789012 ,1 ,1),
(223456891 ,'Alejandro' ,'Fernández' ,'García' ,4 ,68764567 ,'alejandro.fernandez@outlook.com' ,20890123 ,2 ,2),
(334567902 ,'Sara' ,'Gómez' ,'Rodríguez' ,5 ,67863456 ,'sara.gomez@gmail.com' ,20901234 ,1 ,1),
(445678013 ,'Juan' ,'Martínez' ,'González' ,1 ,68862345 ,'juan.martinez@hotmail.com' ,21012345 ,2 ,2),
(556789124 ,'Carmen' ,'López' ,'Pérez' ,2 ,67861234 ,'carmen.lopez@yahoo.com' ,21123456 ,1 ,1);


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
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 4);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 5);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 6);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 7);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 8);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 9);
insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) values (1, 10);

insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");
insert into Bitacora(fecha, hora, idAutor, descripcion) values ("2023-05-19", "12:30", 1, "nuevaActividad");

insert into BitacoraXActividades(idActividad, idBitacora) values (1, 1);
insert into BitacoraXActividades(idActividad, idBitacora) values (2, 2);
insert into BitacoraXActividades(idActividad, idBitacora) values (3, 3);
insert into BitacoraXActividades(idActividad, idBitacora) values (4, 4);
insert into BitacoraXActividades(idActividad, idBitacora) values (5, 5);
insert into BitacoraXActividades(idActividad, idBitacora) values (6, 6);
insert into BitacoraXActividades(idActividad, idBitacora) values (7, 7);
insert into BitacoraXActividades(idActividad, idBitacora) values (8, 8);
insert into BitacoraXActividades(idActividad, idBitacora) values (9, 9);
insert into BitacoraXActividades(idActividad, idBitacora) values (10, 10);
insert into BitacoraXActividades(idActividad, idBitacora) values (11, 11);
insert into BitacoraXActividades(idActividad, idBitacora) values (12, 12);
insert into BitacoraXActividades(idActividad, idBitacora) values (13, 13);

insert into Recordatorio (idActividad, fechas) values (1, "2023-08-09");
insert into Recordatorio (idActividad, fechas) values (2, "2023-08-08");
insert into Recordatorio (idActividad, fechas) values (3, "2023-08-07");
insert into Recordatorio (idActividad, fechas) values (4, "2023-06-03");
insert into Recordatorio (idActividad, fechas) values (5, "2023-06-03");
insert into Recordatorio (idActividad, fechas) values (6, "2023-06-01");
insert into Recordatorio (idActividad, fechas) values (7, "2023-04-09");
insert into Recordatorio (idActividad, fechas) values (8, "2023-04-08");
insert into Recordatorio (idActividad, fechas) values (9, "2023-04-01");
insert into Recordatorio (idActividad, fechas) values (10, "2023-03-09");
insert into Recordatorio (idActividad, fechas) values (11, "2023-09-08");
insert into Recordatorio (idActividad, fechas) values (12, "2023-09-01");
				

INSERT INTO AsistenteAdministrativo (cedula, nombre, apellido1, apellido2, idSede, numeroCelular, correoElectronico, numeroOficina)
VALUES 
  (123456789, 'Alejandra', 'Hidalgo', 'Ramirez', 1, 12345678, 'ale@gmail.com', 12345678),
  (234567890, 'Roberto', 'Gonzalez', 'Lopez', 2, 23456789, 'robiGon@gmail.com', 23456789),
  (345678901, 'Maria', 'Perez', 'Martinez', 3, 34567890, 'mariperez009@gmail.com', 34567890),
  (456789012, 'Bernardo', 'Rodriguez', 'Sanchez', 4, 45678901, 'bernardoRS55@gmail.com', 45678901),
  (567890123, 'Rodolfo', 'Lopez', 'Hernandez', 5, 56789012, 'rodolfolopezzz@gmail.com', 56789012);


INSERT INTO estudiante (nombre, apellido1, apellido2, idSede, numeroCelular, correoElectronico, idEstado) VALUES
('Ana', 'García', 'López', 3, 67894567, 'ana.garcia@estudiantec.cr', 1),
('Carlos', 'Pérez', 'Sánchez', 1, 68876543, 'carlos.perez@estudiantec.cr', 2),
('María', 'Rodríguez', 'Gómez', 4, 67812345, 'maria.rodriguez@estudiantec.cr', 1),
('José', 'Martínez', 'Fernández', 2, 68765432, 'jose.martinez@estudiantec.cr', 2),
('Laura', 'González', 'Ruiz', 5, 67898765, 'laura.gonzalez@estudiantec.cr', 1),
('David', 'López', 'Sánchez', 3, 68887654, 'david.lopez@estudiantec.cr', 2),
('Sofía', 'Hernández', 'García', 1, 67845678, 'sofia.hernandez@estudiantec.cr', 1),
('Daniel', 'Gómez', 'Martínez', 4, 68756789, 'daniel.gomez@estudiantec.cr', 2),
('Lucía', 'Sánchez', 'Pérez', 2, 67890876, 'lucia.sanchez@estudiantec.cr', 1),
('Juan', 'Díaz', 'Rodríguez', 5, 68878908, 'juan.diaz@estudiantec.cr', 2),
('Marta', 'Pérez', 'González', 3, 67865432, 'marta.perez@estudiantec.cr', 1),
('Alejandro', 'García', 'López', 1, 68767654, 'alejandro.garcia@estudiantec.cr', 2),
('Elena', 'Fernández', 'Díaz', 4, 67876543, 'elena.fernandez@estudiantec.cr', 1),
('Luis', 'Gómez', 'Sánchez', 2, 68865432, 'luis.gomez@estudiantec.cr', 2),
('Sara', 'Martínez', 'Rodríguez', 5, 67854321, 'sara.martinez@estudiantec.cr', 1),
('Jorge', 'López', 'Hernández', 3, 68765431, 'jorge.lopez@estudiantec.cr' ,2),
('Isabel','Rodríguez','González' ,4 ,67843210 ,'isabel.rodriguez@estudiantec.cr' ,1),
('Pedro','Sánchez','Fernández' ,1 ,68854321 ,'pedro.sanchez@estudiantec.cr' ,2),
('Carmen','García','Pérez' ,2 ,67832109 ,'carmen.garcia@estudiantec.cr' ,1),
('Alberto','Díaz','Martínez' ,5 ,68754321 ,'alberto.diaz@estudiantec.cr' ,2);
