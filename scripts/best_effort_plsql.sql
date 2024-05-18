CREATE OR REPLACE FUNCTION get_best_effort_1km(
    athlete_id NUMBER,
    p_start_month NUMBER,
    p_end_month NUMBER,
    p_year NUMBER
) RETURN NUMBER IS
    best_effort NUMBER;
BEGIN
best_effort :=0;
    SELECT ELAPSED_TIME INTO best_effort
    FROM BESTEFFORTS
    WHERE ATHLETE_ID = athlete_id AND NAME = '1K'
        AND ((p_start_month = 0 AND p_end_month = 0 AND p_year = 0) -- No date filter
            OR (EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
                AND EXTRACT(MONTH FROM START_DATE_LOCAL) BETWEEN p_start_month AND p_end_month))
    ORDER BY ELAPSED_TIME
    FETCH FIRST 1 ROW ONLY;

    RETURN best_effort;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Handle case when there are no activities between the provided months
        RETURN 0;
END;



CREATE OR REPLACE FUNCTION get_best_effort_5km(
athlete_id NUMBER,
p_start_month NUMBER,
p_end_month NUMBER,
p_year NUMBER
) RETURN NUMBER IS
  best_effort NUMBER;
BEGIN
best_effort :=0;
  SELECT ELAPSED_TIME INTO best_effort
  FROM BESTEFFORTS
  WHERE ATHLETE_ID = athlete_id AND NAME = '5K'
  AND ((p_start_month = 0 AND p_end_month = 0 AND p_year = 0) -- No date filter
            OR (EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
                AND EXTRACT(MONTH FROM START_DATE_LOCAL) BETWEEN p_start_month AND p_end_month))
  ORDER BY ELAPSED_TIME
  FETCH FIRST 1 ROW ONLY;
  
  RETURN best_effort;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Handle case when there are no activities between the provided months
        RETURN 0;
END;




CREATE OR REPLACE FUNCTION get_best_effort_10km(
athlete_id NUMBER,
p_start_month NUMBER,
p_end_month NUMBER,
p_year NUMBER
) RETURN NUMBER IS
  best_effort NUMBER;
BEGIN
best_effort :=0;
  SELECT ELAPSED_TIME INTO best_effort
  FROM BESTEFFORTS
  WHERE ATHLETE_ID = athlete_id AND NAME = '10K'
  AND ((p_start_month = 0 AND p_end_month = 0 AND p_year = 0) -- No date filter
            OR (EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
                AND EXTRACT(MONTH FROM START_DATE_LOCAL) BETWEEN p_start_month AND p_end_month))
  ORDER BY ELAPSED_TIME
  FETCH FIRST 1 ROW ONLY;
  
  RETURN best_effort;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Handle case when there are no activities between the provided months
        RETURN 0;
END;


CREATE OR REPLACE FUNCTION get_best_effort_half_marathon(
athlete_id NUMBER,
p_start_month NUMBER,
p_end_month NUMBER,
p_year NUMBER
) RETURN NUMBER IS
  best_effort NUMBER;
BEGIN
best_effort :=0;
  SELECT ELAPSED_TIME INTO best_effort
  FROM BESTEFFORTS
  WHERE ATHLETE_ID = athlete_id AND NAME = 'Half-Marathon'
  AND ((p_start_month = 0 AND p_end_month = 0 AND p_year = 0) -- No date filter
            OR (EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
                AND EXTRACT(MONTH FROM START_DATE_LOCAL) BETWEEN p_start_month AND p_end_month))
  ORDER BY ELAPSED_TIME
  FETCH FIRST 1 ROW ONLY;
  
  RETURN best_effort;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Handle case when there are no activities between the provided months
        RETURN 0;
END;




-- Calling the function to get the best effort for 1km
SET SERVEROUTPUT ON;
DECLARE
  best_effort_1km NUMBER;
BEGIN
  best_effort_1km := get_best_effort_1km(43957994,1,3,2019); 
  DBMS_OUTPUT.PUT_LINE('Best effort for 1km: ' || best_effort_1km || ' seconds');
END;


-- Calling the function to get the best effort for 5km
DECLARE
  best_effort_5km NUMBER;
BEGIN
  best_effort_5km := get_best_effort_5km(43957994,1,3,2019); 
  DBMS_OUTPUT.PUT_LINE('Best effort for 5km: ' || best_effort_5km || ' seconds');
END;


-- Calling the function to get the best effort for 10km
DECLARE
  best_effort_10km NUMBER;
BEGIN
  best_effort_10km := get_best_effort_10km(43957994,1,3,2019); 
  DBMS_OUTPUT.PUT_LINE('Best effort for 10km: ' || best_effort_10km || ' seconds');
END;


-- Calling the function to get the best effort for Half Marathon (HM)
DECLARE
  best_effort_half_marathon NUMBER;
BEGIN
  best_effort_half_marathon := get_best_effort_half_marathon(43957994,1,3,2019); 
  DBMS_OUTPUT.PUT_LINE('Best effort for Half Marathon: ' || best_effort_half_marathon || ' seconds');
END;
