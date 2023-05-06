from SingletonDAO import *
from MainController import *
from datetime import time
from SingletonSesionActual import *

if __name__ == "__main__":
    
    control = MainController()
    #esto solamente lo puse para que vean que el singleton funciona
    if id(control.controlActividades.dao) == id(control.controlEquipoGuia.dao):
        print("Funciona")
    else:
        print("sad")


    print("\n")
    dao = SingletonDAO()

    estudiantes = control.consultarEstudiantes(Ordenamiento.SEDE)

    estudiantes = control.consultarEstudiantes(Ordenamiento.CARNET)
    
    estudiantes = control.consultarEstudiantes(Ordenamiento.ALFABETICAMENTE)


    for estudiante in estudiantes:
        print(str(estudiante))

    


    
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))
    
