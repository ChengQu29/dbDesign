-- household info
INSERT INTO PostalCode (postal_code, city, state, latitude, longitude)
VALUES ('72044','Edgemont','AR',35.624351,-92.16056 );

INSERT INTO HouseHold (email, square_footage, occupant, bedroom, home_type, FK_HouseHold_postal_code_PostalCode_postal_code)
VALUES ('ktran322@gatech.edu', 992, 2, 2, 'condo', '72044');

INSERT INTO PhoneNumber (area_code, number, phone_type, FK_PhoneNumber_email_HouseHold_email)
VALUES ('905', '9224143', 'home', 'ktran322@gatech.edu');

-- bathroom info
INSERT INTO Half (number, sink, commode, bidet, is_primary, name, FK_Half_email__HouseHold_email)
VALUES (2, 1, 1, 1, False,  'dummyname', 'ktran322@gatech.edu');

INSERT INTO Full (number, sink, commode, bidet, is_primary, bathtub, shower, tub_shower, FK_Full_email__HouseHold_email)
VALUES (1, 1, 1, 1, True,  0, 1, 0, 'ktran322@gatech.edu');


-- Appliances
insert into Manufacturer (name) values ('Samsung');
insert into Manufacturer (name) values ('LG');
insert into Manufacturer (name) values ('GE');

-- insert into Freezer (FK_Freezer_email__HouseHold_email) values ('ktran322@gatech.edu', 'model blah blah', 'Samsung', 'side-by-side');
insert into Freezer (FK_Freezer_email__HouseHold_email, name, model_name, model_type) values ('ktran322@gatech.edu', 'GE', 'French door', 'chest');

SELECT * FROM PhoneNumber;

-- by dafault will overwrite Khang's apliance
SELECT * FROM Freezer; 

-- Force second applince for Khang
insert into Freezer (freezer_id, FK_Freezer_email__HouseHold_email, name, model_name, model_type) values (0,'ktran322@gatech.edu', 'GE', 'neverworks', 'chest');

SELECT * FROM Freezer;

insert into Washer (washer_id, FK_Washer_email__HouseHold_email, name, model_name, loading_type) values (0, 'ktran322@gatech.edu', 'GE', 'neverworks', 'top');
insert into Washer (washer_id, FK_Washer_email__HouseHold_email, name, model_name, loading_type) values (0, 'ktran322@gatech.edu', 'GE', 'neverworks', 'front');
insert into Washer (washer_id, FK_Washer_email__HouseHold_email, name, model_name, loading_type) values (0, 'ktran322@gatech.edu', 'GE', 'neverworks', 'top');
SELECT * FROM Washer;
insert into Dryer (Dryer_id, FK_Dryer_email__HouseHold_email, name, model_name, Heat_source) values (0, 'ktran322@gatech.edu', 'LG', 'alwaysbroken', 'gas');
insert into Dryer (Dryer_id, FK_Dryer_email__HouseHold_email, name, model_name, Heat_source) values (0, 'ktran322@gatech.edu', 'GE', 'alwaysbroken', 'electric');
insert into Dryer (Dryer_id, FK_Dryer_email__HouseHold_email, name, model_name, Heat_source) values (0, 'ktran322@gatech.edu', 'Samsung', 'alwaysbroken', 'none');
SELECT * FROM Dryer;

insert into TV (tv_id, FK_tv_email__HouseHold_email, name, model_name, Display_type, Display_size, Maximum_resolution) values (0, 'ktran322@gatech.edu', 'LG', 'alwaysbroken', 'LCD', 5, '126x126');
insert into TV (tv_id, FK_tv_email__HouseHold_email, name, model_name, Display_type, Display_size, Maximum_resolution) values (0, 'ktran322@gatech.edu', 'GE', 'alwaysbroken', 'LCD', 0.9, '1000x1000');
insert into TV (tv_id, FK_tv_email__HouseHold_email, name, model_name, Display_type, Display_size, Maximum_resolution) values (0, 'ktran322@gatech.edu', 'Samsung', 'alwaysbroken', 'LCD', 0.11111111111111, '4k');
SELECT * FROM TV;

insert into Oven (Oven_id, FK_Oven_email__HouseHold_email, name, model_name, Heat_source, oven_type) values (0, 'ktran322@gatech.edu', 'LG', 'alwaysbroken', 'gas', 'conventional');
insert into Oven (Oven_id, FK_Oven_email__HouseHold_email, name, model_name, Heat_source, oven_type) values (0, 'ktran322@gatech.edu', 'GE', 'alwaysbroken', 'electric', 'conventional');
insert into Oven (Oven_id, FK_Oven_email__HouseHold_email, name, model_name, Heat_source, oven_type) values (0, 'ktran322@gatech.edu', 'Samsung', 'alwaysbroken', 'none', 'conventional');
SELECT * FROM Oven;

insert into Cooktop (Cooktop_id, FK_Cooktop_email__HouseHold_email, name, model_name, Heat_source) values (0, 'ktran322@gatech.edu', 'LG', 'alwaysbroken', 'gas');
insert into Cooktop (Cooktop_id, FK_Cooktop_email__HouseHold_email, name, model_name, Heat_source) values (0, 'ktran322@gatech.edu', 'GE', 'alwaysbroken', 'electric');
insert into Cooktop (Cooktop_id, FK_Cooktop_email__HouseHold_email, name, model_name, Heat_source) values (0, 'ktran322@gatech.edu', 'Samsung', 'alwaysbroken', 'none');
SELECT * FROM Cooktop;

insert into Cooker (Cooker_id, FK_Cooker_email__HouseHold_email, name, model_name) values (0, 'ktran322@gatech.edu', 'LG', 'alwaysbroken');
insert into Cooker (Cooker_id, FK_Cooker_email__HouseHold_email, name, model_name) values (0, 'ktran322@gatech.edu', 'GE', 'alwaysbroken');
insert into Cooker (Cooker_id, FK_Cooker_email__HouseHold_email, name, model_name) values (0, 'ktran322@gatech.edu', 'Samsung', 'alwaysbroken');
SELECT * FROM Cooker;


