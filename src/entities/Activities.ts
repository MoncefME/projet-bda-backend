import { Column, Entity, Index } from "typeorm";

@Index("PK_ACTIVITIES", ["id"], { unique: true })
@Entity("ACTIVITIESTen")
export class Activities {
  @Column("varchar2", { name: "VISIBILITY", nullable: true, length: 26 })
  visibility!: string | null;

  @Column("number", {
    name: "UTC_OFFSET",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  utcOffset!: number | null;

  @Column("varchar2", { name: "TRAINER", nullable: true, length: 26 })
  trainer!: string | null;

  @Column("number", {
    name: "TOTAL_PHOTO_COUNT",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  totalPhotoCount!: number | null;

  @Column("number", {
    name: "TOTAL_ELEVATION_GAIN",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  totalElevationGain!: number | null;

  @Column("varchar2", { name: "TIMEZONE", nullable: true, length: 128 })
  timezone!: string | null;

  @Column("timestamp with time zone", {
    name: "START_DATE_LOCAL",
    nullable: true,
    scale: 6,
  })
  startDateLocal!: Date | null;

  @Column("timestamp with time zone", {
    name: "START_DATE",
    nullable: true,
    scale: 6,
  })
  startDate!: Date | null;

  @Column("varchar2", { name: "SPORT_TYPE", nullable: true, length: 26 })
  sportType!: string | null;

  @Column("number", {
    name: "PR_COUNT",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  prCount!: number | null;

  @Column("varchar2", { name: "PRIVATE", nullable: true, length: 26 })
  private!: string | null;

  @Column("varchar2", { name: "NAME", nullable: true, length: 128 })
  name!: string | null;

  @Column("number", {
    name: "MOVING_TIME",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  movingTime!: number | null;

  @Column("number", {
    name: "MAX_SPEED",
    nullable: true,
    precision: 38,
    scale: 3,
  })
  maxSpeed!: number | null;

  @Column("number", {
    name: "MAX_HEARTRATE",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  maxHeartrate!: number | null;

  @Column("varchar2", { name: "MANUAL", nullable: true, length: 26 })
  manual!: string | null;

  @Column("number", {
    name: "KUDOS_COUNT",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  kudosCount!: number | null;

  @Column("number", { primary: true, name: "ID", precision: 38, scale: 0 })
  id!: number;

  @Column("varchar2", { name: "HAS_KUDOED", nullable: true, length: 26 })
  hasKudoed!: string | null;

  @Column("varchar2", { name: "HAS_HEARTRATE", nullable: true, length: 26 })
  hasHeartrate!: string | null;

  @Column("number", {
    name: "ELEV_LOW",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  elevLow!: number | null;

  @Column("number", {
    name: "ELEV_HIGH",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  elevHigh!: number | null;

  @Column("number", {
    name: "ELAPSED_TIME",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  elapsedTime!: number | null;

  @Column("number", {
    name: "DISTANCE",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  distance!: number | null;

  @Column("varchar2", {
    name: "DISPLAY_HIDE_HEARTRATE_OPTION",
    nullable: true,
    length: 26,
  })
  displayHideHeartrateOption!: string | null;

  @Column("varchar2", { name: "DESCRIPTION", nullable: true, length: 1024 })
  description!: string | null;

  @Column("varchar2", { name: "COMMUTE", nullable: true, length: 26 })
  commute!: string | null;

  @Column("number", {
    name: "COMMENT_COUNT",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  commentCount!: number | null;

  @Column("number", {
    name: "CALORIES",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  calories!: number | null;

  @Column("number", {
    name: "AVERAGE_SPEED",
    nullable: true,
    precision: 38,
    scale: 3,
  })
  averageSpeed!: number | null;

  @Column("number", {
    name: "AVERAGE_HEARTRATE",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  averageHeartrate!: number | null;

  @Column("number", {
    name: "AVERAGE_CADENCE",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  averageCadence!: number | null;

  @Column("number", { name: "ATHLETE_ID", precision: 38, scale: 0 })
  athleteId!: number;

  @Column("number", {
    name: "ATHLETE_COUNT",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  athleteCount!: number | null;

  @Column("number", {
    name: "ACHIEVEMENT_COUNT",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  achievementCount!: number | null;
}
