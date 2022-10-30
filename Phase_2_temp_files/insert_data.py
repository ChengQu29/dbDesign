import os
import mysql.connector

"""
connect to an existing schema
"""
# Open a cursor to perform database operations
conn = mysql.connector.connect(
        host="localhost",
        database="hemkraft",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])

# Open a cursor to perform database operations
cur = conn.cursor()


sqlInsertPostalCode = "INSERT INTO PostalCode (postal_code, city, state, latitude, longitude) VALUES (%s,%s,%s,%s,%s)"

postalCodeVal = [
        ('94117','San Francisco','LA',37.733795,-122.446747 ),
        ('83602','Banks','ID',44.0804,-116.1240 ),
        ('94102','San Francisco','LA',37.7787,-122.4212 ),
        ('60928','Crescent City','IL',40.7415,-87.8501 )
]


sqlInsertHouseHold = "INSERT INTO HouseHold (email, square_footage, occupant, bedroom, home_type, FK_HouseHold_postal_code_PostalCode_postal_code) VALUES (%s,%s,%s,%s,%s,%s)"

houseHoldVal = [
        ('ktran322@gatech.edu', 992, 2, 2, 'condo', '94117'),
        ('chengwen@gatech.edu', 1050, 3, 2, 'townhouse', '83602'),
        ('jing@gatech.edu', 1050, 3, 2, 'townhouse', '60928'),
        ('mark@gatech.edu', 1050, 3, 2, 'townhouse', '94117')
]

sqlInsertPhoneNumber = "INSERT INTO PhoneNumber (area_code, number, phone_type, FK_PhoneNumber_email_HouseHold_email) VALUES (%s,%s,%s,%s)"

phoneNumberVal = [
        ('905', '9224143', 'home', 'ktran322@gatech.edu'),
        ('709', '7699095', 'home', 'chengwen@gatech.edu'),
        ('432', '1249095', 'home', 'jing@gatech.edu'),
        ('777', '8889095', 'cell', 'mark@gatech.edu')
]


sqlInsertHalf = "INSERT INTO Half (number, sink, commode, bidet, name, FK_Half_email_HouseHold_email) VALUES (%s,%s,%s,%s,%s,%s)"

halfVal = [
        (2, 1, 1, 1,  'dummyname', 'ktran322@gatech.edu'),
        (2, 2, 2, 0,  'bamboo', 'mark@gatech.edu')
]

sqlInsertFull = "INSERT INTO Full (number, sink, commode, bidet, is_primary, bathtub, shower, tub_shower, FK_Full_email_HouseHold_email) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"


fullVal = [
        (1, 1, 1, 1, True,  0, 1, 0, 'ktran322@gatech.edu'),
        (1, 1, 2, 1, True,  0, 1, 0, 'chengwen@gatech.edu'),
        (1, 3, 0, 2, True,  0, 1, 0, 'jing@gatech.edu'),
        (1, 2, 2, 1, True,  1, 1, 1, 'mark@gatech.edu')
]

sqlInsertManufacturer1 = "insert into Manufacturer (name) values ('Samsung')"
sqlInsertManufacturer2 = "insert into Manufacturer (name) values ('LG')"
sqlInsertManufacturer3 = "insert into Manufacturer (name) values ('GE')"
sqlInsertManufacturer4 = "insert into Manufacturer (name) values ('Kenmore')"

sqlInsertFreezer = "insert into Freezer (freezer_id, FK_Freezer_email_HouseHold_email, model_name, name, model_type) values (%s,%s,%s,%s,%s)"

freezerVal = [
        (0, 'ktran322@gatech.edu', 'GE-123', 'GE', 'chest'),
        (0, 'ktran322@gatech.edu', 'GE-456', 'GE', 'portable'),
        (0, 'ktran322@gatech.edu', 'GE-789', 'GE', 'drawer'),
        (0, 'ktran322@gatech.edu', 'GE-456', 'LG', 'upright'),
        (0, 'jing@gatech.edu', 'GE-123', 'GE', 'chest'),
        (0, 'jing@gatech.edu', 'GE-456', 'GE', 'portable'),
        (0, 'chengwen@gatech.edu', 'GE-456', 'LG', 'upright'),
        (0, 'chengwen@gatech.edu', 'GE-456', 'LG', 'upright'),
        (0, 'mark@gatech.edu', 'Samsung-123', 'Samsung', 'upright')

]

sqlInsertWasher = "insert into Washer (washer_id, FK_Washer_email_HouseHold_email, model_name, name, loading_type) values (%s,%s,%s,%s,%s)"

