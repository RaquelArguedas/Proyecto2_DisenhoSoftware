#store procedures not CRUDS

#Borra de profesoresxequipoguia el campo con el idProfesor indicado del equipoguía actual
DELIMITER $$
CREATE PROCEDURE `darDeBaja`(in _idProfesor int)
BEGIN
	declare _error int; declare _errmsg varchar(100); declare _idEquipoGuia int;
	if( (select count(*) from Profesor where _idProfesor= idProfesor)=0 )then 
		set _error = 2, _errmsg = "Ese idProfesor no existe";
	elseif ((select count(*) from profesoresxequipoguia where _idProfesor= idProfesor)=0)then
		set _error = 2, _errmsg = "Ese ´profesor no está en el equipo guia";		
	else
		set _idEquipoGuia = (select idEquipoGuia from EquipoGuia order by anho desc limit 1);
        delete from profesoresxequipoguia where idProfesor = _idProfesor and idEquipoGuia = _idEquipoGuia;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;



#Quita responsables de una actividad
DELIMITER $$
CREATE PROCEDURE `quitarResponsablesActividad`(in _idResponsable int, in _idActividad int)
BEGIN
	declare _error int; declare _errmsg varchar(100); declare _idEquipoGuia int;
	if ((select count(*) from responsablexactividad where _idResponsable= idResponsable
													  and _idActividad=idActividad)=0)then
		set _error = 2, _errmsg = "Ese ´profesor no es responsable de la actividad";		
	else
		delete from responsablexactividad where _idResponsable= idResponsable
											and _idActividad=idActividad;
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;


#crea el bitacoraxequipoguia
DELIMITER $$
CREATE PROCEDURE `modificarEquipoGuia`(in _anho int, in _idBitacora int)
BEGIN
	declare _idEquipoGuia int;
    set _idEquipoGuia = (select idEquipoGuia from EquipoGuia where anho = _anho);
    call createBitacoraXEquipoGuia (_idEquipoGuia, _idBitacora);
END$$
DELIMITER ;

#eliminar los recordatorios con un idActividad
DELIMITER $$
CREATE PROCEDURE `deleteRecordatorioActividad`(in _idActividad int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from Actividad where _idActividad= idActividad)=0 )then 
		set _error = 2, _errmsg = "Ese idRecordatorio no existe";
	else
		delete from Recordatorio where _idActividad = idActividad; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#eliminar las notificaciones de un usuario
DELIMITER $$
CREATE PROCEDURE `deleteNotificacionesUsuario`(in _idUsuario int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from notificacionxusuario where _idUsuario= idUsuario)=0 )then 
		set _error = 2, _errmsg = "Ese usuario no tiene notificaciones";
	else
		delete from notificacionxusuario where _idUsuario= idUsuario; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#eliminar la notificacion de un usuario
DELIMITER $$
CREATE PROCEDURE `deleteNotificacionUsuario`(in _idNotificacion int, in _idUsuario int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from notificacionxusuario where _idUsuario= idUsuario and _idNotificacion= idNotificacion)=0 )then 
		set _error = 2, _errmsg = "Ese usuario no tiene esa notificacion";
	else
		delete from notificacionxusuario where _idUsuario= idUsuario and _idNotificacion= idNotificacion; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

#retorna el bool leida de una notificacion de un usuario
DELIMITER $$
CREATE PROCEDURE `getLeida`(in _idNotificacion int, in _idUsuario int)
BEGIN
	declare _error int; declare _errmsg varchar(100);
	if( (select count(*) from notificacionxusuario where _idUsuario= idUsuario and _idNotificacion= idNotificacion)=0 )then 
		set _error = 2, _errmsg = "Ese usuario no tiene esa notificacion";
	else
		select leida from notificacionxusuario where _idUsuario= idUsuario and _idNotificacion= idNotificacion; 
	end if;
    if (_error is not null) then select _error, _errmsg; end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `toggleLeida`(IN _idNotificacion INT, IN _idUsuario INT)
BEGIN
    DECLARE _leida BOOL;declare _error int; declare _errmsg varchar(100);
    
    SELECT leida INTO _leida
    FROM NotificacionXUsuario
    WHERE idNotificacion = _idNotificacion AND idUsuario = _idUsuario;
    
    IF _leida IS NULL THEN
        SET _error = 2, _errmsg = "Ese usuario no tiene esa notificacion";
        SELECT _error, _errmsg;
    ELSE
        UPDATE NotificacionXUsuario
        SET leida = NOT _leida
        WHERE idNotificacion = _idNotificacion AND idUsuario = _idUsuario;
        
        SELECT NOT _leida AS leida;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `setleidasUsuario`(IN _idUsuario INT, IN _leida BOOL)
BEGIN
    DECLARE _error INT DEFAULT 0;
    DECLARE _errmsg VARCHAR(100);
    
    -- Verificar si el usuario tiene notificaciones
    IF (SELECT COUNT(*) FROM NotificacionXUsuario WHERE idUsuario = _idUsuario) = 0 THEN
        SET _error = 1;
        SET _errmsg = "El usuario no tiene notificaciones en la tabla NotificacionXUsuario.";
    ELSE
        -- Actualizar el atributo leida
        UPDATE NotificacionXUsuario
        SET leida = _leida
        WHERE idUsuario = _idUsuario;
    END IF;
    
    -- Devolver el resultado
    IF _error = 0 THEN
        SELECT ROW_COUNT() AS total_actualizadas;
    ELSE
        SELECT _error AS error, _errmsg AS errmsg;
    END IF;
END$$
DELIMITER ;

