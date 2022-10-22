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

insert into Freezer (FK_Freezer_email__HouseHold_email) values ('ktran322@gatech.edu', 'model blah blah', 'Samsung', 'side-by-side');
insert into Freezer (FK_Freezer_email__HouseHold_email, name, model_type) values ('ktran322@gatech.edu', 'GE', 'French door');


insert into Washer (FK_Washer_email__HouseHold_email, model_name, name, model_type) values ('ktran322@gatech.edu', 'overpriced mistake', 'Samsung', 'top load');





