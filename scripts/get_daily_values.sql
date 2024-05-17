CREATE OR REPLACE FUNCTION get_daily_distnace(
    p_year IN NUMBER
) RETURN SYS_REFCURSOR AS
    cur SYS_REFCURSOR;
    start_date DATE;
    end_date DATE;
    start_year number;
    end_year number;
    v_max_distance NUMBER;
    
BEGIN
    if( p_year = 0 ) then
        SELECT EXTRACT(YEAR FROM min(start_date_local) ) into start_year 
        FROM activities;
        SELECT EXTRACT(YEAR FROM max(start_date_local) ) into end_year 
        FROM activities;
        start_date := TO_DATE(start_year || '-JAN-01', 'YYYY-MON-DD');
        end_date := TO_DATE(end_year || '-DEC-31', 'YYYY-MON-DD'); 
    else 
        start_date := TO_DATE(p_year || '-JAN-01', 'YYYY-MON-DD');
        end_date := TO_DATE(p_year || '-DEC-31', 'YYYY-MON-DD'); 
    end if;
    
    SELECT MAX(distance) INTO v_max_distance
    FROM activities;


    OPEN cur FOR
    select 
        day_date, 
        day_name, 
        NVL(distance, 0) AS distance,
        NVL(distance, 0) * 4 / MAX(v_max_distance) OVER () AS calculated_distance
    from
        (
        SELECT
            TO_CHAR(day_date, 'YYYY-MM-DD') AS day_date,
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
    on days.day_date = TO_CHAR(acts.START_DATE_LOCAL, 'YYYY-MM-DD')

    order by TO_DATE(DAY_DATE,'YYYY-MM-DD');
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
    cur := get_daily_distnace(0);  
    LOOP
        FETCH cur INTO day_date, day_name, distance, calculated_distance;
        EXIT WHEN cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Date: ' || day_date || ' Day: ' || day_name || ' Distance: ' || distance || ' Value: '||calculated_distance);
    END LOOP;
    CLOSE cur;
END;

