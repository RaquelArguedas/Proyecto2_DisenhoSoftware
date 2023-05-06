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
    print(len(dao.bitacoras))
    print(len(dao.verActividad(1).modificaciones))
    dao.bitacoraActividad(1, date.today(), '13:00:00', 1, "descripcion")
    print(len(dao.bitacoras))
    print(len(dao.verActividad(1).modificaciones))
    
