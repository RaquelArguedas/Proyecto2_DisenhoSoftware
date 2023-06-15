-- Hecho en MySQL

/*Proyecto 2 
Diseño de Software
Ericka Solano Fernández 
I Semestre 2023*/

#CRUDS

use orientatec;

#____________________________________________________TipoActividad
#Create
DELIMITER $$
CREATE PROCEDURE `createTipoActividad`(in _descripcion varchar(150))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if( _descripcion is null )then -- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	else
		insert into TipoActividad(descripcion) values (_descripcion);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readTipoActividad`(in _idTActividad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from TipoActividad where _idTActividad = idTActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idTActividad no existe";
	else
		select idTActividad, descripcion from TipoActividad where _idTActividad = idTActividad;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateTipoActividad`(in _idTActividad int, in _descripcion varchar(150))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from TipoActividad where _idTActividad = idTActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idTActividad no existe";
	else
		update TipoActividad 
		set descripcion = ifnull(_descripcion, descripcion)
		where _idTActividad = idTActividad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteTipoActividad`(in _idTActividad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from TipoActividad where _idTActividad = idTActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idTActividad no existe";
	elseif ((select count(*) from Actividad where _idTActividad = tipoActividad)>0)then
		set _error = 3, _errmsg = "No se puede borrar un tipo de actividad, si hay actividades relacionadas";
	else
		delete from TipoActividad where _idTActividad = idTActividad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	


#____________________________________________________EstadoActividad
#Create
DELIMITER $$
CREATE PROCEDURE `createEstadoActividad`(in _descripcion varchar(150))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if( _descripcion is null )then -- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	else
		insert into EstadoActividad(descripcion) values (_descripcion);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readEstadoActividad`(in _idEstadoA int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EstadoActividad where _idEstadoA = idEstadoA)=0 )then 
		set _error = 2, _errmsg = "Ese idEstado no existe";
	else
		select idEstadoA, descripcion from EstadoActividad where _idEstadoA = idEstadoA;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateEstadoActividad`(in _idEstadoA int, in _descripcion varchar(150))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EstadoActividad where _idEstadoA = idEstadoA)=0 )then 
		set _error = 2, _errmsg = "Ese idEstado no existe";
	else
		update EstadoActividad 
		set descripcion = ifnull(_descripcion, descripcion)
		where _idEstadoA = idEstadoA; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteEstadoActividad`(in _idEstadoA int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EstadoActividad where _idEstadoA = idEstadoA)=0 )then 
		set _error = 2, _errmsg = "Ese idEstado no existe";
	elseif ((select count(*) from Actividad where _idEstadoA = idEstadoA)>0)then
		set _error = 3, _errmsg = "No se puede borrar un estado de actividad, si hay actividades relacionadas";
	else
		delete from EstadoActividad where _idEstadoA = idEstadoA; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	



#____________________________________________________Actividad
#Create
DELIMITER $$
CREATE PROCEDURE `createActividad`(in _nombreActividad varchar(50), in _tipoActividad int,
									in _fechaActividad date, in _horaInicio time,
									in _horaFin time, in _medio int,  in _enlace varchar(100),
									in _estado int, in _ultimaModificacion date)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if( _nombreActividad is null or _tipoActividad is null or _fechaActividad  is null or
		_horaInicio  is null or _horaFin is null or _medio  is null or 
		_enlace  is null or _estado  is null or _ultimaModificacion is null)then 
        -- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from TipoActividad where _tipoActividad = idTActividad)=0 )then 
		set _error = 2, _errmsg = "Ese tipoActividad no existe";
	elseif( (select count(*) from estadoactividad where _estado = idEstadoA)=0 )then 
		set _error = 2, _errmsg = "Ese estado no existe";
    else
		insert into Actividad (nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
							   medio, enlace, estado, ultimaModificacion) 
					values (_nombreActividad, _tipoActividad, _fechaActividad, _horaInicio, _horaFin, 
							 _medio, _enlace, _estado, _ultimaModificacion);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readActividad`(in _idActividad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	else
		select idActividad, nombreActividad, tipoActividad, fechaActividad, horaInicio, horaFin, 
			   medio, enlace, estado, ultimaModificacion 
		from Actividad where _idActividad = idActividad;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateActividad`(in _idActividad int, in _nombreActividad varchar(50), 
									in _tipoActividad int, in _fechaActividad date, 
                                    in _horaInicio time, in _horaFin time,  
									in _medio int,  in _enlace varchar(100),
									in _estado int, in _ultimaModificacion date)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	elseif( _tipoActividad is not null and (select count(*) from TipoActividad where _tipoActividad = idTActividad)=0 )then 
		set _error = 2, _errmsg = "Ese tipoActividad no existe";
	elseif(  _estado is not null and (select count(*) from EstadoActividad where _estado = idEstadoA)=0 )then 
		set _error = 2, _errmsg = "Ese estado no existe";
    else
		update Actividad 
		set nombreActividad = ifnull(_nombreActividad, nombreActividad),
            tipoActividad = ifnull(_tipoActividad, tipoActividad), 
            fechaActividad = ifnull(_fechaActividad, fechaActividad),
            horaInicio = ifnull(_horaInicio, horaInicio),
            horaFin = ifnull(_horaFin, horaFin), 
            medio = ifnull(_medio, medio),  
            enlace = ifnull(_enlace, enlace),
            estado = ifnull(_estado, estado),
            ultimaModificacion = ifnull(_ultimaModificacion, ultimaModificacion)
		where _idActividad = idActividad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteActividad`(in _idActividad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idEstado no existe";
	elseif ((select count(*) from actividadesxplan where _idActividad = idActividad)>0)then
		set _error = 3, _errmsg = "No se puede borrar una actividad, si hay actividadesxplan relacionadas";
	elseif ((select count(*) from responsablexactividad where _idActividad = idActividad)>0)then
		set _error = 3, _errmsg = "No se puede borrar una actividad, si hay responsablesxactividades relacionadas";
	elseif ((select count(*) from observacion where _idActividad = idActividad)>0)then
		set _error = 3, _errmsg = "No se puede borrar una actividad, si hay observaciones relacionadas";
	elseif ((select count(*) from evidencia where _idActividad = idActividad)>0)then
		set _error = 3, _errmsg = "No se puede borrar una actividad, si hay evidencias relacionadas";
	elseif ((select count(*) from bitacoraxactividades where _idActividad = idActividad)>0)then
		set _error = 3, _errmsg = "No se puede borrar una actividad, si hay bitacoxactividades relacionadas";
	elseif ((select count(*) from comentario where _idActividad = idActividad)>0)then
		set _error = 3, _errmsg = "No se puede borrar una actividad, si hay comentarios relacionados";
	elseif ((select count(*) from recordatorio where _idActividad = idActividad)>0)then
		set _error = 3, _errmsg = "No se puede borrar una actividad, si hay recordatorios relacionadas";
	else
		delete from Actividad where _idActividad = idActividad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	


#____________________________________________________Usuario
#Create
DELIMITER $$
CREATE PROCEDURE `createUsuario`(in _correo varchar(100), in _contrasenha varchar(50), 
								in _idRol int, in _idSede int, in _permiteNotis bool,
                                in _permiteChats bool)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_correo is null or _contrasenha is null )then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Rol where _idRol = idRol)=0 )then 
		set _error = 2, _errmsg = "Ese idRol no existe"; 
    else
		insert into Usuario(correo, contrasenha, idRol, idSede, permiteNotis, permiteChats) 
					values (_correo, _contrasenha, _idRol, _idSede, _permiteNotis, _permiteChats);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readUsuario`(in _idUsuario int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Usuario where _idUsuario = idUsuario)=0 )then 
		set _error = 2, _errmsg = "Ese idUsuario no existe";
	else
		select correo, contrasenha, idRol, idSede, permiteNotis, permiteChats from Usuario where _idUsuario = idUsuario;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateUsuario`(in _idUsuario int, in _correo varchar(100), 
								 in _contrasenha varchar(50), in _idRol int, in _idSede int, 
                                 in _permiteNotis bool, in _permiteChats bool)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Usuario where _idUsuario = idUsuario)=0 )then 
		set _error = 2, _errmsg = "Ese idUsuario no existe";
	elseif( _idRol is not null and (select count(*) from Rol where _idRol = idRol)=0 )then 
		set _error = 2, _errmsg = "Ese idRol no existe";
	else
		update Usuario 
		set correo = ifnull(_correo, correo),
			contrasenha = ifnull(_contrasenha, contrasenha),
            idRol = ifnull(_idRol, idRol),
            idSede = ifnull(_idSede, idSede),
            permiteNotis = ifnull(_permiteNotis, permiteNotis),
            permiteChats = ifnull(_permiteChats, permiteChats)
		where _idUsuario = idUsuario; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteUsuario`(in _idUsuario int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Usuario where _idUsuario = idUsuario)=0 )then 
		set _error = 2, _errmsg = "Ese idUsuario no existe";
	elseif ((select count(*) from Notificacion where _idUsuario = emisor)>0)then
		set _error = 3;
        set _errmsg = "No se puede borrar un usuario, si hay notificaciones relacionadas";
    elseif ((select count(*) from NotificacionesXUsuario where _idUsuario = idUsuario)>0)then
		set _error = 3;
        set _errmsg = "No se puede borrar un usuario, si hay NotificacionesXUsuario relacionados";    
	else
		delete from Usuario where _idUsuario = idUsuario; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Suscribir
