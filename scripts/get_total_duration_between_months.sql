CREATE OR REPLACE FUNCTION get_total_duration_between_months (
    p_start_month NUMBER,
    p_end_month NUMBER,
    p_year NUMBER
) RETURN INTEGER AS
    total_duration NUMBER := 0;
BEGIN
    
        -- Count the number of activities between the constructed start and end dates
        SELECT SUM(MOVING_TIME) INTO total_duration
        FROM ACTIVITIES
        WHERE SPORT_TYPE = 'Run'
            AND ((p_start_month = 0 AND p_end_month = 0 AND p_year = 0) -- No date filter
            OR (EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
                AND EXTRACT(MONTH FROM START_DATE_LOCAL) BETWEEN p_start_month AND p_end_month));

        -- Convert duration from seconds to hours
    total_duration := total_duration / 3600; -- 3600 seconds in an hour

    RETURN total_duration;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Handle case when there are no activities between the provided months
        RETURN 0;

END;


SET SERVEROUTPUT ON;
DECLARE
    total_duration NUMBER;
BEGIN
    total_duration := get_total_duration_between_months(0, 0, 0);
    DBMS_OUTPUT.PUT_LINE('Total duration between Jan 2023 and Mar 2023: ' || total_duration || ' hr');
END;