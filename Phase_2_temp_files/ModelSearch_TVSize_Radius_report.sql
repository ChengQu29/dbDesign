-- manufacturer / model search
SELECT distinct(model_name), name FROM
(SELECT cooker_id, FK_cooker_email_HouseHold_email, model_name, name FROM Cooker UNION
SELECT  dryer_id, FK_Dryer_email_HouseHold_email, Model_name, name FROM Dryer UNION
SELECT  freezer_id, FK_Freezer_email_HouseHold_email, model_name, name FROM Freezer UNION
SELECT tv_id, FK_tv_email_HouseHold_email, model_name, name from TV  UNION
SELECT  washer_id,  FK_Washer_email_HouseHold_email, model_name, name FROM Washer ) Appliances
WHERE model_name LIKE "%L%"
ORDER BY model_name, name ASC

-- average TV size
SELECT state, FORMAT(AVG(display_size), '2.#') AS Average_size FROM
(select state, postal_code, email, display_size from postalCode
join Household
ON postal_code = Household.FK_HouseHold_postal_code_PostalCode_postal_code
join TV
ON Household.email = TV.FK_tv_email_HouseHold_email) ALL_TV_IN_STATE
group by state
ORDER BY STATE ASC

--drill down report
WITH x1 AS (
	SELECT state, AVG(display_size) AS Average_size FROM
	(select state, postal_code, email, display_size from postalCode
	join Household
	ON postal_code = Household.FK_HouseHold_postal_code_PostalCode_postal_code
	join TV
	ON Household.email = TV.FK_tv_email_HouseHold_email) ALL_TV_IN_STATE
	GROUP BY state
	ORDER BY state ASC),
x2 AS (
SELECT state, display_type, maximum_resolution from PostalCode  
JOIN Household  
ON postal_code = HouseHold.FK_HouseHold_postal_code_PostalCode_postal_code  
JOIN TV  
ON HouseHold.email = TV.FK_tv_email_HouseHold_email)
select x1.state, display_type AS screen_type, maximum_resolution, FORMAT(Average_size, '2.#') AS Average_size from x1
JOIN
x2
WHERE x1.state = 'LA'

-- radius query
SELECT postal_code, DistanceFromInputLocation, AVG(occupant), AVG(bedroom), AVG(NumberOfBathroom), AVG(RatioOfCommodeToOccupant) 
FROM 
(With x0 AS (select FK_Freezer_email_HouseHold_email AS Email, (NumberOfApp.A+NumberOfApp.B+NumberOfApp.C+NumberOfApp.D+NumberOfApp.E) AS Total From 
	(With FreezerOwnedPerHousehold As (select FK_Freezer_email_HouseHold_email, count(*) AS A from FREEZER 
	group by FK_Freezer_email_HouseHold_email), 
	CookerOwnedPerHousehold AS (select FK_Cooker_email_HouseHold_email, count(*) AS B from COOKER 
	group by FK_Cooker_email_HouseHold_email), 
	WasherOwnedPerHousehold AS (select FK_Washer_email_HouseHold_email, count(*) AS C from WASHER 
	group by FK_Washer_email_HouseHold_email), 
	DryerOwnedPerHousehold AS (select FK_Dryer_email_HouseHold_email, count(*) AS D from DRYER 
	group by FK_Dryer_email_HouseHold_email), 
	TVOwnedPerHousehold AS (select FK_TV_email_HouseHold_email, count(*) AS E from TV 
	group by FK_TV_email_HouseHold_email) 
	select * from FreezerOwnedPerHousehold 
	left join 
	CookerOwnedPerHousehold 
	ON FreezerOwnedPerHousehold.FK_Freezer_email_HouseHold_email = CookerOwnedPerHousehold.FK_Cooker_email_HouseHold_email 
	left join 
	WasherOwnedPerHousehold 
	ON FreezerOwnedPerHousehold.FK_Freezer_email_HouseHold_email = WasherOwnedPerHousehold.FK_Washer_email_HouseHold_email 
	left join 
	DryerOwnedPerHousehold 
	ON FreezerOwnedPerHousehold.FK_Freezer_email_HouseHold_email = DryerOwnedPerHousehold.FK_Dryer_email_HouseHold_email 
	left join 
	TVOwnedPerHousehold 
	ON FreezerOwnedPerHousehold.FK_Freezer_email_HouseHold_email = TVOwnedPerHousehold.FK_TV_email_HouseHold_email) AS NumberOfApp), 
x1 AS 
	(Select postal_code, email, occupant, bedroom, D, Full.number AS fullNumber, Half.number AS halfNumber, has_gas_heat_source, has_electric_heat_source, has_microwave_heat_source, Cooktop.heat_source, FULL.commode AS FullCommode, HALF.commode As HalfCommode from  
	(Select postal_code, city, latitude, longitude, 
		   acos(sin(37.773972) * sin(latitude) + cos(37.773972) * cos(latitude) * cos(longitude - (-122.431297))) * 3958.8 As D 
	From PostalCode 
	Where acos(sin(37.773972) * sin(latitude) + cos(37.773972) * cos(latitude) * cos(longitude - (-122.431297))) * 3958.8 <= 1000) AS PostalCode_Within_Distance 
	left Join Household 
	ON PostalCode_Within_Distance.postal_code = Household.FK_HouseHold_postal_code_PostalCode_postal_code 
	left Join Oven 
	ON Household.email = Oven.FK_oven_email_HouseHold_email 
	left Join Cooktop
    On Household.email = Cooktop.FK_cooktop_email_Household_email
    left Join FULL 
	ON Household.email = FULL.FK_Full_email_HouseHold_email 
	left Join HALF 
	ON Household.email = HALF.FK_Half_email_Household_email), 
x2 AS (select email, FORMAT(x1.occupant/coalesce(x1.FullCommode+x1.HalfCommode, x1.FullCommode, x1.HalfCommode, 0), '2:#') AS RatioOfCommodeToOccupant from x1), 
x3 AS (select email, (x1.fullNumber+x1.halfNumber) AS NumberOfBathroom from x1) 
select  x1.postal_code, X1.D As DistanceFromInputLocation, occupant, bedroom, x3.NumberOfBathroom, RatioOfCommodeToOccupant, x0.Total AS NumberOfAppliance from x1 
join x2 
on x1.email = x2.email 
join x3 
on x1.email = x3.email 
join x0 
on x1.email = x0.email) AS STATISTICS 
GROUP BY postal_code 