from SingletonDAO import *
from MainController import *
from datetime import time, datetime
from SingletonSesionActual import *

if __name__ == "__main__":
    
    control = MainController()


    e=control.buscarEstudiante(20198)

    print(control.getProfesorCedula(189).nombre)
    #control.consultarEstudiantes(int(Ordenamiento['SEDE']))


    dao = SingletonDAO()
    
    fecha = (datetime.strptime('08/08/2023', '%d/%m/%Y')).date()
    horaInicio = (datetime.strptime('11:00', '%H:%M')).time()
    horaFinal = (datetime.strptime('13:00', '%H:%M')).time()
    print(fecha, horaInicio, horaFinal)
        
    profesores = control.getAllProfesores()
    asistentes = control.getAllAsistentes()
    estudiantes = control.consultarEstudiantes(1)

    listaPersonas = control.getAllProfesores() + control.getAllAsistentes() + control.consultarEstudiantes(1)
    print(listaPersonas)

    #no borrad:
    # def getFotoProfesor(self,idBuscado):
    #         try:
    #             self.connectMongoServer()
    #             #revisar que el profesor exista
    #             cantRegistros = self.collecFtProf.count_documents({'idProfe':idBuscado})
    #             if cantRegistros > 0 :                
    #                 document = self.collecFtProf.find_one({'idProfe': idBuscado})
    #                 photo_data = document['foto']
    #                 ruta_descargas = Path.home() / 'Downloads'# Obtén la ruta de la carpeta de descargas según el sistema operativo
    #                 nombre_archivo = str(idBuscado)+'.jpg'# Crea la ruta completa del archivo de descarga
    #                 ruta_archivo = ruta_descargas / nombre_archivo
    #                 with open(ruta_archivo, 'wb') as file:file.write(photo_data)
    #                 self.closeMongoConnection()
    #             else:
    #                 print("El registro que intenta obtener NO existe.")
    #         except Exception as ex:
    #             print(ex)

    #dao.registrarFotoAfiche(1,'C:\\Users\\raque\\Downloads\\fondo.jpg')
    #dao.getFotoAfiche(1)
    
