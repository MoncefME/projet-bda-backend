CREATE OR REPLACE FUNCTION get_daily_distnace(
    p_year IN NUMBER
) RETURN SYS_REFCURSOR AS
    cur SYS_REFCURSOR;
    start_date DATE;
    end_date DATE;
    v_max_distance NUMBER;
    
BEGIN
    start_date := TO_DATE(p_year || '-JAN-01', 'YYYY-MON-DD');
    end_date := TO_DATE(p_year || '-DEC-31', 'YYYY-MON-DD');
    DBMS_OUTPUT.PUT_LINE('Date Start: ' || start_date);
    DBMS_OUTPUT.PUT_LINE('Date End : ' || end_date);
    
    SELECT MAX(distance) INTO v_max_distance
    FROM activities;
    DBMS_OUTPUT.PUT_LINE('The maximum distance is: ' || v_max_distance);

    OPEN cur FOR
    select 
        day_date, 
        day_name, 
        NVL(distance, 0) AS distance,
        NVL(distance, 0) * 5 / MAX(distance) OVER () AS calculated_distance
    from
        (
        SELECT
            TO_CHAR(day_date, 'YYYY-MON-DD') AS day_date,
            TO_CHAR(day_date, 'Day') AS day_name
        FROM
            (
                SELECT
                    start_date + (LEVEL - 1) AS day_date
            
                FROM
                    dual d
                CONNECT BY
                    start_date + (LEVEL - 1) <= end_date
            )
        ) days
    LEFT join 
        activities acts 
    on days.day_date = TO_CHAR(acts.START_DATE_LOCAL, 'YYYY-MON-DD')

    order by TO_DATE(DAY_DATE,'YYYY-MON-DD');
    return cur;
END;


--function call
set SERVEROUTPUT on;
set echo on;

DECLARE
    cur SYS_REFCURSOR;
    day_date varchar(11);
    day_name VARCHAR(20);
    distance NUMBER(38,1);
    calculated_distance NUMBER(38,1);
BEGIN
    cur := get_daily_distnace(2021);  
    LOOP
        FETCH cur INTO day_date, day_name, distance, calculated_distance;
        EXIT WHEN cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Date: ' || day_date || ' Day: ' || day_name || ' Distance: ' || distance || ' Value: '||calculated_distance);
    END LOOP;
    CLOSE cur;
END;

