class Comentario:
    def __init__(self,idActividad,autor,fechaHora,
               contenido, idComentarioPadre, idComentario):
        self.idActividad =idActividad
        self.autor= autor
        self.fechaHora = fechaHora
        self.contenido = contenido
        self.idComentarioPadre = idComentarioPadre
        self.idComentario = idComentario