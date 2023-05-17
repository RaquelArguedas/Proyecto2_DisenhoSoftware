from SingletonDAO import *
from MainController import *
from datetime import time, datetime
from SingletonSesionActual import *
import json

if __name__ == "__main__":
    
    control = MainController()


    e=control.buscarEstudiante(20198)

    jsonStr = json.dumps(e.__dict__)
    print(control.getUsuarioRol("as@gmail.com", "rafa"))
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))

