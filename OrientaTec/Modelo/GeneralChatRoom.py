from ChatRoom import ChatRoom
from ChatRoomMember import ChatRoomMember
#Esta es una subclase de ChatRoom
class GeneralChatRoom(ChatRoom):
    def __init__(self, miembros,nombre):
        self.miembros = miembros
        self.nombre= nombre

    #def agregarMiembro(self, member:ChatRoomMember)
    def agregarMiembro(self,miembro):
        #validacion de datos
        if type(miembro) is ChatRoomMember.ChatRoomMember: #validacion de que sea profesor o estudiante
            self.miembros.append(miembro)
            return True
        else:
            return False
        
    def enviarMensaje(self,mensaje,hora,idRemitente):
        if mensaje != '' and hora != None and idRemitente != None:
            print('Crear mensaje')
            return True
        else:
            return False