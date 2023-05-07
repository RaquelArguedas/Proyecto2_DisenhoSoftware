import pymongo
MONGO_HOST="localhost"
MONGO_PUERTO="27017"
MONGO_TIEMPO_FUERA=1000
MONGO_URI="mongodb://"+MONGO_HOST+":"+MONGO_PUERTO+"/"
MONGO_CLIENTE = None
MONGO_BASEDATOS = None
collecFtProf = None
collecAfiche = None 
collecEvLista = None
collecEvFoto= None

def connectMongoServer():
    try:
        global collecFtProf,collecAfiche,collecEvLista,collecEvFoto,MONGO_CLIENTE, MONGO_BASEDATOS
        MONGO_CLIENTE = pymongo.MongoClient(MONGO_URI,serverSelectionTimeoutMS=MONGO_TIEMPO_FUERA)
        MONGO_BASEDATOS = MONGO_CLIENTE["FotosOrientaTEC"]   
        collecFtProf = MONGO_BASEDATOS["FotosProfesores"]
        collecAfiche = MONGO_BASEDATOS["AficheActividad"]
        collecEvLista = MONGO_BASEDATOS["EvListaAsistencia"]
        collecEvFoto= MONGO_BASEDATOS["EvFotosParticipantes"]
        print("Conexion a Mongo exitosa.")
    except Exception as ex:
        print(ex)

def closeMongoConnection():
    try:
        MONGO_CLIENTE.close()
    except Exception as ex:
        print(ex)
#-----------MÉTODOS PARA BUSCAR FOTOS DE MONGO--------------------------#
#Registrar NUEVOS archivos 
def registrarFotoProfesor(idProfe,nuevaFoto):
    try:
        connectMongoServer()
        #revisar que no exista el registro 
        cantRegistros = collecFtProf.count_documents({'idProfe':idProfe})
        if(cantRegistros > 0):
            print("El registro ya existe, NO SE PUEDE actualizar.")
        else:
            collecFtProf.insert_one({'idProfe':idProfe, 'foto': nuevaFoto})
            print("Se ha insertado la foto exitosamente.")
        closeMongoConnection()
    except Exception as ex:
        print(ex)

def registrarFotoAfiche(idActividad,nuevaFoto):
    try:
        connectMongoServer()
        collecAfiche.insert_one({'idActividad':idActividad, 'foto': nuevaFoto})
        print("Foto registrada con exito.")
        closeMongoConnection()
    except Exception as ex:
        print(ex)

def registrarFotoEvLista(idEvidencia,nuevaFoto):
    try:
        connectMongoServer()
        collecEvLista.insert_one({'idEvidencia':idEvidencia, 'foto': nuevaFoto})
        print("Foto registrada con exito.")
        closeMongoConnection()
    except Exception as ex:
        print(ex)

def registrarFotoEv(idEvidencia,nuevaFoto):
    try:
        connectMongoServer()
        collecEvFoto.insert_one({'idEvidencia':idEvidencia, 'foto': nuevaFoto})
        print("Foto registrada con exito.")
        closeMongoConnection()
    except Exception as ex:
        print(ex)
#-------------------------------REGISTRAR-------------------------------

#-------------------------------SET-------------------------------
def setFotoProfesor(idBuscado, nuevaFoto):
    try:
        connectMongoServer()
        #Revisar que exista el registro 
        cantRegistros = collecFtProf.count_documents({'idProfe':idBuscado})
        if(cantRegistros > 0):
            collecFtProf.update_one({'idProfe':idBuscado},{'$set':{'foto':nuevaFoto}})
            print("Se ha actualizado la foto exitosamente. ")
        else:
            print("El registro que intenta actualizar NO existe.")
        closeMongoConnection()
    except Exception as ex:
        print(ex)
"""
    El profesor es el único que necesita actualizar registros porque mantiene UNA única foto, 
    pueden existir n fotos de una evidencia, n fotos de un afiche para una actividad. 
"""
#-------------------------------SET-------------------------------

#-------------------------------GETTERS-------------------------------
def getFotoProfesor(idBuscado):
    try:
        connectMongoServer()
        #revisar que el profesor exista
        cantRegistros = collecFtProf.count_documents({'idProfe':idBuscado})
        if cantRegistros > 0 :
            for documento in collecFtProf.find({"idProfe": idBuscado},{ "idProfe": 0, "_id":0}):
                return documento["foto"]
            closeMongoConnection()
        else:
            print("El registro que intenta obtener NO existe.")

    except Exception as ex:
        print(ex)

def getFotoAfiche(idBuscado):
    try:
        connectMongoServer()
        #revisar que el registro exista
        cantRegistros = collecAfiche.count_documents({'idActividad':idBuscado})
        if cantRegistros > 0 :
            for documento in collecAfiche.find({"idActividad": idBuscado},{ "idActividad": 0, "_id":0}):
                return documento["foto"]
            closeMongoConnection()
        else:
            print("La actividad que busca NO existe.")
    except Exception as ex:
        print(ex)

def getFotoEvLista(idBuscado):
    try:
        connectMongoServer()
        #revisar que el registro exista
        cantRegistros = collecEvLista.count_documents({'idActividad':idBuscado})
        if cantRegistros > 0 :
            for documento in collecEvLista.find({"idEvidencia": idBuscado},{ "idEvidencia": 0, "_id":0}):
                return documento["foto"]
            closeMongoConnection()
        else:
            print("La evidencia que busca NO existe.")
    except Exception as ex:
        print(ex) 

def getFotoEv(idBuscado):
    try:
        connectMongoServer()
        cantRegistros = collecEvFoto.count_documents({'idActividad':idBuscado})
        if cantRegistros > 0 :
            for documento in collecEvFoto.find({"idEvidencia": idBuscado},{ "idEvidencia": 0, "_id":0}):
                return documento["foto"]
            closeMongoConnection()
        else:
            print("La evidencia que busca NO existe.")
    except Exception as ex:
        print(ex)
#-------------------------------GETTERS-------------------------------

#setFotoProfesor(1, "Puppy Mini")
#setFotoProfesor(3, "Puppy Mini")
#print(getFotoProfesor(3))
