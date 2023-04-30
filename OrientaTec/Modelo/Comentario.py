class Comentario:
    def __init__(self,idActividad,autor,fechaHora,
               contenido, idComentarioPadre):
        self.idActividad =idActividad
        self.autor= autor
        self.fechaHora = fechaHora
        self.contenido = contenido
        self.idComentarioPadre = idComentarioPadre