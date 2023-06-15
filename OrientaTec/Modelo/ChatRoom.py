#Clase abstracta que implementan todas las salas de chat
from abc import ABC, abstractmethod

class ChatRoom(ABC):
    @abstractmethod
    def enviarMensaje(self, mensaje, hora, idRemitente):
        pass
    
    @abstractmethod
    def agregarMiembro(self, miembro):
        pass