DELIMITER $$
CREATE PROCEDURE `suscribirUsuario`(in _idUsuario int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Usuario where _idUsuario = idUsuario)=0 )then 
		set _error = 2, _errmsg = "Ese idUsuario no existe";
	else
		update Usuario 
		set permiteNotis = 1
		where _idUsuario = idUsuario; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#____________________________________________________Notificaciones
#Create
DELIMITER $$
CREATE PROCEDURE `createNotificacion`(in _emisor int, in _fechaHora datetime, in _contenido varchar(50))
BEGIN
    declare _error int;
    declare _errmsg varchar(100);
    
    if(_emisor is null or _fechaHora is null or _contenido is null) then
        set _error = 1;
        set _errmsg = "Los atributos emisor, fechaHora y contenido no pueden ser nulos.";
    elseif((select count(*) from Usuario where _emisor = idUsuario) = 0) then
        set _error = 2;
        set _errmsg = "El emisor especificado no existe en la tabla Usuario.";
    else
        insert into Notificacion(emisor, fechaHora, contenido) values (_emisor, _fechaHora, _contenido);
        select @@identity;
    end if;
    
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#Read
DELIMITER $$
CREATE PROCEDURE `readNotificacion`(in _idNotificacion int)
BEGIN
    declare _error int;
    declare _errmsg varchar(100);
    
    if((select count(*) from Notificacion where _idNotificacion = idNotificacion) = 0) then
        set _error = 2;
        set _errmsg = "La notificación con el ID especificado no existe.";
    else
        select idNotificacion, emisor, fechaHora, contenido from Notificacion where _idNotificacion = idNotificacion;
    end if;
    
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#Update
DELIMITER $$
CREATE PROCEDURE `updateNotificacion`(in _idNotificacion int, in _emisor int, in _fechaHora datetime, in _contenido varchar(50))
BEGIN
    declare _error int;
    declare _errmsg varchar(100);
    
    if((select count(*) from Notificacion where _idNotificacion = idNotificacion) = 0) then
        set _error = 2;
        set _errmsg = "La notificación con el ID especificado no existe.";
    elseif(_emisor is not null and (select count(*) from Usuario where _emisor = idUsuario) = 0) then
        set _error = 2;
        set _errmsg = "El emisor especificado no existe en la tabla Usuario.";
    else
        update Notificacion
        set emisor = ifnull(_emisor, emisor),
            fechaHora = ifnull(_fechaHora, fechaHora),
            contenido = ifnull(_contenido, contenido)
        where _idNotificacion = idNotificacion;
    end if;
    
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteNotificacion`(in _idNotificacion int)
BEGIN
    declare _error int;
    declare _errmsg varchar(100);
    
    if((select count(*) from Notificacion where _idNotificacion = idNotificacion) = 0) then
        set _error = 2;
        set _errmsg = "La notificación con el ID especificado no existe.";
    elseif ((select count(*) from NotificacionesXUsuario where _idNotificacion = idNotificacion)>0)then
		set _error = 3;
        set _errmsg = "No se puede borrar una notificaciones, si hay usuarios relacionados";
	else
        delete from Notificacion where _idNotificacion = idNotificacion;
    end if;
    
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#____________________________________________________NotificacionesXUSuario
#Create
DELIMITER $$
CREATE PROCEDURE `createNotificacionXUsuario`(in _idNotificacion int, in _idUsuario int, in _leida bool)
BEGIN
    declare _error int;
    declare _errmsg varchar(100);
    
    if(_idNotificacion is null or _idUsuario is null) then
        set _error = 1;
        set _errmsg = "Los atributos idNotificacion e idUsuario no pueden ser nulos.";
    elseif((select count(*) from Notificacion where _idNotificacion = idNotificacion) = 0) then
        set _error = 2;
        set _errmsg = "La notificación con el ID especificado no existe en la tabla Notificacion.";
    elseif((select count(*) from Usuario where _idUsuario = idUsuario) = 0) then
        set _error = 2;
        set _errmsg = "El usuario con el ID especificado no existe en la tabla Usuario.";
    else
        insert into NotificacionXUsuario(idNotificacion, idUsuario, leida) values (_idNotificacion, _idUsuario, _leida);
        select @@identity;
    end if;
    
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#Read
DELIMITER $$
CREATE PROCEDURE `readNotificacionXUsuario`(in _idNotificacionXUsuario int)
BEGIN
    declare _error int;
    declare _errmsg varchar(100);
    
    if((select count(*) from NotificacionXUsuario where _idNotificacionXUsuario = idNotificacionXUsuario) = 0) then
        set _error = 2;
        set _errmsg = "La relación NotificacionXUsuario con el ID especificado no existe.";
    else
        select idNotificacion, idUsuario from NotificacionXUsuario where _idNotificacionXUsuario = idNotificacionXUsuario;
    end if;
    
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#Update
DELIMITER $$
CREATE PROCEDURE `updateNotificacionXUsuario`(in _idNotificacionXUsuario int, in _idNotificacion int, in _idUsuario int)
BEGIN
    declare _error int;
    declare _errmsg varchar(100);
    
    if((select count(*) from NotificacionXUsuario where _idNotificacionXUsuario = idNotificacionXUsuario) = 0) then
        set _error = 2;
        set _errmsg = "La relación NotificacionXUsuario con el ID especificado no existe.";
    elseif(_idNotificacion is not null and (select count(*) from Notificacion where _idNotificacion = idNotificacion) = 0) then
        set _error = 2;
        set _errmsg = "La notificación con el ID especificado no existe en la tabla Notificacion.";
    elseif(_idUsuario is not null and (select count(*) from Usuario where _idUsuario = idUsuario) = 0) then
        set _error = 2;
        set _errmsg = "El usuario con el ID especificado no existe en la tabla Usuario.";
    else
        update NotificacionXUsuario
        set idNotificacion = ifnull(_idNotificacion, idNotificacion),
            idUsuario = ifnull(_idUsuario, idUsuario)
        where _idNotificacionXUsuario = idNotificacionXUsuario;
    end if;
    
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteNotificacionXUsuario`(in _idNotificacionXUsuario int)
BEGIN
    declare _error int;
    declare _errmsg varchar(100);
    
    if((select count(*) from NotificacionXUsuario where _idNotificacionXUsuario = idNotificacionXUsuario) = 0) then
        set _error = 2;
        set _errmsg = "La relación NotificacionXUsuario con el ID especificado no existe.";
    else
        delete from NotificacionXUsuario where _idNotificacionXUsuario = idNotificacionXUsuario;
    end if;
    
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________PlanTrabajo
#Create
DELIMITER $$
CREATE PROCEDURE `createPlanTrabajo`(in _anno int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_anno is null )then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	else
		insert into PlanTrabajo(anno) values (_anno);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readPlanTrabajo`(in _idPlan int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Plan where _idPlan = idPlan)=0 )then 
		set _error = 2, _errmsg = "Ese idPlan no existe";
	else
		select idPlan, anno from Plan where _idPlan = idPlan;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updatePlanTrabajo`(in _idPlan int, in _anno int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Plan where _idPlan = idPlan)=0 )then 
		set _error = 2, _errmsg = "Ese idPlan no existe";
	else
		update Plan 
		set anno = ifnull(_anno, anno)
		where _idPlan = idPlan; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deletePlanTrabajo`(in _idPlan int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Plan where _idPlan = idPlan)=0 )then 
		set _error = 2, _errmsg = "Ese idPlan no existe";
	elseif ((select count(*) from actividadesxplan where _idPlan = idPlan)>0)then
		set _error = 3, _errmsg = "No se puede borrar un plan, si hay actividadesxplan relacionadas";
	else
		delete from Plan where _idPlan = idPlan; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;



#____________________________________________________ActividadesxPlan
#Create
DELIMITER $$
CREATE PROCEDURE `createActividadesxPlan`(in _idActividad int, in _idPlan int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idActividad is null or _idPlan is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
    elseif( (select count(*) from PlanTrabajo where _idPlan = idPlan)=0 )then 
		set _error = 2, _errmsg = "Ese idPlan no existe";
    else
		insert into ActividadesxPlan(idActividad, idPlan) values (_idActividad, _idPlan);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readActividadesxPlan`(in _idActividadesxPlan int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ActividadesxPlan where _idActividadesxPlan = idActividadesxPlan)=0 )then 
		set _error = 2, _errmsg = "Ese idActividadesxPlan no existe";
	else
		select idActividadesxPlan, idActividad, idPlan from ActividadesxPlan where _idActividadesxPlan = idActividadesxPlan;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateActividadesxPlan`(in _idActividadesxPlan int, in _idActividad int, in _idPlan int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ActividadesxPlan where _idActividadesxPlan = idActividadesxPlan)=0 )then 
		set _error = 2, _errmsg = "Ese idPlan no existe";
	elseif(  _idActividad is not null and  (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
    elseif(  _idPlan is not null and (select count(*) from Plan where _idPlan = idPlan)=0 )then 
		set _error = 2, _errmsg = "Ese idPlan no existe";
    else
		update ActividadesxPlan
		set idActividad = ifnull(_idActividad, idActividad),
			idPlan = ifnull(_idPlan, idPlan)
		where _idActividadesxPlan = idActividadesxPlan; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteActividadesxPlan`(in _idActividadesxPlan int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ActividadesxPlan where _idActividadesxPlan = idActividadesxPlan)=0 )then 
		set _error = 2, _errmsg = "Ese idPlan no existe";
	else
		delete from ActividadesxPlan where _idActividadesxPlan = idActividadesxPlan; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Observacion
