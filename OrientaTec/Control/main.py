from SingletonDAO import *
from MainController import *
from datetime import time, datetime
from SingletonSesionActual import *

if __name__ == "__main__":
    
    control = MainController()


    e=control.buscarEstudiante(20198)

    print(control.getProfesorCedula(189).nombre)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))


    dao = SingletonDAO()
    
    for e in control.consultarEstudiantes(3):
        print(e.sede)
    
