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
    fecha = datetime.date(2023, 6, 6)
    recordatorio = Recordatorio(13,fecha)

    # # Agregar el nuevo recordatorio a la lista de recordatorios existente
    listaRec = ac.recordatorios + [recordatorio]
    
    control.crearActividad("nombre", 1, datetime.datetime(2023, 6, 6, 10, 30, 0), datetime.datetime(2023, 6, 6, 10, 30, 0),datetime.datetime(2023, 6, 6, 10, 30, 0), listaRec, ac.responsables
                           , 1, "rfirb", 1)
    
