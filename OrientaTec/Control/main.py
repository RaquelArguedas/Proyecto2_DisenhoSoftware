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
    

    


    ac = control.consultarProximaActividad()
    acDic = ac.__dict__
    for clave in acDic:
        #print(acDic[clave], " ", type(acDic[clave]))
        if (type(acDic[clave]) != list and type(acDic[clave]) != int and type(acDic[clave]) != str):
            print(acDic[clave])
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))
    
