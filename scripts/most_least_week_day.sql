--gotta creat this type firt
CREATE OR REPLACE TYPE activity_result AS OBJECT (
    max_activities_day VARCHAR2(20),
    max_activities_count NUMBER,
    min_activities_day VARCHAR2(20),
    min_activities_count NUMBER
);
---------------the function ----------------

CREATE OR REPLACE FUNCTION find_activities(start_date_param DATE, end_date_param DATE) RETURN activity_result AS
    max_activities_day VARCHAR2(20);
    max_activities_count NUMBER;
    min_activities_day VARCHAR2(20);
    min_activities_count NUMBER;
    result activity_result;
BEGIN
    SELECT day_of_week, activity_count
    INTO max_activities_day, max_activities_count
    FROM (
        SELECT TO_CHAR(start_date AT TIME ZONE 'UTC', 'DAY') AS day_of_week, COUNT(*) AS activity_count
        FROM activities
        WHERE start_date >= start_date_param AND start_date <= end_date_param
        GROUP BY TO_CHAR(start_date AT TIME ZONE 'UTC', 'DAY')
        ORDER BY activity_count DESC
    )
    WHERE ROWNUM = 1;

    SELECT day_of_week, activity_count
    INTO min_activities_day, min_activities_count
    FROM (
        SELECT TO_CHAR(start_date AT TIME ZONE 'UTC', 'DAY') AS day_of_week, COUNT(*) AS activity_count
        FROM activities
        WHERE start_date >= start_date_param AND start_date <= end_date_param
        GROUP BY TO_CHAR(start_date AT TIME ZONE 'UTC', 'DAY')
        ORDER BY activity_count ASC
    )
    WHERE ROWNUM = 1;

    -- Assign values to the result object
    result := activity_result(max_activities_day, max_activities_count, min_activities_day, min_activities_count);

    RETURN result; -- Return the result object
END;



-----------------calling the function ----------------
DECLARE
    start_date_param DATE := TO_DATE('2023-01-01', 'YYYY-MM-DD');
    end_date_param DATE := TO_DATE('2023-12-31', 'YYYY-MM-DD');
    result_activity activity_result;
BEGIN
    result_activity := find_activities(start_date_param, end_date_param);
    
    DBMS_OUTPUT.PUT_LINE('Day with most activities: ' || result_activity.max_activities_day || ', Activities Count: ' || result_activity.max_activities_count);
    DBMS_OUTPUT.PUT_LINE('Day with least activities: ' || result_activity.min_activities_day || ', Activities Count: ' || result_activity.min_activities_count);
END;
/