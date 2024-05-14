CREATE OR REPLACE FUNCTION get_total_duration_between_months (
    p_start_month NUMBER,
    p_end_month NUMBER,
    p_year NUMBER
) RETURN INTEGER AS
    total_duration NUMBER := 0;
BEGIN
    -- Initialize total_activities count to 0

    -- Construct the start and end dates based on the provided month and year
    DECLARE
        start_date TIMESTAMP WITH TIME ZONE := TO_TIMESTAMP_TZ(TO_CHAR(p_year) || '-' || TO_CHAR(p_start_month, 'FM00') || '-01 00:00:00.000', 'YYYY-MM-DD HH24:MI:SS.FF3 TZR');
        end_date TIMESTAMP WITH TIME ZONE := LAST_DAY(TO_TIMESTAMP_TZ(TO_CHAR(p_year) || '-' || TO_CHAR(p_end_month, 'FM00') || '-01 00:00:00.000', 'YYYY-MM-DD HH24:MI:SS.FF3 TZR'));
    BEGIN
        -- Count the number of activities between the constructed start and end dates
        SELECT SUM(MOVING_TIME) INTO total_duration
        FROM ACTIVITIES
        WHERE SPORT_TYPE = 'Run'
            AND TRUNC(START_DATE_LOCAL, 'MI') BETWEEN TRUNC(start_date, 'MI') AND TRUNC(end_date, 'MI');

        -- Convert duration from seconds to hours
    total_duration := total_duration / 3600; -- 3600 seconds in an hour

    RETURN total_duration;
    END;
END;


SET SERVEROUTPUT ON;
DECLARE
    total_duration NUMBER;
BEGIN
    total_duration := get_total_duration_between_months(1, 2, 2024);
    DBMS_OUTPUT.PUT_LINE('Total duration between Jan 2023 and Mar 2023: ' || total_duration || ' hr');
END;