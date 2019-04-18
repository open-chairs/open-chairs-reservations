/* use this to set up your postgresql DB


*/

/* your table name copy pasted into postgres after I createdb and use db */
CREATE TABLE reservations (
    id int,
    rest_id int,
    date varchar(12),
    time varchar(12)


);

/* import your CSV file to postgresql, copy and paste below command while using postgres */

COPY reservations(id,rest_id,date,time)
FROM '/Users/jasonasavadejkajorn/Documents/SEI/open-chairs-reservations/testData.csv' DELIMITER ',' CSV HEADER;

/* check your data */

SELECT * FROM reservations



