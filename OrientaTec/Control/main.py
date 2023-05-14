from SingletonDAO import *
from MainController import *
from datetime import time, datetime
from SingletonSesionActual import *
import json

if __name__ == "__main__":
    
    control = MainController()


    e=control.buscarEstudiante(20198)

    print(control.getProfesorCedula(189).nombre)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))
    
    print("\n")
    dao = SingletonDAO()
    #prof = dao.profesores[0]
    """print(control.getEquipoGuia())
    print(control.agregarProfesor(prof, 1))
    print(control.getEquipoGuia())
    """

    estudiantes = control.consultarEstudiantes(Ordenamiento.SEDE)

    s2 = SingletonDAO()

    if s1 == s2:
        print("Todo sano")
    '''
    #Pruebas Mongo
    #dao.registrarFotoEvLista(2,"La nueva foto 2")
    dao.getALLEvLista()
   #dao.getFotoEvLista(2)
    #print(dao.getFotoProfesor(1))
    '''

