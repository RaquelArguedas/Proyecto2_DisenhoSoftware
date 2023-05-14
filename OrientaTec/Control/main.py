from SingletonDAO import *
from MainController import *
from datetime import time, datetime
from SingletonSesionActual import *
import json

if __name__ == "__main__":
    
    control = MainController()
    dao = SingletonDAO()


    e=control.buscarEstudiante(20198)

    print(control.getProfesorCedula(189).nombre)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))
    
