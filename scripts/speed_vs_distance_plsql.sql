CREATE OR REPLACE FUNCTION get_speed_vs_distance(
    activity_id NUMBER,
    p_start_month NUMBER,
    p_end_month NUMBER,
    p_year NUMBER
)
RETURN SYS_REFCURSOR
IS
    cur SYS_REFCURSOR;
BEGIN
    OPEN cur FOR
        SELECT s.distance, AVG(s.average_speed) AS average_speed
        FROM "BDA"."SPLITS" s
        JOIN "BDA"."ACTIVITIES" a ON s.activity_id = a.id
        WHERE a.id = activity_id
            AND ((p_start_month = 0 AND p_end_month = 0 AND p_year = 0) -- No date filter
                OR (EXTRACT(YEAR FROM a.start_date_local) = p_year
                    AND EXTRACT(MONTH FROM a.start_date_local) BETWEEN p_start_month AND p_end_month))
        GROUP BY s.distance
        ORDER BY s.distance;

    RETURN cur;
END;




SET SERVEROUTPUT ON;

DECLARE
    -- Declare variables to hold the cursor and result
    v_cursor SYS_REFCURSOR;
    v_distance NUMBER;
    v_average_speed NUMBER;
BEGIN
    -- Call the function with appropriate parameters
    v_cursor := get_speed_vs_distance(
        activity_id => 10029603549,
        p_start_month => 1,
        p_end_month => 12,
        p_year => 2013
    );
    
    -- Fetch and print the result
    LOOP
        FETCH v_cursor INTO v_distance, v_average_speed;
        EXIT WHEN v_cursor%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('Distance: ' || v_distance || ', Average Speed: ' || v_average_speed);
    END LOOP;
    
    -- Close the cursor
    CLOSE v_cursor;
END;

VARIABLE result REFCURSOR;
EXEC :result := get_speed_vs_distance(1234, 3, 5, 2023); 
PRINT result;


SET SERVEROUTPUT ON;
DECLARE
  activity_id NUMBER := 1234; -- Replace with a valid activity_id
  start_month NUMBER := 3;
  end_month NUMBER := 5;
  year_val NUMBER := 2023;
  result_cursor SYS_REFCURSOR;
  distance NUMBER;
  avg_speed NUMBER;
BEGIN
  -- Call the function
  result_cursor := get_speed_vs_distance(activity_id, start_month, end_month, year_val);

  -- Loop through the result set
  LOOP
    FETCH result_cursor INTO distance, avg_speed;
    EXIT WHEN result_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE('Distance: ' || distance || ', Average Speed: ' || avg_speed);
  END LOOP;

  -- Close the cursor
  CLOSE result_cursor;
END;