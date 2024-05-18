CREATE SEQUENCE BDA.ACTIVITIES_SEQ
START WITH 1
INCREMENT BY 1
NOCACHE;


CREATE OR REPLACE PROCEDURE create_new_run (
    p_athlete_id            IN NUMBER,
    p_name                  IN VARCHAR2,
    p_distance              IN NUMBER,
    
    p_sport_type            IN VARCHAR2
    
) IS
BEGIN
    INSERT INTO BDA.ACTIVITIES (
        ID, ATHLETE_ID, NAME, DISTANCE,SPORT_TYPE
       
    ) VALUES (
        BDA.ACTIVITIES_SEQ.NEXTVAL, -- Assuming a sequence named ACTIVITIES_SEQ exists
        p_athlete_id, p_name, p_distance, p_sport_type
    );
    
    COMMIT;
END;

BEGIN
    create_new_run(
        p_athlete_id => 43957994,
        p_name => 'Morning Run',
        p_distance => 10.5,
       
        p_sport_type => 'Running'
        
        
    );
END;


