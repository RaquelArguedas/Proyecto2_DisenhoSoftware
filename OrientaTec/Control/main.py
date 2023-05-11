from SingletonDAO import *
from MainController import *
from datetime import time
from SingletonSesionActual import *
import json

if __name__ == "__main__":
    
    control = MainController()


    e=control.buscarEstudiante(20198)

    jsonStr = json.dumps(e.__dict__)
    print (jsonStr)
    

    


    print(int(None))

    prof = control.getProfesor(1)
    print(prof.codigo, " ", prof.nombre)
    prof = control.getProfesorCodigo("SJ-1")
    print(prof.codigo, " ", prof.nombre)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))
    
