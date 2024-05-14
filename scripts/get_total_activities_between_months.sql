CREATE OR REPLACE FUNCTION get_total_activities_between_months (
    p_start_month NUMBER,
    p_end_month NUMBER,
    p_year NUMBER
) RETURN INTEGER AS
    total_activities INTEGER;
BEGIN
    -- Initialize total_activities count to 0
    total_activities := 0;

    -- Construct the start and end dates based on the provided month and year
    DECLARE
        start_date TIMESTAMP WITH TIME ZONE := TO_TIMESTAMP_TZ(TO_CHAR(p_year) || '-' || TO_CHAR(p_start_month, 'FM00') || '-01 00:00:00.000', 'YYYY-MM-DD HH24:MI:SS.FF3 TZR');
        end_date TIMESTAMP WITH TIME ZONE := LAST_DAY(TO_TIMESTAMP_TZ(TO_CHAR(p_year) || '-' || TO_CHAR(p_end_month, 'FM00') || '-01 00:00:00.000', 'YYYY-MM-DD HH24:MI:SS.FF3 TZR'));
    BEGIN
        -- Count the number of activities between the constructed start and end dates
        SELECT COUNT(*)
        INTO total_activities
        FROM ACTIVITIES
        WHERE SPORT_TYPE = 'Run'
            AND TRUNC(START_DATE_LOCAL, 'MI') BETWEEN TRUNC(start_date, 'MI') AND TRUNC(end_date, 'MI');

        RETURN total_activities;
    END;
END;

SET SERVEROUTPUT ON;
DECLARE
    total_activities INTEGER;
BEGIN
    -- Call the function with sample input values (start month, end month, year)
    total_activities := get_total_activities_between_months(5, 5, 2023); -- May 2023 to May 2023

    -- Output the result
    DBMS_OUTPUT.PUT_LINE('Total activities between May 2023 and May 2023: ' || total_activities);
END;
