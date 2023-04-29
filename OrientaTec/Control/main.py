from SingletonDAO import *



if __name__ == "__main__":

    dao = SingletonDAO()
    dao.connectServer()
    dao.closeConnection()

    '''
    s1 = SingletonDAO()
    s1.printIt()

    s2 = SingletonDAO()

    if s1 == s2:
        print("Todo sano")
    '''
    
