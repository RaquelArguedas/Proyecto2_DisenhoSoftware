from SingletonDAO import *
from MainController import *
#from datetime import time, datetime, date
import datetime
from SingletonSesionActual import *

if __name__ == "__main__":
    
    control = MainController()


    #e=control.buscarEstudiante(20198)

    #print(control.getProfesorCedula(189).nombre)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))


    dao = SingletonDAO()

    # for ac in dao.actividades:
    #     print("____________________________")
    #     print(ac.idActividad)
    #     for r in ac.recordatorios:
    #         print(r.idActividad, type(r.fecha))

    ac = dao.verActividad(12)
    #print(ac)
    # Crear una nueva instancia de la clase Recordatorio
    #control.crearUsuario("correo", "contra", 1, 1, True, True)
    # for user in dao.usuarios:
    #     print(user)

    print("__________________________")
    print(control.notificacionUsuarios(5, 78))
    # for noti in dao.usuarios[0].notificaciones:
    #     print(noti)

    # id = dao.createNotificacion(1, datetime.now(), "contenido")
    # dao.notificacionUsuarios(id, 1)

    # print("__________________________")
    # for noti in dao.usuarios[0].notificaciones:
    #     print(noti)



    



    
