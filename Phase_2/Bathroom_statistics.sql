-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and
maximum (as an integer) count of all bathrooms per household

SELECT MIN(Cnt) AS min_bath_perhousehold, AVG(Cnt) AS avg_bath_perhousehold, MAX(Cnt) AS max_bath_perhousehold FROM (SELECT FK_Half_email_HouseHold_email, Count(*) as 'Cnt' FROM (SELECT number, FK_Half_email_HouseHold_email FROM Half UNION ALL
SELECT number, FK_Full_email_HouseHold_email FROM Full) Bathrooms
GROUP BY FK_Half_email_HouseHold_email) Bathrooms_cnt

-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of half bathrooms per household
SELECT MIN(Cnt) AS min_halfbath_perhousehold, AVG(Cnt) AS avg_halfbath_perhousehold, MAX(Cnt) AS max_halfbath_perhousehold FROM (SELECT FK_Half_email_HouseHold_email, Count(*) as 'Cnt' FROM (SELECT number, FK_Half_email_HouseHold_email FROM Half ) Bathrooms
GROUP BY FK_Half_email_HouseHold_email) Bathrooms_cnt
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of full bathrooms per household
SELECT MIN(Cnt) AS min_fullbath_perhousehold, AVG(Cnt) AS avg_fullbath_perhousehold, MAX(Cnt) AS max_fullbath_perhousehold FROM (SELECT FK_Full_email_HouseHold_email, Count(*) as 'Cnt' FROM (SELECT number, FK_Full_email_HouseHold_email FROM Full ) Bathrooms
GROUP BY FK_Full_email_HouseHold_email) Bathrooms_cnt
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of commodes per household
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of sinks per household
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of bidets per household
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of bathtubs per household
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of showers per household
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of tub/showers per household
-- Which state has the most bidets (count of all bidets as an integer), and how many
-- Which postal code has the most bidets (count of all bidets as an integer), and how many
-- How many households (count as an integer), have only a single, primary bathroom, and no other bathrooms