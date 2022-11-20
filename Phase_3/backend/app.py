
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


class PhoneNumber(Resource):
    def get(self, area_code:str, number:str):
        '''
        api request example: 
        curl --location --request GET '127.0.0.1:5000/phone_number/905/9224143'

        query the PostalCode table for the postal information
        return: Code 200: False if it has not existed. True otherwise
                Code 500: internal server error
        '''       
        try:
            db.cursor.execute('''SELECT area_code, number
            FROM PhoneNumber WHERE
            PhoneNumber.area_code = %s AND PhoneNumber.number = %s''', (area_code, number))
            res = db.cursor.fetchall()
            print(res)
            if res:
                return({'existed': True}, 200)
            return({'existed': False}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(PhoneNumber, '/phone_number/<area_code>/<number>')


class AverageTVdisplaysizebystate(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT state, FORMAT(AVG(display_size), '2.#') AS Average_size FROM
            (select state, postal_code, email, display_size from PostalCode join HouseHold ON postal_code=HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code
            join TV ON HouseHold.email = TV.FK_tv_email_HouseHold_email)  ALL_TV_IN_STATE
            group by state
            ORDER BY STATE ASC''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(AverageTVdisplaysizebystate, '/reports/AverageTVdisplaysizebystate')

class tvDrillDown(Resource):
    def get(self, state):
        try:
            db.cursor.execute('''
            WITH x1 AS (
            SELECT state, AVG(display_size) AS Average_size FROM
            (select state, postal_code, email, display_size from PostalCode
            join HouseHold
            ON postal_code = HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code
            join TV
            ON HouseHold.email = TV.FK_tv_email_HouseHold_email) ALL_TV_IN_STATE
            GROUP BY state
            ORDER BY state ASC),
            x2 AS (
            SELECT state, display_type, maximum_resolution from PostalCode
            JOIN HouseHold
            ON postal_code = HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code
            JOIN TV
            ON HouseHold.email = TV.FK_tv_email_HouseHold_email)
            select x1.state, display_type AS screen_type, maximum_resolution, FORMAT(Average_size, '2.#') AS Average_size from x1
            JOIN
            x2
            WHERE x1.state = %s
			''', (state,))
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(tvDrillDown, '/reports/AverageTVdisplaysizebystateDrilldown/<state>')



class Top25Manfufacturers(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT name , count(*)  as frequency from (
            SELECT 'Cooker' AS appliance_type, cooker_id, FK_cooker_email_HouseHold_email, model_name, name FROM Cooker UNION
            SELECT 'Dryer' AS appliance_type, dryer_id, FK_Dryer_email_HouseHold_email, Model_name, name FROM Dryer UNION
            SELECT 'Freezer' AS appliance_type, freezer_id, FK_Freezer_email_HouseHold_email, model_name, name FROM Freezer UNION
            SELECT 'TV' AS appliance_type, tv_id, FK_tv_email_HouseHold_email, model_name, name FROM TV UNION 
            SELECT 'Washer' AS appliance_type, washer_id, FK_Washer_email_HouseHold_email, model_name, name FROM Washer)  Appliances group by name order by frequency desc limit 25 ''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(Top25Manfufacturers, '/reports/top25manufacturers')



class ManufacturerDrillDown(Resource):
    def get(self, manufacturer):
        try:
            db.cursor.execute('''
            SELECT appliance_type, count(*) AS frequency FROM
            (SELECT 'Cooker' AS appliance_type, cooker_id, FK_cooker_email_HouseHold_email, model_name, name FROM Cooker UNION
            SELECT 'Dryer' AS appliance_type, dryer_id, FK_Dryer_email_HouseHold_email, Model_name, name FROM Dryer UNION
            SELECT 'Freezer' AS appliance_type, freezer_id, FK_Freezer_email_HouseHold_email, model_name, name FROM Freezer UNION
            SELECT 'TV' AS appliance_type, tv_id, FK_tv_email_HouseHold_email, model_name, name from TV UNION
            SELECT 'Washer' AS appliance_type, washer_id, FK_Washer_email_HouseHold_email, model_name, name FROM Washer) Appliances
            WHERE name =  %s
            GROUP BY name, appliance_type''', (manufacturer,))
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(ManufacturerDrillDown, '/reports/manufacturer_drill_down/<manufacturer>')



if __name__ == '__main__':
    try:
        app.run(debug = True)
        db.cnx.close()
    except KeyboardInterrupt as KI:
        print(KI)
        db.cnx.close()