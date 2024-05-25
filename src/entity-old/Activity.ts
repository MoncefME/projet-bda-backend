import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Activities {

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id!: number

    @Column({
        name: 'ATHLETE_ID'
    })
    athleteId!: number

    @Column({
        name: 'NAME'
    })
    name!: string

    @Column({
        name: 'DISTANCE'
    })
    distance!: number

    @Column({
        name: 'MOVING_TIME'
    })
    movingTime!: number

    @Column({
        name: 'ELAPSED_TIME'
    })
    elapsedTime!: number

    @Column({
        name: 'TOTAL_ELEVATION_GAIN'
    })
    TotalElevationGain!: number

    @Column({
        name: 'SPORT_TYPE'
    })
    sportType!: string

    @Column({
        name: 'START_DATE',
        type: 'timestamp with time zone'
    })
    startDate!: Date

    @Column({
        name: 'START_DATE_LOCAL',
        type: 'timestamp with time zone'
    })
    startDateLocal!: Date

    @Column({
        name: 'TIMEZONE'
    })
    timezone!: string

    @Column({
        name: 'UTC_OFFSET'
    })
    utcOffset!: number

    @Column({
        name: 'ACHIEVEMENT_COUNT'
    })
    achievementCount!: number

    @Column({
        name: 'KUDOS_COUNT'
    })
    kudosCount!: number

    @Column({
        name: 'COMMENT_COUNT'
    })
    commentCount!: number

    @Column({
        name: 'ATHLETE_COUNT'
    })
    athleteCount!: number

    @Column({
        name: 'TRAINER'
    })
    trainer!: string

    @Column({
        name: 'COMMUTE'
    })
    commute!: string

    @Column({
        name: 'MANUAL'
    })
    manual!: string

    @Column({
        name: 'PRIVATE'
    })
    private!: string

    @Column({
        name: 'VISIBILITY'
    })
    visibility!: string

    @Column({
        name: 'AVERAGE_SPEED'
    })
    averageSpeed!: number

    @Column({
        name: 'MAX_SPEED'
    })
    maxSpeed!: number

    @Column({
        name: 'AVERAGE_CADENCE'
    })
    averageCadence!: number

    @Column({
        name: 'AVERAGE_HEARTRATE'
    })
    averageHeartrate!: number

    @Column({
        name: 'MAX_HEARTRATE'
    })
    maxHeartrate!: number

    @Column({
        name: 'DISPLAY_HIDE_HEARTRATE_OPTION'
    })
    displayHideHeartrateOption!: string

    @Column({
        name: 'ELEV_HIGH'
    })
    elevHigh!: number

    @Column({
        name: 'ELEV_LOW'
    })
    elevLow!: number

    @Column({
        name: 'PR_COUNT'
    })
    prCount!: number

    @Column({
        name: 'TOTAL_PHOTO_COUNT'
    })
    totalPhotoCount!: number

    @Column({
        name: 'HAS_KUDOED'
    })
    hasKudoes!: string

    @Column({
        name: 'DESCRIPTION'
    })
    description!: string

    @Column({
        name: 'CALORIES'
    })
    calories!: number

    @Column({
        name: 'HAS_HEARTRATE'
    })
    hasHeartrate!: string

}
