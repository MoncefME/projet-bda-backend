CREATE OR REPLACE FUNCTION get_year_weeks(
    p_year IN NUMBER
) RETURN SYS_REFCURSOR AS
    cur SYS_REFCURSOR;
    start_date varchar(11);
    end_date varchar(11);
    week_start DATE;
    week_end DATE;
BEGIN
    start_date := p_year || '-JAN-01';
    end_date := p_year || '-DEC-31';
    dbms_output.put_line(start_date);
    dbms_output.put_line(end_date);
    OPEN cur FOR 
    SELECT
        week_start AS week_start,
        TO_CHAR(week_start,'Day') AS start_day,
        week_end -1 AS week_end,
        TO_CHAR(week_end -1 , 'Day') AS end_day
    FROM
    (
        SELECT
            TRUNC(TO_DATE(start_date, 'YYYY-MON-DD') + (LEVEL - 1) * 7, 'D') AS week_start,
            TRUNC(TO_DATE(start_date, 'YYYY-MON-DD') + LEVEL  * 7 - 1, 'D') AS week_end
        FROM
            dual
        CONNECT BY
            TRUNC(TO_DATE(start_date, 'YYYY-MON-DD') + (LEVEL - 1) * 7, 'IW') <= TO_DATE(end_date, 'YYYY-MON-DD')
    );
    RETURN cur;  
END;

--function call
set SERVEROUTPUT on;
set echo on;

DECLARE
    cur SYS_REFCURSOR;
    week_start DATE;
    week_end DATE;
    start_day varchar(20);
    end_day varchar(20);
BEGIN
    cur := get_year_weeks(2021);
    LOOP
        FETCH cur INTO week_start,start_day, week_end, end_day;
        DBMS_OUTPUT.PUT_LINE('Week Start: ' ||start_day|| week_start || ' Week End: '||end_day|| week_end);
        EXIT WHEN cur%NOTFOUND;

--        DBMS_OUTPUT.PUT_LINE('Week Start: ' || week_start_result || ' Week End: '|| week_end_result);
    END LOOP;
    CLOSE cur;
END;