washerVal = [
        (0, 'ktran322@gatech.edu', 'GE-washer-123', 'GE', 'top'),
        (0, 'ktran322@gatech.edu', 'LG-washer-123', 'LG', 'front'),
        (0, 'jing@gatech.edu', 'Samsung-washer-123', 'Samsung', 'top'),
        (0, 'chengwen@gatech.edu', 'Samsung-washer-123', 'Samsung', 'top'),
        (0, 'mark@gatech.edu', 'Samsung-washer-456', 'Samsung', 'front')
]

sqlInsertDryer = "insert into Dryer (Dryer_id, FK_Dryer_email_HouseHold_email, model_name, name, Heat_source) values (%s,%s,%s,%s,%s)"

dryerVal = [
        (0, 'ktran322@gatech.edu', 'Kenmore-dryer-123', 'Kenmore', 'electric'),
        (0, 'ktran322@gatech.edu', 'Kenmore-dryer-123', 'Kenmore', 'electric'),
        (0, 'ktran322@gatech.edu', 'LG-dryer-123', 'LG', 'electric')
]


sqlInsertTV = "insert into TV (tv_id, FK_tv_email_HouseHold_email, model_name, name, Display_type, Display_size, Maximum_resolution) values (%s,%s,%s,%s,%s,%s,%s)"

tvVal = [
        (0, 'ktran322@gatech.edu', 'LG-TV-123', 'LG', 'LCD', 5, '126x126'),
        (0, 'ktran322@gatech.edu', 'GE-TV-123', 'GE', 'LCD', 0.9, '1000x1000'),
        (0, 'ktran322@gatech.edu', 'Samsung-TV-123', 'Samsung', 'LCD', 0.11111111111111, '4k'),
        (0, 'chengwen@gatech.edu', 'Samsung-TV-123', 'Samsung', 'LCD', 0.11111111111111, '4k'),
        (0, 'jing@gatech.edu', 'Samsung-TV-123', 'Samsung', 'LCD', 0.11111111111111, '4k'),
        (0, 'mark@gatech.edu', 'Samsung-TV-123', 'Samsung', 'LCD', 0.11111111111111, '4k'),
        (0, 'mark@gatech.edu', 'Samsung-TV-123', 'Samsung', 'LCD', 0.11111111111111, '4k')
]

sqlInsertCooker = "insert into Cooker (Cooker_id, FK_Cooker_email_HouseHold_email, model_name, name) values (%s,%s,%s,%s)"
cookerVal = [
        (0, 'ktran322@gatech.edu', 'GE-Oven-123', 'GE'),
        (0, 'jing@gatech.edu', 'GE-Oven-456', 'GE'),
        (0, 'chengwen@gatech.edu', 'LG-Oven-123', 'LG'),
        (0, 'mark@gatech.edu', 'LG-Oven-123', 'LG')
]


sqlInsertOven = "insert into Oven (FK_Oven_id_Cooker_cooker_id, FK_oven_email_HouseHold_email, has_gas_heat_source, has_electric_heat_source, has_microwave_heat_source, oven_type) values (%s,%s,%s,%s,%s,%s)"

ovenVal = [
        (1, 'ktran322@gatech.edu', True, False, True, 'conventional'),
        (2, 'jing@gatech.edu', False, False, True, 'conventional'),
        (3, 'chengwen@gatech.edu', True, True, True, 'conventional'),
        (4, 'mark@gatech.edu', True, True, False, 'conventional')
]

sqlInsertCooktop = "insert into Cooktop (FK_Cooktop_id_Cooker_cooker_id, FK_cooktop_email_HouseHold_email, Heat_source) values (%s,%s,%s)"

cooktopVal = [
        (1, 'ktran322@gatech.edu', 'gas'),
        (1, 'chengwen@gatech.edu', 'electric'),
        (1, 'jing@gatech.edu', 'electric')
]

# Insert data into the table
cur.executemany(sqlInsertPostalCode, postalCodeVal)
cur.executemany(sqlInsertHouseHold, houseHoldVal)
cur.executemany(sqlInsertPhoneNumber, phoneNumberVal)
cur.executemany(sqlInsertHalf, halfVal)
cur.executemany(sqlInsertFull, fullVal)
cur.execute(sqlInsertManufacturer1)
cur.execute(sqlInsertManufacturer2)
cur.execute(sqlInsertManufacturer3)
cur.execute(sqlInsertManufacturer4)
cur.executemany(sqlInsertFreezer, freezerVal)
cur.executemany(sqlInsertWasher, washerVal)
cur.executemany(sqlInsertDryer, dryerVal)
cur.executemany(sqlInsertTV, tvVal)
cur.executemany(sqlInsertCooker, cookerVal)
cur.executemany(sqlInsertOven, ovenVal)
cur.executemany(sqlInsertCooktop, cooktopVal)
conn.commit()

cur.close()
conn.close()
