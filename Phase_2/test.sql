

-- household info
insert into PostalCode (postal_code, city, state, latitude, longitude)
values ('72044','Edgemont','AR',35.624351,-92.16056 );

insert into HouseHold (email, square_footage, occupant, bedroom, home_type, FK_HouseHold_postal_code_PostalCode_postal_code)
values ('ktran322@gatech.edu', 992, 2, 2, 'condo', '72044');

-- bathroom info
insert into Half (number, sink, commode, bidet, is_primary, name, FK_Half_email__HouseHold_email)
values (2, 1, 1, 1, False,  'dummyname', 'ktran322@gatech.edu');

insert into Full (number, sink, commode, bidet, is_primary, bathtub, shower, tub_shower, FK_Full_email__HouseHold_email)
values (1, 1, 1, 1, True,  0, 1, 0, 'ktran322@gatech.edu');