#Create
DELIMITER $$
CREATE PROCEDURE `createObservacion`(in _idActividad int, in _fechaCancelada date,  
									 in _detalle varchar(200))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idActividad is null or _idActividad is null or _fechaCancelada is null or 
		_detalle is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
    else
		insert into Observacion(idActividad, fechaCancelada, detalle) 
						values (_idActividad, _fechaCancelada, _detalle);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readObservacion`(in _idObservacion int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Observacion where _idObservacion = idObservacion)=0 )then 
		set _error = 2, _errmsg = "Ese idObservacion no existe";
	else
		select idObservacion, idActividad , fechaCancelada, detalle from Observacion 
        where _idObservacion = idObservacion;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateObservacion`(in _idObservacion int, in _idActividad int, in _fechaCancelada date,  
									 in _detalle varchar(200))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Observacion where _idObservacion= idObservacion)=0 )then 
		set _error = 2, _errmsg = "Ese idObservacion no existe";
	elseif( _idActividad is not null and  (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
    else
		update Observacion
		set idActividad = ifnull(_idActividad, idActividad),
			fechaCancelada = ifnull(_fechaCancelada, fechaCancelada),
			detalle = ifnull(_detalle, detalle)
		where _idObservacion= idObservacion; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteObservacion`(in _idObservacion int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Observacion where _idObservacion = idObservacion)=0 )then 
		set _error = 2, _errmsg = "Ese idObservacion no existe";
	else
		delete from Observacion where _idObservacion = idObservacion; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Evidencia
#Create
DELIMITER $$
CREATE PROCEDURE `createEvidencia`(in _idActividad int, in _linkGrabacion varchar(200))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idActividad is null or _linkGrabacion is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
    else
		insert into Evidencia(idActividad, linkGrabacion) 
						values (_idActividad, _linkGrabacion);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readEvidencia`(in _idEvidencia int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Evidencia where _idEvidencia = idEvidencia)=0 )then 
		set _error = 2, _errmsg = "Ese idEvidencia no existe";
	else
		select idEvidencia, idActividad , linkGrabacion from Evidencia 
        where _idEvidencia = idEvidencia;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateEvidencia`(in _idEvidencia int, in _idActividad int, in _linkGrabacion varchar(200))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Evidencia where _idEvidencia = idEvidencia)=0 )then 
		set _error = 2, _errmsg = "Ese idEvidencia no existe";
	elseif( _idActividad is not null and  (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
    else
		update Evidencia
		set idActividad = ifnull(_idActividad, idActividad),
			linkGrabacion = ifnull(_linkGrabacion, linkGrabacion)
		where _idEvidencia = idEvidencia; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteEvidencia`(in _idEvidencia int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Evidencia where _idEvidencia = idEvidencia)=0 )then 
		set _error = 2, _errmsg = "Ese idEvidencia no existe";
	else
		delete from Evidencia where _idEvidencia = idEvidencia; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;



