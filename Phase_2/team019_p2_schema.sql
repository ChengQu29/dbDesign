CREATE DATABASE IF NOT EXISTS cs6400_2022_03_Team019;
USE cs6400_2022_03_Team019;

--  Household Information

CREATE TABLE PostalCode(
    postal_code VARCHAR(5) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL,
    latitude FLOAT(9, 6) NOT NULL,
    longitude FLOAT(9, 6) NOT NULL,
    PRIMARY KEY (postal_code)
);

CREATE TABLE HouseHold(
    email VARCHAR(240) NOT NULL,
    square_footage SMALLINT NOT NULL,
    occupant TINYINT NOT NULL,
    bedroom TINYINT NOT NULL,
    home_type VARCHAR(20) NOT NULL,
    FK_HouseHold_postal_code_PostalCode_postal_code VARCHAR(5) NOT NULL,
    PRIMARY KEY (email),
    FOREIGN KEY (FK_HouseHold_postal_code_PostalCode_postal_code) REFERENCES PostalCode(postal_code) 
);

CREATE TABLE PhoneNumber(
    area_code VARCHAR(3) NOT NULL,
    number VARCHAR(7) NOT NULL,
    phone_type VARCHAR(6) NOT NULL,
    FK_PhoneNumber_email_HouseHold_email VARCHAR(240) NOT NULL,
    PRIMARY KEY (area_code, number),
    FOREIGN KEY (FK_PhoneNumber_email_HouseHold_email) REFERENCES HouseHold(email)
);


-- Bathroom Information

CREATE TABLE Half (
	number varchar(240) NOT NULL,
	sink INT NOT NULL,
	commode INT NOT NULL,
	bidet INT NOT NULL,
	name VARCHAR(240),
	FK_Half_email_HouseHold_email VARCHAR(240) NOT NULL,
	FOREIGN KEY (FK_Half_email_HouseHold_email) REFERENCES HouseHold(email),
	PRIMARY KEY (number, FK_Half_email_HouseHold_email)
);

CREATE TABLE Full (
	number varchar(240) NOT NULL,
	sink INT NOT NULL,
	commode INT NOT NULL,
	bidet INT NOT NULL,
	is_primary BOOLEAN NOT NULL,
	bathtub INT NOT NULL,
	shower INT NOT NULL,
	tub_shower INT NOT NULL,
	FK_Full_email_HouseHold_email VARCHAR(240) NOT NULL,
	FOREIGN KEY (FK_Full_email_HouseHold_email) REFERENCES HouseHold(email),
	PRIMARY KEY (number, FK_Full_email_HouseHold_email)
);

-- Appliance Information

CREATE TABLE Manufacturer (
	name VARCHAR(240) NOT NULL,
	PRIMARY KEY (name)
);


CREATE TABLE Freezer (
	freezer_id int NOT NULL AUTO_INCREMENT,
	FK_Freezer_email_HouseHold_email varchar(240) NOT NULL,
    model_name VARCHAR(240),
	name VARCHAR(240) NOT NULL,
	model_type VARCHAR(240) NOT NULL,   -- type -> Model_type because type means something in sql. Need to also change in other reports
	PRIMARY KEY (freezer_id, FK_Freezer_email_HouseHold_email),
	FOREIGN KEY (FK_Freezer_email_HouseHold_email) REFERENCES HouseHold(email),
	FOREIGN KEY (name) REFERENCES Manufacturer(name)
);

CREATE TABLE Washer (
	washer_id int NOT NULL AUTO_INCREMENT,
	FK_Washer_email_HouseHold_email varchar(240) NOT NULL,
    model_name VARCHAR(240),
	name VARCHAR(240) NOT NULL,
	loading_type VARCHAR(240) NOT NULL,   -- type -> Model_type because type means something in sql. Need to also change in other reports
	PRIMARY KEY (washer_id, FK_Washer_email_HouseHold_email),
	FOREIGN KEY (FK_Washer_email_HouseHold_email) REFERENCES HouseHold(email),
	FOREIGN KEY (name) REFERENCES Manufacturer(name)
);

CREATE TABLE Dryer (
	dryer_id int NOT NULL AUTO_INCREMENT,
	FK_Dryer_email_HouseHold_email varchar(240) NOT NULL,
    Model_name VARCHAR(240),
	name VARCHAR(240) NOT NULL,
	heat_source VARCHAR(240) NOT NULL,   
	PRIMARY KEY (dryer_id, FK_Dryer_email_HouseHold_email),
	FOREIGN KEY (FK_Dryer_email_HouseHold_email) REFERENCES HouseHold(email),
	FOREIGN KEY (name) REFERENCES Manufacturer(name)
);

CREATE TABLE TV (
    tv_id int NOT NULL AUTO_INCREMENT,
    FK_tv_email_HouseHold_email varchar(240) NOT NULL,
    model_name VARCHAR(240) ,
	name VARCHAR(240) NOT NULL,
	display_type VARCHAR(240) NOT NULL,
	display_size FLOAT(21, 11) NOT NULL,
	maximum_resolution VARCHAR(240) NOT NULL,	
	PRIMARY KEY (tv_id, FK_tv_email_HouseHold_email),
	FOREIGN KEY (FK_tv_email_HouseHold_email) REFERENCES HouseHold(email),
	FOREIGN KEY (name) REFERENCES Manufacturer(name)
);

CREATE TABLE Cooker (
    cooker_id int NOT NULL AUTO_INCREMENT,
    FK_cooker_email_HouseHold_email varchar(240) NOT NULL,
    model_name VARCHAR(240),
    name VARCHAR(240) NOT NULL,
    PRIMARY KEY (cooker_id, FK_cooker_email_HouseHold_email),
	FOREIGN KEY (FK_cooker_email_HouseHold_email) REFERENCES HouseHold(email),
	FOREIGN KEY (name) REFERENCES Manufacturer(name)

);

CREATE TABLE Oven (
    FK_Oven_id_Cooker_cooker_id int NOT NULL,
    FK_oven_email_HouseHold_email varchar(240) NOT NULL,
	has_gas_heat_source BOOLEAN NOT NULL, 
	has_electric_heat_source BOOLEAN NOT NULL,
	has_microwave_heat_source BOOLEAN NOT NULL, 
	oven_type VARCHAR(240) NOT NULL, 
	PRIMARY KEY (FK_Oven_id_Cooker_cooker_id, FK_oven_email_HouseHold_email),
	FOREIGN KEY (FK_Oven_id_Cooker_cooker_id) REFERENCES Cooker(cooker_id),
	FOREIGN KEY (FK_oven_email_HouseHold_email) REFERENCES HouseHold(email)
);

CREATE TABLE Cooktop (
    FK_Cooktop_id_Cooker_cooker_id int NOT NULL,
    FK_cooktop_email_HouseHold_email varchar(240) NOT NULL,
	heat_source VARCHAR(240) NOT NULL, 
	PRIMARY KEY (FK_Cooktop_id_Cooker_cooker_id, FK_cooktop_email_HouseHold_email),
	FOREIGN KEY (FK_Cooktop_id_Cooker_cooker_id) REFERENCES Cooker(cooker_id),
	FOREIGN KEY (FK_cooktop_email_HouseHold_email) REFERENCES HouseHold(email)
);

