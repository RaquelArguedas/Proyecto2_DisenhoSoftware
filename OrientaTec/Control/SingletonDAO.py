# basado en codigo de Refactoring.Guru, adjuntamos el enlace a continuacion
# https://refactoring.guru/design-patterns/singleton/python/example#:~:text=Singleton%20is%20a%20creational%20design,the%20modularity%20of%20your%20code.

import mysql.connector 

import sys
#Anexo el Directorio en donde se encuentra la clase a llamar
sys.path.append('./Modelo')
#Importo la Clase
from Usuario import *
from Estudiante import *
from EquipoGuia import *
from Actividad import *
from Profesor import *
from AsistenteAdministrativo import *
from Bitacora import *
from PlanTrabajo import *
from Recordatorio import *
from Evidencia import *
from Observacion import *
from Comentario import *



class SingletonMeta(type):

    _instances = {}

    def __call__(cls, *args, **kwargs):

        if cls not in cls._instances:  #metodo obligatorio getInstance
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class SingletonDAO(metaclass=SingletonMeta):
    
    #Atributos
    #Atributos de conexión
    connection = None
    cursor = None

    #Atributos del modelo
    usuarios = []
    estudiantes = []
    equiposGuia = []
    actividades = []
    profesores = []
    asistentes = []
    bitacoras = []
    planesTrabajo = []
    recordatorios = []
    evidencias = []
    observaciones = []
    comentario = []

    #Constructorque instancia los objetos necesarios del modelo
    def __init__(self):
        self.usuarios = self.setFromBD("Usuario")
        self.estudiantes = self.setFromBD("Estudiante")
        self.equiposGuia = self.setFromBD("EquipoGuia")
        self.actividades = self.setFromBD("Actividad")
        self.profesores = self.setFromBD("Profesor")
        self.asistentes = self.setFromBD("AsistenteAdministrativo")
        self.bitacoras = self.setFromBD("Bitacora")
        self.planesTrabajo = self.setFromBD("PlanTrabajo")
        self.recordatorios = self.setFromBD("Recordatorio")
        self.evidencias = self.setFromBD("Evidencia")
        self.observaciones = self.setFromBD("Observacion")
        self.comentario = self.setFromBD("Comentario")
    
    def setFromBD(self, tablaBD):
        self.connectServer()

        try:
            self.cursor.execute("SELECT * from " + tablaBD)

            salida = self.cursor.fetchall()

            lista = []
            objeto = []
            for row in salida:
                for item in row:
                    objeto += [item]
                lista += [self.generarObjeto(tablaBD, objeto)]
            print (lista)
            print("\n")
            
            
        except Exception as ex:
            print(ex)

        self.closeConnection()

    def generarObjeto(self, tablaBD, lista):
        objeto = None
        
        if (tablaBD == "Usuario"):
            objeto = Usuario(lista[0], lista[1])
        elif (tablaBD == "Estudiante"):
            objeto = Estudiante(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6])
        elif (tablaBD == "EquipoGuia"):
            objeto = EquipoGuia(lista[0], lista[1], lista[2])
        elif (tablaBD == "Actividad"):
            objeto = Actividad(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], lista[7], lista[8], lista[9], lista[10], lista[11], lista[12])
        elif (tablaBD == "Profesor"):
            
            objeto = Profesor(lista[0],lista[1],lista[2],lista[3], lista[4], lista[5], lista[6],lista[7], lista[8], lista[9], lista[10])
        elif (tablaBD == "AsistenteAdministrativo"):
            objeto = AsistenteAdministrativo(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], lista[7], lista[8], lista[9])
        elif (tablaBD == "Bitacora"):
            objeto = Bitacora(lista[0], lista[1], lista[2], lista[3])
        elif (tablaBD == "PlanTrabajo"):
            objeto = PlanTrabajo(lista[0], lista[1])
        elif (tablaBD == "Recordatorio"):
            objeto = Recordatorio(lista[0], lista[1])
        elif (tablaBD == "Evidencia"):
            objeto = Evidencia(lista[0], lista[1], lista[2], lista[3])
        elif (tablaBD == "Observacion"):
            objeto = Observacion(lista[0], lista[1], lista[2])
        elif (tablaBD == "Comentario"):
            objeto = Comentario(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5])

        return objeto

    #Métodos
    #función que realiza la conexión a MySQL
    def connectServer(self):
        try:
            self.connection = mysql.connector.connect(
                host = 'localhost',
                port = 3306,
                user = 'root',
                password = '123456',
                db = 'orientatec'
            )
            if self.connection.is_connected():
                self.cursor = self.connection.cursor()
                #print("Connection succesful")
        except Exception as ex:
            print(ex)


    #función que cierra la conexión a MySQL
    def closeConnection(self):
        if self.connection!=None:
            self.connection.close()
            #print("Connection closed")








    #borrar
    def bla():
        try:
            con = mysql.connector.connect(
                host = 'localhost',
                port = 3306,
                user = 'root',
                password = '123456',
                db = 'orientatec'
            )

            if con.is_connected():
                print("Connection succesful")
                info = con.get_server_info()
                print(info)
                
                cursor = connection.cursor()
                cursor.execute("SELECT * from TipoActividad")

                myresult = cursor.fetchall()
                
                for x in myresult:
                    print(x)

                row = cursor.fetchone()
                print("Conectando a la case de datos: {}".format(row))

                cursor.callproc('readTipoActividad', [5, ])
                # print results
                print("Printing laptop details")
                for result in cursor.stored_results():
                    print(result.fetchall()[0][1])


        except Exception as ex:
            print(ex)

        finally:
            if con.is_connected():
                con.close()
                print("Connection closed")
