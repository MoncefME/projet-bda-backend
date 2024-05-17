CREATE OR REPLACE FUNCTION get_year_days(
    p_year IN NUMBER
) RETURN SYS_REFCURSOR AS
    cur SYS_REFCURSOR;
    start_date DATE;
    end_date DATE;
BEGIN
    start_date := TO_DATE(p_year || '-01-01', 'YYYY-MM-DD');
    end_date := TO_DATE(p_year || '-12-31', 'YYYY-MM-DD');

    OPEN cur FOR 
    SELECT
        TO_CHAR(day_date, 'YYYY-MON-DD') AS day_date,
        TO_CHAR(day_date, 'Day') AS day_name
    FROM
    (
        SELECT
            start_date + (LEVEL - 1) AS day_date
        FROM
            dual
        CONNECT BY
            start_date + (LEVEL - 1) <= end_date
    );

    RETURN cur;  
END;


--function call
set SERVEROUTPUT on;
set echo on;


DECLARE
    cur SYS_REFCURSOR;
    day_date varchar(11);
    day_name VARCHAR2(20);
BEGIN
    cur := get_year_days(2020);
    LOOP
        FETCH cur INTO day_date, day_name;
        EXIT WHEN cur%NOTFOUND;

        DBMS_OUTPUT.PUT_LINE('Date: ' || day_date || ' Day: ' || day_name);
    END LOOP;
    CLOSE cur;
END;







 