#____________________________________________________EstadoCuenta
#Create
DELIMITER $$
CREATE PROCEDURE `createEstadoCuenta`(in _descripcion varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_descripcion is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	else
		insert into EstadoCuenta(descripcion) 
						values (_descripcion);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readEstadoCuenta`(in _idEstadoC int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EstadoCuenta where _idEstadoC = idEstadoC)=0 )then 
		set _error = 2, _errmsg = "Ese idEstadoC no existe";
	else
		select idEstadoC, descripcion from EstadoCuenta 
        where _idEstadoC = idEstadoC;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateEstadoCuenta`(in _idEstadoC int, in _descripcion varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EstadoCuenta where _idEstadoC = idEstadoC)=0 )then 
		set _error = 2, _errmsg = "Ese idEstadoC no existe";
	else
		update EstadoCuenta
		set descripcion = ifnull(_descripcion, descripcion)
		where _idEstadoC = idEstadoC; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteEstadoCuenta`(in _idEstadoC int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EstadoCuenta where _idEstadoC = idEstadoC)=0 )then 
		set _error = 2, _errmsg = "Ese idEstadoC no existe";
	elseif( (select count(*) from Profesor where _idEstadoC = idEstadoC)>0 )then 
		set _error = 2, _errmsg = "Si hay profesores relacionados no se puede borrar";
	elseif( (select count(*) from Estudiante where _idEstadoC = idEstadoC)>0 )then 
		set _error = 2, _errmsg = "Si hay estudiantes relacionados no se puede borrar";
	else
		delete from EstadoCuenta where _idEstadoC = idEstadoC; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Autoridad
#Create
DELIMITER $$
CREATE PROCEDURE `createAutoridad`(in _descripcion varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_descripcion is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	else
		insert into Autoridad(descripcion) 
						values (_descripcion);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readAutoridad`(in _idAutoridad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Autoridad where _idAutoridad = idAutoridad)=0 )then 
		set _error = 2, _errmsg = "Ese idAutoridad no existe";
	else
		select idAutoridad, descripcion from Autoridad 
        where _idAutoridad = idAutoridad;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateAutoridad`(in _idAutoridad int, in _descripcion varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Autoridad where _idAutoridad = idAutoridad)=0 )then 
		set _error = 2, _errmsg = "Ese idAutoridad no existe";
	else
		update Autoridad
		set descripcion = ifnull(_descripcion, descripcion)
		where _idAutoridad = idAutoridad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteAutoridad`(in _idAutoridad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Autoridad where _idAutoridad= idAutoridad)=0 )then 
		set _error = 2, _errmsg = "Ese idAutoridad no existe";
	elseif( (select count(*) from Profesor where _idAutoridad= idAutoridad)>0 )then 
		set _error = 2, _errmsg = "Si hay profesores relacionados no se puede borrar";
	else
		delete from Autoridad where _idAutoridad= idAutoridad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Sede
