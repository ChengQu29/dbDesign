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
    email VARCHAR(250) NOT NULL,
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
    FK_PhoneNumber_email_HouseHold_email VARCHAR(250) NOT NULL,
    PRIMARY KEY (area_code, number),
    FOREIGN KEY (FK_PhoneNumber_email_HouseHold_email) REFERENCES HouseHold(email)
);


-- Bathroom Information

CREATE TABLE Half (
	number varchar(255) NOT NULL,
	sink INT NOT NULL,
	commode INT NOT NULL,
	bidet INT NOT NULL,
	is_primary BOOLEAN NOT NULL,
	name VARCHAR(255),
	FK_Half_email__HouseHold_email VARCHAR(250) NOT NULL,
	FOREIGN KEY (FK_Half_email__HouseHold_email) REFERENCES HouseHold(email)
);

CREATE TABLE Full (
	number varchar(255) NOT NULL,
	sink INT NOT NULL,
	commode INT NOT NULL,
	bidet INT NOT NULL,
	is_primary BOOLEAN NOT NULL,
	bathtub INT NOT NULL,
	shower INT NOT NULL,
	tub_shower INT NOT NULL,
	FK_Full_email__HouseHold_email VARCHAR(250) NOT NULL,
	FOREIGN KEY (FK_Full_email__HouseHold_email) REFERENCES HouseHold(email)
);

-- Appliance Information

CREATE TABLE Freezer (
    Model_name VARCHAR(250) NOT NULL,
	Name VARCHAR(250) NOT NULL,
	Model_type VARCHAR(250) NOT NULL,   -- type -> Model_type because type means something in sql
	PRIMARY KEY (Model_name, number),
	FOREIGN KEY (Freezer_email__HouseHold_email) REFERENCES HouseHold(email)
);

CREATE TABLE Washer (
    Model_name VARCHAR(250) NOT NULL,
	Name VARCHAR(250) NOT NULL,
	Loading_type VARCHAR(250) NOT NULL,   
	PRIMARY KEY (Model_name, number),
	FOREIGN KEY (FK_Washer_email__HouseHold_email) REFERENCES HouseHold(email)
);

CREATE TABLE Dryer (
    Model_name VARCHAR(250) NOT NULL,
	Name VARCHAR(250) NOT NULL,
	Heat_source VARCHAR(250) NOT NULL,   
	PRIMARY KEY (Model_name, number),
	FOREIGN KEY (FK_Dryer_email__HouseHold_email) REFERENCES HouseHold(email)
);

CREATE TABLE TV (
    Model_name VARCHAR(250) NOT NULL,
	Name VARCHAR(250) NOT NULL,
	Display_type VARCHAR(250) NOT NULL,
	Display_size FLOAT(20, 10) NOT NULL,
	Maximum_resolution VARCHAR(250) NOT NULL,	
	PRIMARY KEY (Model_name, number),
	FOREIGN KEY (FK_TV_email__HouseHold_email) REFERENCES HouseHold(email)
);

CREATE TABLE Cooker (
    Model_name VARCHAR(250) NOT NULL,
	Name VARCHAR(250) NOT NULL,   
	PRIMARY KEY (Model_name, number),
	FOREIGN KEY (FK_Cooker_email__HouseHold_email) REFERENCES HouseHold(email)
);

CREATE TABLE Oven (
    Model_name VARCHAR(250) NOT NULL,
	Name VARCHAR(250) NOT NULL,
	Heat_source VARCHAR(250) NOT NULL,   
	Oven_type VARCHAR(250) NOT NULL, 
	PRIMARY KEY (Model_name, number),
	FOREIGN KEY (FK_Oven_email__HouseHold_email) REFERENCES HouseHold(email)
);

CREATE TABLE Cooktop (
    Model_name VARCHAR(250) NOT NULL,
	Name VARCHAR(250) NOT NULL,
	Heat_source VARCHAR(250) NOT NULL,   
	PRIMARY KEY (Model_name, number),
	FOREIGN KEY (FK_Cooktop_email__HouseHold_email) REFERENCES HouseHold(email)
);