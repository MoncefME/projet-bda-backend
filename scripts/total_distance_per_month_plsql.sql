--PROCEDURE---

CREATE OR REPLACE PROCEDURE get_total_distance_per_month(
p_year IN NUMBER
)
IS
CURSOR c_activities IS
SELECT
EXTRACT(MONTH FROM START_DATE_LOCAL) AS month_num,
SUM(DISTANCE) AS sum_distance
FROM
BDA.ACTIVITIES
WHERE
EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
GROUP BY
EXTRACT(MONTH FROM START_DATE_LOCAL)
ORDER BY
month_num;
BEGIN
FOR rec IN c_activities LOOP
DBMS_OUTPUT.PUT_LINE('Month: ' || rec.month_num || ', Longest Distance: ' || rec.longest_distance);
END LOOP;
END;
SET SERVEROUTPUT ON;
BEGIN
get_total_distance_per_month(2022);
END;

--FUNCTION-- 

CREATE OR REPLACE FUNCTION get_monthly_distances(
    p_year IN NUMBER
)
RETURN SYS_REFCURSOR
IS
    c_activities SYS_REFCURSOR;
BEGIN
    OPEN c_activities FOR
        SELECT
            EXTRACT(MONTH FROM START_DATE_LOCAL) AS month_num,
            SUM(DISTANCE) AS sum_distance
        FROM
            BDA.ACTIVITIES
        WHERE
            EXTRACT(YEAR FROM START_DATE_LOCAL) = p_year
        GROUP BY
            EXTRACT(MONTH FROM START_DATE_LOCAL)
        ORDER BY
            month_num;

    RETURN c_activities;
END;