#Create
DELIMITER $$
CREATE PROCEDURE `createSede`(in _descripcion varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_descripcion is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	else
		insert into Sede(descripcion) 
						values (_descripcion);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readSede`(in _idSede int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Sede where _idSede = idSede)=0 )then 
		set _error = 2, _errmsg = "Ese idSede no existe";
	else
		select idSede, descripcion from Sede  
        where _idSede  = idSede ;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateSede`(in _idSede int, in _descripcion varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Sede  where _idSede  = idSede )=0 )then 
		set _error = 2, _errmsg = "Ese idSede  no existe";
	else
		update Sede 
		set descripcion = ifnull(_descripcion, descripcion)
		where _idSede  = idSede ; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteSede`(in _idSede int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Sede  where _idSede = idSede )=0 )then 
		set _error = 2, _errmsg = "Ese idSede  no existe";
	elseif( (select count(*) from Profesor where _idSede = idSede )>0 )then 
		set _error = 2, _errmsg = "Si hay profesores relacionados no se puede borrar";
	elseif( (select count(*) from asistenteadministrativo where _idSede = idSede )>0 )then 
		set _error = 2, _errmsg = "Si hay profesores relacionados no se puede borrar";
	elseif( (select count(*) from Estudiante where _idSede = idSede )>0 )then 
		set _error = 2, _errmsg = "Si hay profesores relacionados no se puede borrar";
	else
		delete from Sede  where _idSede = idSede ; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Profesor
#Create
DELIMITER $$
CREATE PROCEDURE `createProfesor`(in _cedula int, in _nombre varchar(50),
								 in _apellido1 varchar(50), in _apellido2 varchar(50),
								 in _idSede int, in _numeroCelular int,
								 in _correoElectronico varchar(200), in _numeroOficina int,
                                 in _idAutoridad int, in _idEstado int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_cedula is null or _nombre is null or _apellido1 is null or _apellido2 is null or
		_idSede is null or _numeroCelular is null or _correoElectronico is null or _numeroOficina 
		is null or _idAutoridad is null or _idEstado is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Sede where _idSede = idSede)=0 )then 
		set _error = 2, _errmsg = "Ese idSede no existe";
	elseif( (select count(*) from EstadoCuenta where _idEstado = idEstadoC)=0 )then 
		set _error = 2, _errmsg = "Ese idEstado no existe";
	elseif( (select count(*) from Autoridad where _idAutoridad = idAutoridad)=0 )then 
		set _error = 2, _errmsg = "Ese idAutoridad no existe";
    else
		insert into Profesor(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
								correoElectronico, numeroOficina, idAutoridad, 
                                idEstado) 
						values (_cedula, _nombre, _apellido1, _apellido2, _idSede, _numeroCelular,
								_correoElectronico, _numeroOficina, _idAutoridad, 
                                _idEstado);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readProfesor`(in _idProfesor int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from profesor where _idProfesor = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idProfesor no existe";
	else
		select idProfesor, cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
				correoElectronico, numeroOficina, idAutoridad, idEstado 
		from profesor  
        where _idProfesor = idProfesor ;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateProfesor`(in _idProfesor int,  in _cedula int,  in _nombre varchar(50),
								 in _apellido1 varchar(50), in _apellido2 varchar(50),
								 in _idSede int,  in _numeroCelular int,
								 in _correoElectronico varchar(200), in _numeroOficina int,
								 in _idAutoridad int, in _idEstado int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Profesor where _idProfesor  = idProfesor )=0 )then 
		set _error = 2, _errmsg = "Ese idProfesor  no existe";
	elseif( _idSede is not null and  (select count(*) from Sede where _idSede = idSede)=0 )then 
		set _error = 2, _errmsg = "Ese idSede no existe";
	elseif( _idEstado is not null and  (select count(*) from EstadoCuenta where _idEstado = idEstadoC)=0 )then 
		set _error = 2, _errmsg = "Ese idEstado no existe";
	elseif( _idAutoridad is not null and  (select count(*) from Autoridad where _idAutoridad = idAutoridad)=0 )then 
		set _error = 2, _errmsg = "Ese idAutoridad no existe";
    else
		update Profesor 
		set cedula = ifnull(_cedula, cedula), 
            nombre = ifnull(_nombre, nombre), 
            apellido1 = ifnull(_apellido1, apellido1), 
            apellido2 = ifnull(_apellido2, apellido2), 
            idSede = ifnull(_idSede, idSede), 
            numeroCelular = ifnull(_numeroCelular, numeroCelular),
            correoElectronico = ifnull(_correoElectronico, correoElectronico), 
            numeroOficina = ifnull(_numeroOficina, numeroOficina), 
            idAutoridad = ifnull(_idAutoridad, idAutoridad), 
            idEstado = ifnull(_idEstado, idEstado)
		where _idProfesor  = idProfesor ; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteProfesor`(in _idProfesor int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Profesor  where _idProfesor = idProfesor )=0 )then 
		set _error = 2, _errmsg = "Ese idProfesor  no existe";
	elseif( (select count(*) from EquipoGuia where _idProfesor = idProfesor )>0 )then 
		set _error = 2, _errmsg = "Si es el coordinador no se puede borrar";
	elseif( (select count(*) from profesoresxequipoguia where _idSede = idSede )>0 )then 
		set _error = 2, _errmsg = "Si esta dentro del equipo guia no se puede borrar";
	else
		delete from Profesor  where _idProfesor = idProfesor ; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Asistente Administrativo
