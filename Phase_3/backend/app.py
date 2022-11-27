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
        curl --location --request POST '127.0.0.1:5000/household_submission'

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


class BathroomForm(Resource):
    @cross_origin(send_wildcard=True,headers=['Content-Type','Authorization'], methods=['POST', 'OPTIONS'])
    def post(self):
        '''
        api request example: 
        curl --location --request POST '127.0.0.1:5000/bathroom_submission'

        Insert bathroom information
        return: Code 201: If insertion succeeded
                Code 500: internal server error
        '''
        body = request.json
        email = body['email']
        bathrooms = body['bathrooms']
        try:
            for index, bathroom in enumerate(bathrooms):
                bidet = bathroom.get("bidet", 0)
                commode = bathroom.get("commode", 0)
                sink = bathroom.get("sink", 0)
                if bathroom["bathroomType"] == "full":
                    bathtub = bathroom.get("bathtub", 0)
                    shower = bathroom.get("shower", 0)
                    tubsShower = bathroom.get("tubsShower", 0)
                    isPrimary = bathroom.get("isPrimary", False)
                    db.cursor.execute('''INSERT INTO Full (number, sink, commode, bidet, is_primary, bathtub, shower, tub_shower, FK_Full_email_HouseHold_email) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)''', (index + 1, sink, commode, bidet, "1" if isPrimary else "0", bathtub, shower, tubsShower, email))
                else:
                    name = bathroom.get("name", None)
                    db.cursor.execute('''INSERT INTO Half (number, sink, commode, bidet, name, FK_Half_email_HouseHold_email) VALUES (%s, %s, %s, %s, %s, %s)''', (index + 1, sink, commode, bidet, name, email))
            db.cnx.commit()
            return({}, 201)
        except Exception as e:
            print(e)
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomForm, '/bathroom_submission')

class ApplianceForm(Resource):
    @cross_origin(send_wildcard=True,headers=['Content-Type','Authorization'], methods=['POST', 'OPTIONS'])
    def post(self):
        body = request.json
        email = body['email']
        appliances = body['appliances']
        print("appliances data before insertion into DB: ", appliances)
        try:
            for index, appliance in enumerate(appliances):
                print(appliance)
                if appliance["applianceType"] == "freezer":
                    manufacturer = appliance.get("manufacturer", None)
                    modelName = appliance.get("modelName", None)
                    freezerType = appliance.get("freezerType", None)
                    db.cursor.execute('''
                    INSERT INTO Freezer (appliance_number, FK_Freezer_email_HouseHold_email, Model_name, name, model_type)
                    VALUES (%s, %s, %s, %s, %s)
                    ''', (index+1, email, modelName, manufacturer, freezerType))
                elif appliance["applianceType"] == "washer":
                    manufacturer = appliance.get("manufacturer", None)
                    modelName = appliance.get("modelName", None)
                    loadingType = appliance.get("loadingType", None)
                    db.cursor.execute('''
                    INSERT INTO Washer (appliance_number, FK_Washer_email_HouseHold_email, Model_name, name, loading_type)
                    VALUES (%s, %s, %s, %s, %s)
                    ''', (index+1, email, modelName, manufacturer, loadingType))
                elif appliance["applianceType"] == "dryer":
                    manufacturer = appliance.get("manufacturer", None)
                    modelName = appliance.get("modelName", None)
                    dryerHeatSource = appliance.get("dryerHeatSource", None)
                    db.cursor.execute('''
                    INSERT INTO Dryer (appliance_number, FK_Dryer_email_HouseHold_email, Model_name, name, heat_source)
                    VALUES (%s, %s, %s, %s, %s)
                    ''', (index+1, email, modelName, manufacturer, dryerHeatSource))
                elif appliance["applianceType"] == "tv":
                    manufacturer = appliance.get("manufacturer", None)
                    modelName = appliance.get("modelName", None)
                    displayType = appliance.get("displayType", None)
                    displaySize = appliance.get("displaySize", None)
                    maximumResolution = appliance.get("maximumResolution", None)
                    db.cursor.execute('''
                    INSERT INTO TV (appliance_number, FK_tv_email_HouseHold_email, model_name, name, display_type, display_size, maximum_resolution)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    ''', (index+1, email, modelName, manufacturer, displayType, displaySize, maximumResolution))
                elif appliance["applianceType"] == "cooker":
                    manufacturer = appliance.get("manufacturer", None)
                    modelName = appliance.get("modelName", None)
                    db.cursor.execute('''
                    INSERT INTO Cooker (appliance_number, FK_Cooker_email_HouseHold_email, model_name, name)
                    VALUES (%s, %s, %s, %s)
                    ''', (index+1, email, modelName, manufacturer))
                    lastrow = db.cursor.lastrowid
                    print(lastrow)
                    
                    if ("isOven" in appliance) and appliance["isOven"] == True:
                        ovenHeatSources = appliance.get("ovenHeatSource")
                        cookerType = appliance.get("cookerType")
                        hasGasHeatSource = 0
                        hasElectricHeatSource = 0
                        hasMicroWaveHeatSource = 0
                        for ovenHeatSource in ovenHeatSources:
                            if ovenHeatSource == "gas":
                                hasGasHeatSource = 1
                            if ovenHeatSource == "electric":
                                hasElectricHeatSource = 1
                            if ovenHeatSource == "microwave":
                                hasMicroWaveHeatSource = 1
                        db.cursor.execute('''
                        INSERT INTO Oven (FK_Oven_id_Cooker_cooker_id, appliance_number, FK_oven_email_HouseHold_email, has_gas_heat_source, has_electric_heat_source, has_microwave_heat_source, oven_type)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        ''', (lastrow, index+1, email,  hasGasHeatSource, hasElectricHeatSource, hasMicroWaveHeatSource, cookerType))
                    
                    if ("isCooktop" in appliance) and appliance["isCooktop"] == True:
                        cookTopHeatSource = appliance.get("cooktopHeatSource")
                        db.cursor.execute('''
                        INSERT INTO Cooktop (FK_Cooktop_id_Cooker_cooker_id, appliance_number, FK_cooktop_email_HouseHold_email, heat_source)
                        VALUES (%s, %s, %s, %s)
                        ''', (lastrow, index+1, email, cookTopHeatSource))
                        print("cookTopHeatSource is: ", cookTopHeatSource)
            db.cnx.commit()
            return({}, 200)
        except Exception as e:
            print(e)
            return(f'Server side error: {e}', 500)

