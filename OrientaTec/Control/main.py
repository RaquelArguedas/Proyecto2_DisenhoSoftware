from SingletonDAO import *
from MainController import *

if __name__ == "__main__":
    
    control = MainController()
    #esto solamente lo puse para que vean que el singleton funciona
    if id(control.controlActividades.dao) == id(control.controlEquipoGuia.dao):
        print("Funciona")
    else:
        print("sad")

    #print(control.buscarEstudiante(1).nombre)
    #print(control.crearProfesor(4, "Raquel", "Arguedas", "Sanchez", 1, 8989, "r.arguedas@gmail.com", 999, None, 1,1))

    print("\n")
    dao = SingletonDAO()
    prof = dao.profesores[0]
    print(control.getEquipoGuia())
    print(control.agregarProfesor(prof, 1))
    print(control.getEquipoGuia())

    '''
    s1 = SingletonDAO()
    s1.printIt()

    s2 = SingletonDAO()

    if s1 == s2:
        print("Todo sano")
    '''
    
