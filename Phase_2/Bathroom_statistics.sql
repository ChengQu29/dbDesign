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
SELECT MIN(commode_count) AS min_commode_perhousehold, AVG(commode_count) AS avg_commode_perhousehold, MAX(commode_count) AS max_commode_perhousehold FROM (SELECT FK_Half_email_HouseHold_email, Sum(commode) as 'commode_count' FROM (SELECT number, FK_Half_email_HouseHold_email, commode FROM Half UNION ALL
SELECT number, FK_Full_email_HouseHold_email, commode FROM Full) Bathrooms
GROUP BY FK_Half_email_HouseHold_email) commodes_cnt
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of sinks per household
SELECT MIN(sink_count) AS min_sink_perhousehold, AVG(sink_count) AS avg_sink_perhousehold, MAX(sink_count) AS max_sink_perhousehold FROM (SELECT FK_Half_email_HouseHold_email, Sum(sink) as 'sink_count' FROM (SELECT number, FK_Half_email_HouseHold_email, sink FROM Half UNION ALL
SELECT number, FK_Full_email_HouseHold_email, sink FROM Full) Bathrooms
GROUP BY FK_Half_email_HouseHold_email) sink_cnt
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of bidets per household
SELECT MIN(bidet_count) AS min_bidet_perhousehold, AVG(bidet_count) AS avg_bidet_perhousehold, MAX(bidet_count) AS max_bidet_perhousehold FROM (SELECT FK_Half_email_HouseHold_email, Sum(bidet) as 'bidet_count' FROM (SELECT number, FK_Half_email_HouseHold_email, bidet FROM Half UNION ALL
SELECT number, FK_Full_email_HouseHold_email, bidet FROM Full) Bathrooms
GROUP BY FK_Half_email_HouseHold_email) bidet_cnt
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of bathtubs per household
SELECT MIN(bathtub_count) AS min_bathtub_perhousehold, AVG(bathtub_count) AS avg_bathtub_perhousehold, MAX(bathtub_count) AS max_bathtub_perhousehold FROM (SELECT FK_Full_email_HouseHold_email, Sum(bathtub) as 'bathtub_count' FROM (
SELECT number, FK_Full_email_HouseHold_email, bathtub FROM Full) Bathrooms
GROUP BY FK_Full_email_HouseHold_email) bathtub_cnt
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of showers per household
SELECT MIN(shower_count) AS min_shower_perhousehold, AVG(shower_count) AS avg_shower_perhousehold, MAX(shower_count) AS max_shower_perhousehold FROM (SELECT FK_Full_email_HouseHold_email, Sum(shower) as 'shower_count' FROM (
SELECT number, FK_Full_email_HouseHold_email, shower FROM Full) Bathrooms
GROUP BY FK_Full_email_HouseHold_email) shower_cnt
-- The minimum (as an integer), average (as a decimal number rounded up to the tenths decimal point), and maximum (as an integer) count of tub/showers per household
SELECT MIN(tub_shower_count) AS min_tub_shower_perhousehold, AVG(tub_shower_count) AS avg_tub_shower_perhousehold, MAX(tub_shower_count) AS max_tub_shower_perhousehold FROM (SELECT FK_Full_email_HouseHold_email, Sum(tub_shower) as 'tub_shower_count' FROM (
SELECT number, FK_Full_email_HouseHold_email, tub_shower FROM Full) Bathrooms
GROUP BY FK_Full_email_HouseHold_email) tub_shower_cnt
-- Which state has the most bidets (count of all bidets as an integer), and how many
-- Which postal code has the most bidets (count of all bidets as an integer), and how many
-- How many households (count as an integer), have only a single, primary bathroom, and no other bathrooms