#Create
DELIMITER $$
CREATE PROCEDURE `createAsistenteAdministrativo`(in _cedula int, in _nombre varchar(50),
								 in _apellido1 varchar(50), in _apellido2 varchar(50),
								 in _idSede int, in _numeroCelular int,
								 in _correoElectronico varchar(200), in _numeroOficina int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_cedula is null or _nombre is null or _apellido1 is null or _apellido2 is null or
		_idSede is null or _numeroCelular is null or _correoElectronico is null or _numeroOficina 
		is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Sede where _idSede = idSede)=0 )then 
		set _error = 2, _errmsg = "Ese idSede no existe";
	else
		insert into asistenteadministrativo(cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
								correoElectronico, numeroOficina) 
						values (_cedula, _nombre, _apellido1, _apellido2, _idSede, _numeroCelular,
								_correoElectronico, _numeroOficina);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readAsistenteAdministrativo`(in _idAsistente int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Asistente where _idAsistente = idAsistente)=0 )then 
		set _error = 2, _errmsg = "Ese idAsistente no existe";
	else
		select idAsistente, cedula, nombre, apellido1, apellido2, idSede, numeroCelular,
				correoElectronico, numeroOficina
		from AsistenteAdministrativo  
        where _idAsistente = idAsistente ;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateAsistenteAdministrativo`(in _idAsistente int,  
								 in _cedula int,  in _nombre varchar(50),
								 in _apellido1 varchar(50), in _apellido2 varchar(50),
								 in _idSede int,  in _numeroCelular int,
								 in _correoElectronico varchar(200), in _numeroOficina int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from asistenteadministrativo where _idAsistente  = idAsistente )=0 )then 
		set _error = 2, _errmsg = "Ese idAsistente  no existe";
	elseif( _idSede is not null and  (select count(*) from Sede where _idSede = idSede)=0 )then 
		set _error = 2, _errmsg = "Ese idSede no existe";
	else
		update AsistenteAdministrativo 
		set cedula = ifnull(_cedula, cedula), 
            nombre = ifnull(_nombre, nombre), 
            apellido1 = ifnull(_apellido1, apellido1), 
            apellido2 = ifnull(_apellido2, apellido2), 
            idSede = ifnull(_idSede, idSede), 
            numeroCelular = ifnull(_numeroCelular, numeroCelular),
            correoElectronico = ifnull(_correoElectronico, correoElectronico), 
            numeroOficina = ifnull(_numeroOficina, numeroOficina)
		where _idAsistente  = idAsistente ; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteAsistenteAdministrativo`(in _idAsistente int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Asistente  where _idAsistente = idAsistente )=0 )then 
		set _error = 2, _errmsg = "Ese idAsistente  no existe";
	else
		delete from AsistenteAdministrativo  where _idAsistente = idAsistente ; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Estudiante
#Create
DELIMITER $$
CREATE PROCEDURE `createEstudiante`(in _carnet int, in _nombre varchar(50),
								 in _apellido1 varchar(50), in _apellido2 varchar(50),
								 in _idSede int, in _numeroCelular int,
								 in _correoElectronico varchar(200), in _idEstado int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_carnet is null or _nombre is null or _apellido1 is null or _apellido2 is null or
		_idSede is null or _numeroCelular is null or _correoElectronico is null or _idEstado is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif ( (select count(*) from Estudiante where _carnet = carnet)>0 )then 
		set _error = 2, _errmsg = "Ese carnet ya existe";
    elseif( (select count(*) from Sede where _idSede = idSede)=0 )then 
		set _error = 2, _errmsg = "Ese idSede no existe";
	elseif( (select count(*) from EstadoCuenta where _idEstado = idEstadoC)=0 )then 
		set _error = 2, _errmsg = "Ese idEstado no existe";
	else
		insert into Estudiante(carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
								correoElectronico, idEstado) 
						values (_carnet, _nombre, _apellido1, _apellido2, _idSede, _numeroCelular,
								_correoElectronico, _idEstado);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readEstudiante`(in _idEstudiante int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Estudiante where _idEstudiante = idEstudiante)=0 )then 
		set _error = 2, _errmsg = "Ese idEstudiante no existe";
	else
		select carnet, nombre, apellido1, apellido2, idSede, numeroCelular,
				correoElectronico, idEstado 
		from Estudiante  
        where _idEstudiante = idEstudiante;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateEstudiante`(in _carnet int, in _nombre varchar(50),
								 in _apellido1 varchar(50), in _apellido2 varchar(50),
								 in _idSede int, in _numeroCelular int,
								 in _correoElectronico varchar(200), in _idEstado int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Estudiante where _carnet = carnet )=0 )then 
		set _error = 2, _errmsg = "Ese idEstudiante no existe";
	elseif(  _idSede is not null and  (select count(*) from Sede where _idSede = idSede)=0 )then 
		set _error = 2, _errmsg = "Ese idSede no existe";
	elseif( _idEstado is not null and   (select count(*) from EstadoCuenta where _idEstado = idEstadoC)=0 )then 
		set _error = 2, _errmsg = "Ese idEstado no existe";
	else
		update Estudiante 
		set nombre = ifnull(_nombre, nombre), 
            apellido1 = ifnull(_apellido1, apellido1), 
            apellido2 = ifnull(_apellido2, apellido2), 
            idSede = ifnull(_idSede, idSede), 
            numeroCelular = ifnull(_numeroCelular, numeroCelular),
            correoElectronico = ifnull(_correoElectronico, correoElectronico), 
            idEstado = ifnull(_idEstado, idEstado)
		where _carnet  = carnet; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteEstudiante`(in _carnet int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Estudiante  where _carnet = carnet )=0 )then 
		set _error = 2, _errmsg = "Ese idEstudiante  no existe";
	else
		delete from Estudiante  where _carnet = carnet; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________ResponsableXActividad
