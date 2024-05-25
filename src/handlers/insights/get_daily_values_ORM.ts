import { AppDataSource } from "../../data-source";
import { Activities } from "../../entities/Activities";

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })



    interface DailyValue {
        date: string;
        count: number;
        level: number;
    }
    
    const getDailyValue = async (year: number): Promise<DailyValue[] | null> => {
        console.time("Execution Time");

        const acitivityRepo = AppDataSource.getRepository(Activities);
        const maxDistanceResult = await acitivityRepo.createQueryBuilder("activities")
            .select("MAX(activities.distance)", "max_distance")
            .getRawOne()

            if (!maxDistanceResult) {
                throw new Error("Failed to retrieve the maximum distance.");
            }

        const max_distance = maxDistanceResult.max_distance;
        const acitivities = await acitivityRepo.find();


        const startDate = new Date(year, 0, 1); 
        const endDate = new Date(year, 11, 31); 

        const dateArray: string[] = [];

        let currentDate = startDate;
        while (currentDate <= endDate) {
            dateArray.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const result = dateArray.map(date => {
            const dayActivities = acitivities.filter(activity => activity.startDateLocal?.toISOString().split('T')[0] === date);
            const totalDistance = dayActivities.reduce((sum, activity) => sum + (activity.distance ? activity.distance : 0), 0);
            const count = dayActivities.length;
    
            const level = Math.ceil((totalDistance * 4) / max_distance)
            return {
                date: date,
                level: level,
                count: count,
            };
        });
        console.timeEnd("Execution Time");
        return result
    };
    export { getDailyValue };
    
