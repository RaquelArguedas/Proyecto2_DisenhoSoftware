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