import pymongo
MONGO_HOST="localhost"
MONGO_PUERTO="27017"
MONGO_TIEMPO_FUERA=1000
MONGO_URI="mongodb://"+MONGO_HOST+":"+MONGO_PUERTO+"/"
MONGO_BASEDATOS="FotosOrientaTEC"
MONGO_COLECCION="FotosProfesores"
MONGO_CLIENTE = None


def connectMongoServer():
    try:
        global MONGO_CLIENTE
        MONGO_CLIENTE = pymongo.MongoClient(MONGO_URI,serverSelectionTimeoutMS=MONGO_TIEMPO_FUERA)
        print("Conexión a Mongo exitosa.")
    except Exception as ex:
        print(ex)
        

def closeMongoConnection():
    try:
        MONGO_CLIENTE.close()
    except Exception as ex:
        print(ex)
def buscarProfesor():
    try:
        connectMongoServer()
        baseDatos=MONGO_CLIENTE[MONGO_BASEDATOS]
        coleccion=baseDatos[MONGO_COLECCION]
        for documento in coleccion.find():
            print(documento)
        closeMongoConnection()
    except pymongo.errors.ServerSelectionTimeoutError as errorTiempo:
        print("Tiempo exedido "+errorTiempo)
"""
try:
    cliente=pymongo.MongoClient(MONGO_URI,serverSelectionTimeoutMS=MONGO_TIEMPO_FUERA)
    #cliente.server_info()
    print("Conexion a mongo exitosa")
    baseDatos=cliente[MONGO_BASEDATOS]
    coleccion=baseDatos[MONGO_COLECCION]
    for documento in coleccion.find():
        print(documento)
    cliente.close()
except pymongo.errors.ServerSelectionTimeoutError as errorTiempo:
    print("Tiempo exedido "+errorTiempo)
"""
buscarProfesor()