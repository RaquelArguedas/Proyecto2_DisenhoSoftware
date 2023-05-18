from SingletonDAO import *
from MainController import *
from datetime import time, datetime, date
from SingletonSesionActual import *

if __name__ == "__main__":
    
    control = MainController()


    e=control.buscarEstudiante(20198)

    print(control.getProfesorCedula(189).nombre)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))


    dao = SingletonDAO()

    ac = dao.verActividad(13)
    
    acDic = ac.__dict__
    fecha_str = '2023-04-17 00:00:00'
    fecha_dt = datetime.strptime(fecha_str, '%Y-%m-%d %H:%M:%S')

    print(fecha_dt.date())

    
