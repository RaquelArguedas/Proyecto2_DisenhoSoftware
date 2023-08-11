#Clase abstracta que implementan todas las salas de chat
from abc import ABC, abstractmethod
#MEDIATOR
class ChatRoom(ABC):
    @abstractmethod
    def enviarMensaje(self, idChat, mensaje, hora, idRemitente):
        pass
    
    @abstractmethod
    def agregarMiembro(self, idChat, miembro):
        pass

    @abstractmethod
    def crearChat(self, nombre,miembros,idAutor):
        pass
