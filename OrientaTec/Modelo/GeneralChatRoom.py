from ChatRoom import ChatRoom
from ChatRoomMember import ChatRoomMember
#Esta es una subclase de ChatRoom
class GeneralChatRoom(ChatRoom):
    def __init__(self,id,miembros,nombre,idAutor):
        self.miembros = miembros
        self.nombre= nombre
        self.id = id
        self.idAutor = idAutor

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
        
    def crearChat(self, nombre,miembros,idAutor):
        if nombre != '' and idAutor != None and miembros != []:
            print('Se ha creado el chat')
            return True
        else:
            return False
        
    def quitarMiembro(self, usuario):
        self.miembros.remove(usuario) 
        
    