api.add_resource(ApplianceForm, '/appliance_submission')

class HouseHoldAvgByRadius(Resource):
    @cross_origin(send_wildcard=True,headers=['Content-Type','Authorization'], methods=['GET', 'OPTIONS'])
    def get(self, lon, lat, radius):
        try:
            db.cursor.execute('''
            SELECT CEIL(AVG(occupant)), ROUND(AVG(bedroom),1), ROUND(AVG(NumberOfBathroom),1), ROUND(AVG(RatioOfCommodeToOccupant),2), ROUND(AVG(NumberOfAppliance),1) AS mostCommonHeat FROM 
            (With x0 AS 
                (select FK_Freezer_email_HouseHold_email AS Email, (ifnull(NumberOfApp.A,0) + ifnull(NumberOfApp.B,0) + ifnull(NumberOfApp.C,0) + ifnull(NumberOfApp.D,0) + ifnull(NumberOfApp.E,0)) AS Total From 
                (With FreezerOwnedPerHouseHold As (select FK_Freezer_email_HouseHold_email, count(*) AS A from Freezer 
                group by FK_Freezer_email_HouseHold_email), 
                CookerOwnedPerHouseHold AS (select FK_Cooker_email_HouseHold_email, count(*) AS B from Cooker 
                group by FK_Cooker_email_HouseHold_email), 
                WasherOwnedPerHouseHold AS (select FK_Washer_email_HouseHold_email, count(*) AS C from Washer 
                group by FK_Washer_email_HouseHold_email), 
                DryerOwnedPerHouseHold AS (select FK_Dryer_email_HouseHold_email, count(*) AS D from Dryer
                group by FK_Dryer_email_HouseHold_email), 
                TVOwnedPerHouseHold AS (select FK_TV_email_HouseHold_email, count(*) AS E from TV 
                group by FK_TV_email_HouseHold_email) 
                select * from FreezerOwnedPerHouseHold 
                left join 
                CookerOwnedPerHouseHold 
                ON FreezerOwnedPerHouseHold.FK_Freezer_email_HouseHold_email = CookerOwnedPerHouseHold.FK_Cooker_email_HouseHold_email 
                left join 
                WasherOwnedPerHouseHold 
                ON FreezerOwnedPerHouseHold.FK_Freezer_email_HouseHold_email = WasherOwnedPerHouseHold.FK_Washer_email_HouseHold_email 
                left join 
                DryerOwnedPerHouseHold 
                ON FreezerOwnedPerHouseHold.FK_Freezer_email_HouseHold_email = DryerOwnedPerHouseHold.FK_Dryer_email_HouseHold_email 
                left join 
                TVOwnedPerHouseHold 
                ON FreezerOwnedPerHouseHold.FK_Freezer_email_HouseHold_email = TVOwnedPerHouseHold.FK_TV_email_HouseHold_email) AS NumberOfApp), 
            x1 AS 
                (Select distinct postal_code, email, occupant, bedroom, D, ifnull(Full.number,0) AS fullNumber, ifnull(Half.number,0) AS halfNumber, ifnull(has_gas_heat_source,0) AS gasHeat, ifnull(has_electric_heat_source,0) AS electricHeat, ifnull(has_microwave_heat_source,0) AS microwaveHeat, ifnull(Cooktop.heat_source,0) AS cooktopHeatSource, ifnull(Full.commode,0) AS FullCommode, ifnull(Half.commode,0) As HalfCommode from  
                (Select postal_code, city, latitude, longitude, 
                    acos(sin(%s) * sin(latitude) + cos(%s) * cos(latitude) * cos(longitude - (%s))) * 3958.8 As D 
                From PostalCode 
                Where acos(sin(%s) * sin(latitude) + cos(%s) * cos(latitude) * cos(longitude - (%s))) * 3958.8 <= %s) AS PostalCode_Within_Distance 
                Join HouseHold 
                ON PostalCode_Within_Distance.postal_code = HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code 
                left Join Oven 
                ON HouseHold.email = Oven.FK_oven_email_HouseHold_email 
                left Join Cooktop
                On HouseHold.email = Cooktop.FK_cooktop_email_HouseHold_email
                left Join Full
                ON HouseHold.email = Full.FK_Full_email_HouseHold_email 
                left Join Half 
                ON HouseHold.email = Half.FK_Half_email_HouseHold_email), 
                
            x2 AS (select email, FORMAT(x1.occupant/coalesce(ifnull(x1.FullCommode,0)+ifnull(x1.HalfCommode,0), ifnull(x1.FullCommode,0), ifnull(x1.HalfCommode,0), 0), '2:#') AS RatioOfCommodeToOccupant from x1), 
            x3 AS (select email, (ifnull(x1.fullNumber,0) + ifnull(x1.halfNumber,0)) AS NumberOfBathroom from x1)
            select occupant, bedroom, ifnull(x3.NumberOfBathroom,0) AS NumberOfBathroom, RatioOfCommodeToOccupant, ifnull(x0.Total,0) AS NumberOfAppliance, gasHeat, electricHeat, microwaveHeat from x1 
            left join x2 
            on x1.email = x2.email 
            left join x3 
            on x1.email = x3.email
            left join x0 
            on x1.email = x0.email) AS statistics
            ''', (lat, lat, lon, lat, lat, lon, radius)           
            )
            res = db.cursor.fetchall()
            return({'result': res}, 200)
        except Exception as e:
            print(e)
            return(f'Server side error: {e}', 500)
