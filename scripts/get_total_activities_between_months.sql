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
    
        -- Count the number of activities between the constructed start and end dates
        SELECT COUNT(*)
        INTO total_activities
        FROM ACTIVITIES
        WHERE SPORT_TYPE = 'Run'
            AND EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
           AND EXTRACT(MONTH FROM START_DATE_LOCAL) BETWEEN p_start_month AND p_end_month;

        RETURN total_activities;
    
END;

SET SERVEROUTPUT ON;
DECLARE
    total_activities INTEGER;
BEGIN
    -- Call the function with sample input values (start month, end month, year)
    total_activities := get_total_activities_between_months(1, 12, 2022); -- May 2023 to May 2023

    -- Output the result
    DBMS_OUTPUT.PUT_LINE('Total activities between May 2023 and May 2023: ' || total_activities);
END;
