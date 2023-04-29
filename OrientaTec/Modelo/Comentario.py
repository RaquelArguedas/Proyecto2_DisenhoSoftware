class Comentario:
    def __init__(self,idActividad,autor,fecha,hora,
               contenido, idComentarioPadre):
        self.idActividad =idActividad
        self.autor= autor
        self.fecha = fecha
        self.hora = hora
        self.contenido = contenido
        self.idComentarioPadre = idComentarioPadre