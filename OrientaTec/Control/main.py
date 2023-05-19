from SingletonDAO import *
from MainController import *
from datetime import time, datetime, date
from SingletonSesionActual import *

if __name__ == "__main__":
    
    control = MainController()


    #e=control.buscarEstudiante(20198)

    #print(control.getProfesorCedula(189).nombre)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))


    dao = SingletonDAO()

    ac = dao.verActividad(13)
    dic = {}
    for i in range(3):
        dic[str(i)] = "hola"

    print(dic)



    
    #for e in control.consultarEstudiantes(3):
     #   print(e.sede)

    print('Pruebas de excel')
    print('Respuesta de la funcion:')
    print(dao.generarExcelSede(1))
    