api.add_resource(HouseHoldAvgByRadius, '/reports/radiusReport/<lon>/<lat>/<radius>')


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
            db.cursor.execute('''SELECT postal_code, city, state, latitude, longitude 
            FROM PostalCode WHERE
            PostalCode.postal_code = %s''', (postal_code, ))
            res = db.cursor.fetchall()
            print(res)
            if res:
                resDict = {'postal_code': res[0][0],
                            'city': res[0][1],
                            'state': res[0][2],
                            'lat': res[0][3],
                            'lon': res[0][4]}
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

class ManuModelSearch(Resource):
    def get(self,ManuModel):
        print(ManuModel)
        try:
            db.cursor.execute('''
            SELECT name AS manufacturer_name,type AS model_name
            FROM (SELECT F.model_name AS type, F.name AS name FROM Freezer F
                UNION
                SELECT W.model_name AS type, W.name AS name From Washer W
                UNION
                SELECT D.model_name AS type, D.name AS name From Dryer D
                UNION
                SELECT T.model_name AS type, T.name AS name From TV T
                UNION
                SELECT C.model_name AS type, C.name AS name From Cooker C) As all_manufacturer
            WHERE name LIKE CONCAT('%%', %s, '%%')  or type LIKE CONCAT('%%', %s, '%%') 
            GROUP BY name, type
            ORDER BY name ASC, type ASC;
            ''', (ManuModel, ManuModel))
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(ManuModelSearch, '/reports/ManuModelSearch/<ManuModel>')

