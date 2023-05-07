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
def registrarFotoProfesor(idProfe)
#Setters fotos 
def setFotoProfesor(idBuscado, nuevaFoto):
    try:
        connectMongoServer()
        collecFtProf.update_one({'idProfe':idBuscado},{'$set':{'foto':nuevaFoto}})
        print("Se ha actualizado la foto exitosamente. ")
        closeMongoConnection()
    except Exception as ex:
        print(ex)

#Getters fotos
def getFotoProfesor(idBuscado):
    try:
        connectMongoServer()
        for documento in collecFtProf.find({"idProfe": idBuscado},{ "idProfe": 0, "_id":0}):
            return documento["foto"]
        closeMongoConnection()
    except Exception as ex:
        print(ex)

def getFotoAfiche(idBuscado):
    try:
        connectMongoServer()
        for documento in collecAfiche.find({"idActividad": idBuscado},{ "idActividad": 0, "_id":0}):
            return documento["foto"]
        closeMongoConnection()
    except Exception as ex:
        print(ex)
def getFotoEvLista(idBuscado):
    try:
        connectMongoServer()
        for documento in collecEvLista.find({"idEvidencia": idBuscado},{ "idEvidencia": 0, "_id":0}):
            return documento["foto"]
        closeMongoConnection()
    except Exception as ex:
        print(ex) 

def getFotoEv(idBuscado):
    try:
        connectMongoServer()
        for documento in collecEvFoto.find({"idEvidencia": idBuscado},{ "idEvidencia": 0, "_id":0}):
            return documento["foto"]
        closeMongoConnection()
    except Exception as ex:
        print(ex)


#print(getFotoProfesor(1))
setFotoProfesor(1, "Puppy Mini")
print(getFotoProfesor(1))
