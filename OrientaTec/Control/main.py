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
    

    


    lista = control.consultarActividadesEstado(4)
    for a in lista:
        print(a.estado)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))
    
