from SingletonDAO import *
from MainController import *
from datetime import time, datetime
from SingletonSesionActual import *
import json

if __name__ == "__main__":
    
    control = MainController()


    e=control.buscarEstudiante(20198)

    jsonStr = json.dumps(e.__dict__)
    control.modificarActividad(1,'nombreActividad', 1, 
                             datetime.now().date(), datetime.now().time(), datetime.now().time(), 
                             1, 1,'enlace',1)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))
    
