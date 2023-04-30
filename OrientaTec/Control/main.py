from SingletonDAO import *


if __name__ == "__main__":
    
    dao = SingletonDAO()         
    print(dao.estudiantes[3].nombre)
    print(dao.modificarEstudiante(4, "German",None, None, None, "correoElectronico", None, None))
    print(dao.estudiantes[3].nombre)
    
    '''
    s1 = SingletonDAO()
    s1.printIt()

    s2 = SingletonDAO()

    if s1 == s2:
        print("Todo sano")
    '''
    