#Create
DELIMITER $$
CREATE PROCEDURE `createResponsableXActividad`(in _idResponsable int, 
											   in _idActividad varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idResponsable is null or _idActividad is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	elseif( (select count(*) from Profesor where _idResponsable = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idProfesor no existe";
	else
		insert into ResponsableXActividad(idResponsable, idActividad) 
						values (_idResponsable, _idActividad);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readResponsableXActividad`(in _idResponsableXActividad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ResponsableXActividad where _idResponsableXActividad = idResponsableXActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idResponsableXActividad no existe";
	else
		select idResponsableXActividad, idResponsable, idActividad
		from ResponsableXActividad  
        where _idResponsableXActividad = idResponsableXActividad;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateResponsableXActividad`(in _idResponsableXActividad int,  
											   in _idResponsable int, 
											   in _idActividad varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ResponsableXActividad where _idResponsableXActividad = idResponsableXActividad )=0 )then 
		set _error = 2, _errmsg = "Ese idResponsableXActividad no existe";
	elseif( _idResponsable is not null and  (select count(*) from Profesor where _idResponsable = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idResponsable no existe";
	elseif( _idActividad is not null and  (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	else
		update ResponsableXActividad 
		set idResponsable = ifnull(_idResponsable, idResponsable),
			idActividad = ifnull(_idActividad, idActividad)
		where _idResponsableXActividad = idResponsableXActividad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteResponsableXActividad`(in _idResponsableXActividad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ResponsableXActividad where _idResponsableXActividad = idResponsableXActividad )=0 )then 
		set _error = 2, _errmsg = "Ese idResponsableXActividad no existe";
	else
		delete from ResponsableXActividad where _idResponsableXActividad = idResponsableXActividad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________ProfesoresXEquipoGuia
#Create
DELIMITER $$
CREATE PROCEDURE `createProfesoresXEquipoGuia`(in _idEquipoGuia int, 
											   in _idProfesor varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idEquipoGuia is null or _idProfesor is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from EquipoGuia where _idEquipoGuia = idEquipoGuia)=0 )then 
		set _error = 2, _errmsg = "Ese idEquipoGuia no existe";
	elseif( (select count(*) from Profesor where _idProfesor = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idProfesor no existe";
	else
		insert into ProfesoresXEquipoGuia(idEquipoGuia, idProfesor) 
						values (_idEquipoGuia, _idProfesor);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readProfesoresXEquipoGuia`(in _idProfesoresXEquipoGuia int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ProfesoresXEquipoGuia where _idProfesoresXEquipoGuia = idProfesoresXEquipoGuia)=0 )then 
		set _error = 2, _errmsg = "Ese idProfesoresXEquipoGuia no existe";
	else
		select idProfesoresXEquipoGuia, idEquipoGuia, idProfesor
		from ProfesoresXEquipoGuia
        where _idProfesoresXEquipoGuia = idProfesoresXEquipoGuia;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateProfesoresXEquipoGuia`(in _idProfesoresXEquipoGuia int,  
											   in _idEquipoGuia int, 
											   in _idProfesor varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ProfesoresXEquipoGuia where _idProfesoresXEquipoGuia = idProfesorXEquipoGuia )=0 )then 
		set _error = 2, _errmsg = "Ese idProfesoresXEquipoGuia no existe";
	elseif( _idProfesor is not null and (select count(*) from Profesor where _idProfesor = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idProfesor no existe";
	elseif( _idEquipoGuia is not null and (select count(*) from EquipoGuia  where _idEquipoGuia  = idEquipoGuia )=0 )then 
		set _error = 2, _errmsg = "Ese idEquipoGuia  no existe";
	else
		update ProfesoresXEquipoGuia 
		set idProfesor = ifnull(_idProfesor, idProfesor),
			idEquipoGuia = ifnull(_idEquipoGuia, idEquipoGuia)
		where _idProfesoresXEquipoGuia = idProfesorXEquipoGuia; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteProfesoresXEquipoGuia`(in _idProfesoresXEquipoGuia int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from ProfesoresXEquipoGuia where _idProfesoresXEquipoGuia = idProfesoresXEquipoGuia )=0 )then 
		set _error = 2, _errmsg = "Ese idProfesoresXEquipoGuia no existe";
	else
		delete from ProfesoresXEquipoGuia where _idProfesoresXEquipoGuia = idProfesoresXEquipoGuia; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________BitacoraXEquipoGuia
#Create
DELIMITER $$
CREATE PROCEDURE `createBitacoraXEquipoGuia`(in _idEquipoGuia int, 
											   in _idBitacora varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idEquipoGuia is null or _idBitacora is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from EquipoGuia where _idEquipoGuia = idEquipoGuia)=0 )then 
		set _error = 2, _errmsg = "Ese idEquipoGuia no existe";
	elseif( (select count(*) from Bitacora where _idBitacora = idBitacora)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacora no existe";
	else
		insert into BitacoraXEquipoGuia(idEquipoGuia, idBitacora) 
						values (_idEquipoGuia, _idBitacora);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readBitacoraXEquipoGuia`(in _idBitacoraXEquipoGuia int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from BitacoraXEquipoGuia where _idBitacoraXEquipoGuia = idBitacoraXEquipoGuia)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacoraXEquipoGuia no existe";
	else
		select idBitacoraXEquipoGuia, idEquipoGuia, idBitacora
		from BitacoraXEquipoGuia
        where _idBitacoraXEquipoGuia = idBitacoraXEquipoGuia;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateBitacoraXEquipoGuia`(in _idBitacoraXEquipoGuia int,  
											   in _idEquipoGuia int, 
											   in _idBitacora varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from BitacoraXEquipoGuia where _idBitacoraXEquipoGuia = idBitacoraXEquipoGuia)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacoraXEquipoGuia no existe";
	elseif(  _idBitacora is not null and (select count(*) from Bitacora where _idBitacora = idBitacora)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacora no existe";
	elseif(  _idEquipoGuia is not null and (select count(*) from EquipoGuia  where _idEquipoGuia  = idEquipoGuia )=0 )then 
		set _error = 2, _errmsg = "Ese idEquipoGuia  no existe";
	else
		update idBitacoraXEquipoGuia  
		set idBitacora = ifnull(_idBitacora, idBitacora),
			idEquipoGuia = ifnull(_idEquipoGuia, idEquipoGuia)
		where _idBitacoraXEquipoGuia = idBitacoraXEquipoGuia; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteBitacoraXEquipoGuia`(in _idBitacoraXEquipoGuia int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from BitacoraXEquipoGuia where _idBitacoraXEquipoGuia = idBitacoraXEquipoGuia )=0 )then 
		set _error = 2, _errmsg = "Ese idBitacoraXEquipoGuia no existe";
	else
		delete from BitacoraXEquipoGuia where _idBitacoraXEquipoGuia = idBitacoraXEquipoGuia; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________BitacoraXActividades
#Create
DELIMITER $$
CREATE PROCEDURE `createBitacoraXActividades`(in _idActividad int, 
											   in _idBitacora varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idActividad is null or _idBitacora is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	elseif( (select count(*) from Bitacora where _idBitacora = idBitacora)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacora no existe";
	else
		insert into BitacoraXActividades(idActividad, idBitacora) 
						values (_idActividad, _idBitacora);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readBitacoraXActividades`(in _idBitacoraXActividades int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from BitacoraXActividades where _idBitacoraXActividades = idBitacoraXActividades)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacoraXActividades no existe";
	else
		select idBitacoraXActividades, idActividad, idBitacora
		from BitacoraXActividades
        where _idBitacoraXActividades = idBitacoraXActividades;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateBitacoraXActividades`(in _idBitacoraXActividades int,  
											   in _idActividad int, 
											   in _idBitacora varchar(50))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from BitacoraXActividades where _idBitacoraXActividades = idBitacoraXActividades)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacoraXActividades no existe";
	elseif( _idActividad is not null and (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	elseif( _idBitacora is not null and (select count(*) from Bitacora  where _idBitacora  = idBitacora )=0 )then 
		set _error = 2, _errmsg = "Ese idBitacora  no existe";
	else
		update BitacoraXActividades 
		set idActividad = ifnull(_idActividad, idActividad),
			idBitacora = ifnull(_idBitacora, idBitacora)
		where _idBitacoraXActividades = idBitacoraXActividades; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteBitacoraXActividades`(in _idBitacoraXActividades int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from BitacoraXActividades where _idBitacoraXActividades = idBitacoraXActividades)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacoraXActividades no existe";
	else
		delete from BitacoraXActividades where _idBitacoraXActividades = idBitacoraXActividades; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#____________________________________________________EquipoGuia
#Create
DELIMITER $$
CREATE PROCEDURE `createEquipoGuia`(in _idCoordinador int, in _anho int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idCoordinador is null or _anho is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Profesor where _idCoordinador = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idCoordinador no existe";
	else
		insert into EquipoGuia(idCoordinador, anho) 
						values (_idCoordinador, _anho);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readEquipoGuia`(in _idEquipoGuia int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EquipoGuia where _idEquipoGuia = idEquipoGuia)=0 )then 
		set _error = 2, _errmsg = "Ese idEquipoGuia no existe";
	else
		select idEquipoGuia, idCoordinador, anho
		from EquipoGuia
        where _idEquipoGuia = idEquipoGuia;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateEquipoGuia`(in _idEquipoGuia int, in _idCoordinador int, in _anho int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EquipoGuia where _idEquipoGuia = idEquipoGuia)=0 )then 
		set _error = 2, _errmsg = "Ese idEquipoGuia no existe";
	elseif( _idCoordinador is not null and (select count(*) from Profesor where _idCoordinador = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idProfesor no existe";
	else
		update EquipoGuia 
		set idCoordinador = ifnull(_idCoordinador, idCoordinador),
			anho = ifnull(_anho, anho)
		where _idEquipoGuia = idEquipoGuia; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteEquipoGuia`(in _idEquipoGuia int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from EquipoGuia where _idEquipoGuia = idEquipoGuia)=0 )then 
		set _error = 2, _errmsg = "Ese idEquipoGuia no existe";
	else
		delete from EquipoGuia where _idEquipoGuia = idEquipoGuia; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;



#____________________________________________________Bitacora
#Create
DELIMITER $$
CREATE PROCEDURE `createBitacora`(in _fecha date, in _hora time, in _idAutor int, in _descripcion varchar(100))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_fecha is null or _hora is null or _idAutor is null or _descripcion is null)then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Profesor where _idAutor = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idAutor no existe";
	else
		insert into Bitacora(fecha , hora, idAutor, descripcion) 
						values (_fecha , _hora, _idAutor, _descripcion);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readBitacora`(in _idBitacora int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Bitacora where _idBitacora = idBitacora)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacora no existe";
	else
		select idBitacora, fecha, hora, idAutor, descripcion
		from Bitacora
        where _idBitacora = idBitacora;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateBitacora`(in _idBitacora int, in _fecha date, in _hora time, in _idAutor int, in _descripcion varchar(100))
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Bitacora where _idBitacora = idBitacora)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacora no existe";
	elseif( _idAutor is not null and (select count(*) from Profesor where _idAutor = idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idAutor no existe";
	else
		update Bitacora 
		set fecha = ifnull(_fecha, fecha), hora = ifnull(_hora, hora), 
			idAutor = ifnull(_idAutor, idAutor),
            descripcion = ifnull(_descripcion, descripcion)
		where _idBitacora = idBitacora; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteBitacora`(in _idBitacora int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Bitacora where _idBitacora = idBitacora)=0 )then 
		set _error = 2, _errmsg = "Ese idBitacora no existe";
	elseif( (select count(*) from bitacoraxequipoguia where _idBitacora = idBitacora)>0 )then 
		set _error = 2, _errmsg = "Si hay bitacoraxequipoguia relacionados no se puede borrar";
	elseif( (select count(*) from bitacoraxactividades where _idBitacora = idBitacora)>0 )then 
		set _error = 2, _errmsg = "Si hay bitacoraxactividades relacionados no se puede borrar";
	else
		delete from Bitacora where _idBitacora = idBitacora; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Comentario
#Create
DELIMITER $$
CREATE PROCEDURE `createComentario`(in _idActividad int, in _autor int, in _fechaHora datetime, 
									in _contenido varchar(200), in _idComentarioPadre int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idActividad is null or _autor is null or _fechaHora is null or _contenido is null or
		_idComentarioPadre is null) then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	else
		insert into Comentario(idActividad, autor, fechaHora, contenido, idComentarioPadre) 
						values (_idActividad, _autor, _fechaHora, _contenido, _idComentarioPadre);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readComentario`(in _idComentario int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Comentario where _idComentario = idComentario)=0 )then 
		set _error = 2, _errmsg = "Ese idComentario no existe";
	else
		select idActividad, autor, fechaHora, contenido, idComentarioPadre
		from Comentario
        where _idComentario = idComentario;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateComentario`(in _idComentario int, in _idActividad int, in _autor int, 
									in _fechaHora datetime, in _contenido varchar(200), 
									in _idComentarioPadre int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Comentario where  _idComentario = idComentario)=0 )then 
		set _error = 2, _errmsg = "Ese idComentario no existe";
	elseif( _idActividad is not null and(select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	else
		update Comentario 
		set idActividad = ifnull(_idActividad,idActividad), 
			autor = ifnull(_autor, autor), 
			fechaHora = ifnull(_fechaHora, fechaHora),
			contenido = ifnull(_contenido, contenido), 
			idComentarioPadre = ifnull(_idComentarioPadre, idComentarioPadre)
        where _idComentario = idComentario;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteComentario`(in _idComentario int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Comentario where _idComentario = idComentario)=0 )then 
		set _error = 2, _errmsg = "Ese idComentario no existe";
	else
		delete from Comentario where _idComentario = idComentario; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#____________________________________________________Recordatorio
#Create
DELIMITER $$
CREATE PROCEDURE `createRecordatorio`(in _idActividad int, in _fecha date)
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idActividad is null or _fecha is null ) then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	else
		insert into recordatorio(idActividad, fecha) 
						values (_idActividad, _fecha);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Read
DELIMITER $$
CREATE PROCEDURE `readRecordatorio`(in _idRecordatorio int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Recordatorio where _idRecordatorio = idRecordatorio)=0 )then 
		set _error = 2, _errmsg = "Ese idRecordatorio no existe";
	else
		select idRecordatorio, idActividad, fecha
		from Recordatorio
        where _idRecordatorio = idRecordatorio;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Update
DELIMITER $$
CREATE PROCEDURE `updateRecordatorio`(in _idRecordatorio int, in _idActividad int, in _fecha date)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Recordatorio where  _idRecordatorio= idRecordatorio)=0 )then 
		set _error = 2, _errmsg = "Ese idRecordatorio no existe";
	elseif( _idActividad is not null and(select count(*) from Actividad where _idActividad = idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idActividad no existe";
	else
		update Recordatorio 
		set idActividad = ifnull(_idActividad,idActividad), 
			fecha = ifnull(_fecha, fecha)
        where _idRecordatorio = idRecordatorio;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#Delete
DELIMITER $$
CREATE PROCEDURE `deleteRecordatorio`(in _idRecordatorio int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Recordatorio where _idRecordatorio= idRecordatorio)=0 )then 
		set _error = 2, _errmsg = "Ese idRecordatorio no existe";
	else
		delete from Recordatorio where _idRecordatorio= idRecordatorio; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#NUEVOS CAMBIOS 
#____________________________________________________Mensaje
#Create
DELIMITER $$ 
CREATE PROCEDURE `agregarMensaje`(in _idChat int, in _idAutor int, in _fechaHora datetime, 
									in _contenido varchar(200))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idChat is null or _idAutor is null or _fechaHora is null or _contenido is null) then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	elseif( (select count(*) from Chat where _idChat = idChat)=0 )then 
		set _error = 2, _errmsg = "Ese Chat no existe";
	else
		insert into Mensaje(idChat, idAutor, fechaHora, contenido) 
						values (_idChat, _idAutor, _fechaHora, _contenido);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	

#____________________________________________________Chat
#Create
DELIMITER $$ 
CREATE PROCEDURE `crearChat`(in _idAutor int, in _nombre varchar(200))
BEGIN
	declare _error int; declare _errmsg varchar(100);
    if(_idAutor is null or _nombre is null) then 
		-- si se quiere crear ningún atributo puede ser nulo, solo el id
		set _error = 1, _errmsg = "Para crear uno nuevo ningún atributo puede ser nulo";
	else
		insert into Chat(idAutor,nombre) 
						values (_idAutor,_nombre);
		select @@identity;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;	


