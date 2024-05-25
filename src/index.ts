import { AppDataSource } from "./data-source"
import { User } from "./entity-old/User"
// import { Activities } from "./entity-old/Activity"
import { Activities } from "./entities/Activities";

AppDataSource.initialize().then(async () => {
    console.time("Execution Time");


    const acitivityRepo = AppDataSource.getRepository(Activities);
    const maxDistanceResult = await acitivityRepo.createQueryBuilder("activities")
        .select("MAX(activities.distance)", "max_distance")
        .getRawOne()

        if (!maxDistanceResult) {
            throw new Error("Failed to retrieve the maximum distance.");
        }
        const max_distance = maxDistanceResult.max_distance;
        console.log(max_distance);

    const acitivities = await acitivityRepo.find();


    const startDate = new Date(2022, 0, 1); 
    const endDate = new Date(2022, 11, 31); 

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

        return {
            date: date,
            level: Math.ceil((totalDistance * 4)/max_distance ),
            count: count,
        };
    });
    console.log(result);

    console.timeEnd("Execution Time");

}).catch(error => console.log(error))
