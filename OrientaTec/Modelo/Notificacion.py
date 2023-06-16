class Notificacion:
    def __init__(self, idNotificacion, emisor, fechaHora, contenido, tipoEmisor, leida):
        self.idNotificacion = idNotificacion
        self.emisor = emisor
        self.fechaHora = fechaHora
        self.contenido = contenido
        self.tipoEmisor = tipoEmisor
        self.leida = leida

    def __str__(self):
        return f"Notificacion(idNotificacion={self.idNotificacion}, emisor={self.emisor}, " \
               f"fechaHora='{self.fechaHora}', contenido='{self.contenido}', leida='{self.leida})"
    
    def invertirLeida(self):
        self.leida = not bool(self.leida)