class AverageTVdisplaysizebystate(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT state, FORMAT(AVG(display_size), '1.#') AS Average_size FROM
            (select state, postal_code, email, display_size from PostalCode left outer join HouseHold ON postal_code=HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code
            left outer join TV ON HouseHold.email = TV.FK_tv_email_HouseHold_email)  ALL_TV_IN_STATE
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
            SELECT display_type, maximum_resolution, 
            FORMAT(avg_size, '1.#') as average_size FROM
            (SELECT display_type, maximum_resolution, AVG(display_size) AS avg_size from (PostalCode
            JOIN HouseHold
            ON postal_code = HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code
            JOIN TV
            ON HouseHold.email = TV.FK_tv_email_HouseHold_email)
            where state=%s
            GROUP BY display_type, maximum_resolution
            ORDER BY avg_size DESC) AS RESULT_QUERY			

			''', (state,))
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(tvDrillDown, '/reports/AverageTVdisplaysizebystateDrilldown/<state>')

class ExtraFridgeFreezerReport1(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT COUNT(email) AS num_household_multi_freezer FROM ( SELECT FK_Freezer_email_HouseHold_email AS email, 
			COUNT(FK_Freezer_email_HouseHold_email) AS num_freezer FROM Freezer GROUP by email) Multi_Freezer_Household WHERE num_freezer > 1;
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(ExtraFridgeFreezerReport1, '/reports/ExtraFridgeFreezerReport1')

class ExtraFridgeFreezerReport2(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            select Multi_Freezer_Household.state,
            FORMAT(Multi_Freezer_Household.num_household_multi_freezer, '0.#'),
            FORMAT(round(100*Chest_Count.chest_houshold_count/Multi_Freezer_Household.num_household_multi_freezer ), '0.#') as chest_household_percentage,
            FORMAT(round(100*Upright_Count.upright_householdd_count/Multi_Freezer_Household.num_household_multi_freezer), '0.#') as upright_household_percentage,
            FORMAT(round(100*Other_Count_Aggregated.other_household_count/Multi_Freezer_Household.num_household_multi_freezer), '0.#') as other_household_percentage
            FROM
            (
            select state, count(state) as num_household_multi_freezer from
            ( select state, email
            from PostalCode inner join
            (select Multi_Freezer_Household.email, FK_HouseHold_postal_code_PostalCode_postal_code as postal_code
            from HouseHold inner join
            (select FK_Freezer_email_HouseHold_email as email,
            count(FK_Freezer_email_HouseHold_email) as num_freezer
            from Freezer
            group by email) Multi_Freezer_Household
            on HouseHold.email = Multi_Freezer_Household.email
            where Multi_Freezer_Household.num_freezer > 1) Multi_Freezer_Household_PostalCode
            on PostalCode.postal_code = Multi_Freezer_Household_PostalCode.postal_code) Multi_Freezer_Household_state
            group by state
            order by num_household_multi_freezer desc
            limit 10 ) Multi_Freezer_Household
            LEFT JOIN
            (
            select state, count(email) as chest_houshold_count FROM
            (
            select email, model_type, state, count(email) as model_type_individual_household_count from (
            select FK_Freezer_email_HouseHold_email as email, model_type, state from Freezer inner join
            ( select state, email
            from PostalCode inner join
            (select Multi_Freezer_Household.email, FK_HouseHold_postal_code_PostalCode_postal_code as postal_code
            from HouseHold inner join
            (select FK_Freezer_email_HouseHold_email as email,
            count(FK_Freezer_email_HouseHold_email) as num_freezer
            from Freezer
            group by email) Multi_Freezer_Household
            on HouseHold.email = Multi_Freezer_Household.email
            where Multi_Freezer_Household.num_freezer > 1) Multi_Freezer_Household_PostalCode
            on PostalCode.postal_code = Multi_Freezer_Household_PostalCode.postal_code) Multi_Freezer_Household_State
            on Freezer.FK_Freezer_email_HouseHold_email = Multi_Freezer_Household_State.email ) Multi_Freezer_Household_Type_State
            group by email, model_type, state) Model_Type_Count
            group by model_type, state
            having model_type = 'chest freezer'
            ) Chest_Count
            ON Multi_Freezer_Household.state = Chest_Count.state
            LEFT JOIN
            (
            select state, count(email) as upright_householdd_count FROM
            (
            select email, model_type, state, count(email) as model_type_individual_household_count from (
            select FK_Freezer_email_HouseHold_email as email, model_type, state from Freezer inner join
            ( select state, email
            from PostalCode inner join
            (select Multi_Freezer_Household.email, FK_HouseHold_postal_code_PostalCode_postal_code as postal_code
            from HouseHold inner join
            (select FK_Freezer_email_HouseHold_email as email,
            count(FK_Freezer_email_HouseHold_email) as num_freezer
            from Freezer
            group by email) Multi_Freezer_Household
            on HouseHold.email = Multi_Freezer_Household.email
            where Multi_Freezer_Household.num_freezer > 1) Multi_Freezer_Household_PostalCode
            on PostalCode.postal_code = Multi_Freezer_Household_PostalCode.postal_code) Multi_Freezer_Household_State
            on Freezer.FK_Freezer_email_HouseHold_email = Multi_Freezer_Household_State.email ) Multi_Freezer_Household_Type_State
            group by email, model_type, state) Model_Type_Count
            group by model_type, state
            having model_type = 'upright freezer'
            ) Upright_Count
            ON Multi_Freezer_Household.state = Upright_Count.state
            LEFT JOIN
            (
            select state, count( DISTINCT email) as other_household_count FROM
            (
            select email, model_type, state, count(email) as model_type_individual_household_count from (
            select FK_Freezer_email_HouseHold_email as email, model_type, state from Freezer inner join
            ( select state, email
            from PostalCode inner join
            (select Multi_Freezer_Household.email, FK_HouseHold_postal_code_PostalCode_postal_code as postal_code
            from HouseHold inner join
            (select FK_Freezer_email_HouseHold_email as email,
            count(FK_Freezer_email_HouseHold_email) as num_freezer
            from Freezer
            group by email) Multi_Freezer_Household
            on HouseHold.email = Multi_Freezer_Household.email
            where Multi_Freezer_Household.num_freezer > 1) Multi_Freezer_Household_PostalCode
            on PostalCode.postal_code = Multi_Freezer_Household_PostalCode.postal_code) Multi_Freezer_Household_State
            on Freezer.FK_Freezer_email_HouseHold_email = Multi_Freezer_Household_State.email ) Multi_Freezer_Household_Type_State
            group by email, model_type, state
            having model_type not in ('chest freezer', 'upright freezer')
            ) household_other_freezer
            group by state
            ) Other_Count_Aggregated
            ON Multi_Freezer_Household.state = Other_Count_Aggregated.state;
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)
api.add_resource(ExtraFridgeFreezerReport2, '/reports/ExtraFridgeFreezerReport2')



class BathroomStatistics1(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(Cnt), '0.#') AS min_bath_perhousehold, 
            FORMAT(AVG(Cnt), '1.#') AS avg_bath_perhousehold, 
            FORMAT(MAX(Cnt), '0.#') AS max_bath_perhousehold 
            FROM (SELECT FK_Half_email_HouseHold_email, Count(*) as 'Cnt' FROM (SELECT number, FK_Half_email_HouseHold_email FROM Half UNION ALL
            SELECT number, FK_Full_email_HouseHold_email FROM Full) Bathrooms
            GROUP BY FK_Half_email_HouseHold_email) Bathrooms_cnt
            -- The minimum (as an integer), average (as a decimal number rounded
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics1, '/reports/BathroomStatistics1')



class BathroomStatistics2(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(Cnt), '0.#') AS min_halfbath_perhousehold, 
            FORMAT(AVG(Cnt), '1.#') AS avg_halfbath_perhousehold, 
            FORMAT(MAX(Cnt), '0.#') AS max_halfbath_perhousehold FROM 
            (SELECT FK_Half_email_HouseHold_email, Count(*) as 'Cnt' FROM (SELECT number, FK_Half_email_HouseHold_email FROM Half ) Bathrooms
            GROUP BY FK_Half_email_HouseHold_email) Bathrooms_cnt
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics2, '/reports/BathroomStatistics2')



class BathroomStatistics3(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(Cnt), '0.#') AS min_fullbath_perhousehold, 
            FORMAT(AVG(Cnt), '1.#') AS avg_fullbath_perhousehold, 
            FORMAT(MAX(Cnt), '0.#') AS max_fullbath_perhousehold FROM 
            (SELECT FK_Full_email_HouseHold_email, Count(*) as 'Cnt' FROM (SELECT number, FK_Full_email_HouseHold_email FROM Full ) Bathrooms
            GROUP BY FK_Full_email_HouseHold_email) Bathrooms_cnt
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics3, '/reports/BathroomStatistics3')



class BathroomStatistics4(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(commode_count), '0.#') AS min_commode_perhousehold, 
            FORMAT(AVG(commode_count), '1.#') AS avg_commode_perhousehold, 
            FORMAT(MAX(commode_count), '0.#') AS max_commode_perhousehold 
            FROM (SELECT FK_Half_email_HouseHold_email, Sum(commode) as 'commode_count' FROM (SELECT number, FK_Half_email_HouseHold_email, commode FROM Half UNION ALL
            SELECT number, FK_Full_email_HouseHold_email, commode FROM Full) Bathrooms
            GROUP BY FK_Half_email_HouseHold_email) commodes_cnt
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics4, '/reports/BathroomStatistics4')



class BathroomStatistics5(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(sink_count), '0.#') AS min_sink_perhousehold, 
            FORMAT(AVG(sink_count), '1.#') AS avg_sink_perhousehold, 
            FORMAT(MAX(sink_count), '0.#') AS max_sink_perhousehold 
            FROM (SELECT FK_Half_email_HouseHold_email, Sum(sink) as 'sink_count' FROM (SELECT number, FK_Half_email_HouseHold_email, sink FROM Half UNION ALL
            SELECT number, FK_Full_email_HouseHold_email, sink FROM Full) Bathrooms
            GROUP BY FK_Half_email_HouseHold_email) sink_cnt
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics5, '/reports/BathroomStatistics5')



class BathroomStatistics6(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(bidet_count), '0.#') AS min_bidet_perhousehold, 
            FORMAT(AVG(bidet_count), '1.#') AS avg_bidet_perhousehold, 
            FORMAT(MAX(bidet_count), '0.#') AS max_bidet_perhousehold 
            FROM (SELECT FK_Half_email_HouseHold_email, Sum(bidet) as 'bidet_count' FROM (SELECT number, FK_Half_email_HouseHold_email, bidet FROM Half UNION ALL
            SELECT number, FK_Full_email_HouseHold_email, bidet FROM Full) Bathrooms
            GROUP BY FK_Half_email_HouseHold_email) bidet_cnt
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics6, '/reports/BathroomStatistics6')



class BathroomStatistics7(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(bathtub_count), '0.#') AS min_bathtub_perhousehold, 
            FORMAT(AVG(bathtub_count), '1.#') AS avg_bathtub_perhousehold, 
            FORMAT(MAX(bathtub_count), '0.#') AS max_bathtub_perhousehold 
            FROM (SELECT FK_Full_email_HouseHold_email, Sum(bathtub) as 'bathtub_count' FROM (
            SELECT number, FK_Full_email_HouseHold_email, bathtub FROM Full) Bathrooms
            GROUP BY FK_Full_email_HouseHold_email) bathtub_cnt
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics7, '/reports/BathroomStatistics7')



class BathroomStatistics8(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(shower_count), '0.#') AS min_shower_perhousehold, 
            FORMAT(AVG(shower_count), '1.#') AS avg_shower_perhousehold, 
            FORMAT(MAX(shower_count), '0.#') AS max_shower_perhousehold 
            FROM (SELECT FK_Full_email_HouseHold_email, Sum(shower) as 'shower_count' FROM (
            SELECT number, FK_Full_email_HouseHold_email, shower FROM Full) Bathrooms
            GROUP BY FK_Full_email_HouseHold_email) shower_cnt
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics8, '/reports/BathroomStatistics8')



class BathroomStatistics9(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT 
            FORMAT(MIN(tub_shower_count), '0.#') AS min_tub_shower_perhousehold, 
            FORMAT(AVG(tub_shower_count), '1.#') AS avg_tub_shower_perhousehold, 
            FORMAT(MAX(tub_shower_count), '0.#') AS max_tub_shower_perhousehold 
            FROM (SELECT FK_Full_email_HouseHold_email, Sum(tub_shower) as 'tub_shower_count' FROM (
            SELECT number, FK_Full_email_HouseHold_email, tub_shower FROM Full) Bathrooms
            GROUP BY FK_Full_email_HouseHold_email) tub_shower_cnt
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(BathroomStatistics9, '/reports/BathroomStatistics9')


class MostBidetsState(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            SELECT state, FORMAT(bidet_counts, '0.#') FROM
			((SELECT state, SUM(bidet) as bidet_counts FROM
			((SELECT PostalCode.state AS 'state' , HouseHold.email, Full.bidet FROM 
            Full 
            JOIN HouseHold ON HouseHold.email=Full.FK_Full_email_HouseHold_email
            JOIN PostalCode ON HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code=PostalCode.postal_code) 
			UNION ALL
			(SELECT PostalCode.state, HouseHold.email, Half.bidet FROM 
            Half
            JOIN HouseHold ON HouseHold.email=Half.FK_Half_email_HouseHold_email
            JOIN PostalCode ON HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code=PostalCode.postal_code)) STATE_BIDETS
			GROUP BY state )
			ORDER BY bidet_counts DESC LIMIT 1) ZZZ
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(MostBidetsState, '/reports/MostBidetsState')


class MostBidetsPostal(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            (SELECT postal_code as 'postal_with_most_bidets', 
            FORMAT(SUM(bidet), '0.#') as 'bidet_count' 
            FROM ((SELECT PostalCode.postal_code AS 'postal_code' , HouseHold.email, Full.bidet FROM PostalCode
            JOIN HouseHold ON HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code=PostalCode.postal_code
            JOIN Full ON HouseHold.email=Full.FK_Full_email_HouseHold_email) UNION ALL
            (SELECT PostalCode.postal_code, HouseHold.email, Half.bidet FROM PostalCode
            JOIN HouseHold ON HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code=PostalCode.postal_code
            JOIN Half ON HouseHold.email=Half.FK_Half_email_HouseHold_email)) state_bidets
            GROUP BY postal_code) ORDER BY `bidet_count` desc LIMIT 1;
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(MostBidetsPostal, '/reports/MostBidetsPostal')

class PrimaryBathHouseholds(Resource):
    def get (self):
        try:
            db.cursor.execute('''
            (SELECT COUNT(*) as 'single_bath_household_cnt' FROM (SELECT FK_Full_email_HouseHold_email, Count(*) as 'Cnt' FROM (SELECT number, FK_Full_email_HouseHold_email FROM Full UNION ALL
            SELECT number, FK_Half_email_HouseHold_email FROM Half) Bathrooms WHERE EXISTS (SELECT * FROM Full WHERE
            (Full.FK_Full_email_HouseHold_email=Bathrooms.FK_Full_email_HouseHold_email AND Full.is_primary=1))
            GROUP BY FK_Full_email_HouseHold_email HAVING Cnt=1) single_bath_counts)
			''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(PrimaryBathHouseholds, '/reports/PrimaryBathHouseholds')


class ManufactureList(Resource):
    def get (self):
        try:
            db.cursor.execute('''SELECT name FROM Manufacturer''')
            res = db.cursor.fetchall()
            print(res)
            return({'result': res}, 200)
        except Exception as e:
            return(f'Server side error: {e}', 500)

api.add_resource(ManufactureList, '/manufacturer_list')


if __name__ == '__main__':
    try:
        app.run(debug = True)
        db.cnx.close()
    except KeyboardInterrupt as KI:
        print(KI)
        db.cnx.close()