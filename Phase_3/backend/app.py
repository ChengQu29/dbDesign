
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from db import DB

app = Flask(__name__)
api = Api(app)
CORS(app)
db = DB()

class HelloWorld(Resource):
    def get(self):
        return({'about': 'Hello World'}, 200)
api.add_resource(HelloWorld, '/')



class Household(Resource):
    def get(self, email):
        '''
        api request example: 
        curl --location --request GET '127.0.0.1:5000/household/max@gatech.edu'

        query the HouseHold table for the email
        return: Code 200: False if it has not existed. True otherwise
                Code 400: Missing params
                Code 500: internal server error

        '''
        try:
            db.cursor.execute('''SELECT email FROM HouseHold 
            WHERE HouseHold.email = %s''', (email, ))
            res = db.cursor.fetchall()
            if not res:
                return({'existed': False}, 200)
            return({'existed': True}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

    def post(self, email, phone):
        pass
api.add_resource(Household, '/household/<email>')




class PostalCode(Resource):
    def get(self, postal_code:str):
        '''
        api request example: 
        curl --location --request GET '127.0.0.1:5000/postal_code/08889'

        query the PostalCode table for the postal information
        return: Code 200: {'postal_code': <postal_cpde>, 'city':<city>, 'state':<state>}
                Code 404: postal code not found
                Code 500: internal server error
        '''       
        try:
            db.cursor.execute('''SELECT postal_code, city, state 
            FROM PostalCode WHERE
            PostalCode.postal_code = %s''', (postal_code, ))
            res = db.cursor.fetchall()
            print(res)
            if res:
                resDict = {'postal_code': res[0][0],
                            'city': res[0][1],
                            'state': res[0][2]}
                return({'result': resDict}, 200)
            return({'result': 'postal code not found'}, 404)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(PostalCode, '/postal_code/<postal_code>')





if __name__ == '__main__':
    try:
        app.run(debug = True)
        db.cnx.close()
    except KeyboardInterrupt as KI:
        print(KI)
        db.cnx.close()