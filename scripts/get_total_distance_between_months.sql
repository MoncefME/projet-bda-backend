

CREATE OR REPLACE FUNCTION get_total_distance_between_months (
    p_start_month NUMBER,
    p_end_month NUMBER,
    p_year NUMBER
) RETURN NUMBER AS
    total_distance_meters NUMBER := 0;
    total_distance_km NUMBER := 0;
BEGIN
    -- Calculate the total distance between the given start and end months of the year
    SELECT COALESCE(SUM(DISTANCE), 0) INTO total_distance_meters
    FROM ACTIVITIES
    WHERE SPORT_TYPE = 'Run'
        AND EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
        AND EXTRACT(MONTH FROM START_DATE_LOCAL) BETWEEN p_start_month AND p_end_month;

    -- Convert meters to kilometers
    total_distance_km := total_distance_meters / 1000;

    RETURN total_distance_km;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Handle case when there are no activities between the provided months
        RETURN 0;
END;







SET SERVEROUTPUT ON;
DECLARE
    total_distance_km NUMBER;
BEGIN
    total_distance_km := get_total_distance_between_months(1, 12, 2022);
    DBMS_OUTPUT.PUT_LINE('Total distance between Jan 2023 and Mar 2023: ' || total_distance_km || ' km');
END;