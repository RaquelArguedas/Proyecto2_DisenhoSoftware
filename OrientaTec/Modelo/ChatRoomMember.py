#Clase abstracta que implementan todos los miembros de un chat

from ChatRoom import ChatRoom

class ChatRoomMember():
    def __init__(self,idUsuario):
        self.idUsuario = idUsuario
        self.chatRoom = ChatRoom()

#def enviarMensaje(self,mensaje:string,hora:datetime,idRemitente:int):
    def enviarMensaje(self,mensaje,hora,idRemitente):
        self.chatRoom.enviarMensaje(mensaje,hora,idRemitente)