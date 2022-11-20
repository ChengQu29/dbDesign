
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


class HouseholdForm(Resource):
    @cross_origin(send_wildcard=True,headers=['Content-Type','Authorization'], methods=['POST', 'OPTIONS'])
    def post(self):
        '''
        api request example: 
        curl --location --request GET '127.0.0.1:5000/household'

        Insert household information
        return: Code 201: If insertion succeeded
                Code 500: internal server error
        '''
        body = request.json
        try:
            db.cursor.execute('''INSERT INTO HouseHold (email, square_footage, occupant, bedroom, home_type, FK_HouseHold_postal_code_PostalCode_postal_code) VALUES (%s, %s, %s, %s, %s, %s)''',
                (body['email'], body['square_footage'], body['occupant'], body['bedroom'], body['home_type'], body['postal_code']))
            if body.get('area_code', None):
                db.cursor.execute('''INSERT INTO PhoneNumber (area_code, number, phone_type, FK_PhoneNumber_email_HouseHold_email) VALUES (%s, %s, %s, %s)''',
                    (body['area_code'], body['number'], body['phone_type'], body['email']))
            db.cnx.commit()
            return({}, 201)
        except Exception as e:
            print(e)
            return(f'Server side error: {e}', 500)

api.add_resource(HouseholdForm, '/household_submission')



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

        query the PhoneNumber table for the postal information
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


class LaundryCnt_WasherDryer(Resource):
    def get(self):
        try:
            db.cursor.execute('''
            WITH WasherFrequencyPerState AS (SELECT w.loading_type, COUNT(w.loading_type) as frequency, p.state FROM Washer w
                JOIN HouseHold h ON w.FK_Washer_email_HouseHold_email = h.email
                JOIN PostalCode p ON h.FK_HouseHold_postal_code_PostalCode_postal_code = p.postal_code
            GROUP BY w.loading_type, p.state ORDER BY p.state, frequency DESC)
            ,
            WasherHighestFrequencyPerState AS (SELECT MAX(w.frequency) AS highest_frequency, w.state FROM WasherFrequencyPerState w GROUP BY w.state),
            WasherTopPerState AS (SELECT wfps.loading_type, wfps.frequency, wfps.state FROM WasherFrequencyPerState wfps JOIN WasherHighestFrequencyPerState whfps ON whfps.state = wfps.state WHERE whfps.highest_frequency = wfps.frequency),
            DryerFrequencyPerState AS (SELECT d.heat_source, COUNT(d.heat_source) as frequency, p.state FROM Dryer d
                JOIN HouseHold h ON d.FK_Dryer_email_HouseHold_email = h.email
                JOIN PostalCode p ON h.FK_HouseHold_postal_code_PostalCode_postal_code = p.postal_code
            GROUP BY d.heat_source, p.state ORDER BY p.state, frequency DESC)
            ,
            DryerHighestFrequencyPerState AS (SELECT MAX(d.frequency) AS highest_frequency, d.state FROM DryerFrequencyPerState d GROUP BY d.state),
            DryerTopPerState AS (SELECT dfps.heat_source, dfps.frequency, dfps.state FROM DryerFrequencyPerState dfps JOIN DryerHighestFrequencyPerState dhfps ON dhfps.state = dfps.state WHERE dhfps.highest_frequency = dfps.frequency)
            SELECT DISTINCT(p.state), wtps.loading_type, dtps.heat_source FROM PostalCode p
            LEFT JOIN WasherTopPerState wtps
            ON p.state = wtps.state
            LEFT JOIN DryerTopPerState dtps
            ON p.state = dtps.state
            ORDER BY p.state; ''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(LaundryCnt_WasherDryer, '/reports/LaundryCnt_WasherDryer')

class LaundryCnt_WasherNoDryer(Resource):
    def get(self):
        try:
            db.cursor.execute('''
            WITH WasherPerHouseHold AS (SELECT COUNT(h.email) as washer_count_per_household, h.email, p.state FROM HouseHold h
                JOIN PostalCode p ON h.FK_HouseHold_postal_code_PostalCode_postal_code = p.postal_code
                RIGHT JOIN Washer w ON w.FK_Washer_email_HouseHold_email = h.email
            GROUP BY h.email)
            ,
            DryerPerHouseHold AS (SELECT COUNT(h.email) as dryer_count_per_household, h.email, p.state FROM HouseHold h
                JOIN PostalCode p ON h.FK_HouseHold_postal_code_PostalCode_postal_code = p.postal_code
                RIGHT JOIN Dryer d ON d.FK_Dryer_email_HouseHold_email = h.email
            GROUP BY h.email)
            ,
            WasherDryerPerHouseHold AS (SELECT h.email, wph.washer_count_per_household, dph.dryer_count_per_household, p.state FROM HouseHold h
                JOIN PostalCode p ON p.postal_code = h.FK_HouseHold_postal_code_PostalCode_postal_code
                LEFT JOIN WasherPerHouseHold wph ON h.email = wph.email
                LEFT JOIN DryerPerHouseHold dph ON h.email = dph.email)
            SELECT wdph.state, COUNT(wdph.email) count_househould_with_washer_no_dryer
            FROM WasherDryerPerHouseHold wdph
            WHERE wdph.dryer_count_per_household IS NULL AND wdph.washer_count_per_household IS NOT NULL
            GROUP BY wdph.state
            ORDER BY count_househould_with_washer_no_dryer AND wdph.state; ''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(LaundryCnt_WasherNoDryer, '/reports/LaundryCnt_WasherNoDryer')

if __name__ == '__main__':
    try:
        app.run(debug = True)
        db.cnx.close()
    except KeyboardInterrupt as KI:
        print(KI)
        db.cnx.close()