import mysql.connector
import yaml

class DB():
    def __init__(self):
        with open('db.yml', 'r') as db_access_file:
            db_access = yaml.safe_load(db_access_file)
            user = db_access['user']
            password = db_access['password']
            host = db_access['host']
            db = db_access['db']

        self.cnx = mysql.connector.connect(
            user = user,
            password = password,
            host = host,
            database = db)

        self.cursor = self.cnx.cursor()
