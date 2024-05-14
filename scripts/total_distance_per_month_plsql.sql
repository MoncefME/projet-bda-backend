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