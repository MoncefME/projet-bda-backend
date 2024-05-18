import { Column, Entity, Index } from "typeorm";

@Index("PK_LAPS_COMPOSE", ["id", "lapIndex"], { unique: true })
@Entity("LAPS")
export class Laps {
  @Column("number", {
    name: "TOTAL_ELEVATION_GAIN",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  totalElevationGain!: number | null;

  @Column("number", {
    name: "START_INDEX",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  startIndex!: number | null;

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

  @Column("number", { name: "SPLIT", nullable: true, precision: 38, scale: 0 })
  split!: number | null;

  @Column("number", {
    name: "PACE_ZONE",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  paceZone!: number | null;

  @Column("varchar2", { name: "NAME", nullable: true, length: 26 })
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

  @Column("number", {
    primary: true,
    name: "LAP_INDEX",
    precision: 38,
    scale: 0,
  })
  lapIndex!: number;

  @Column("number", { primary: true, name: "ID", precision: 38, scale: 0 })
  id!: number;

  @Column("number", {
    name: "END_INDEX",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  endIndex!: number | null;

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
    scale: 2,
  })
  distance!: number | null;

  @Column("number", {
    name: "AVERAGE_SPEED",
    nullable: true,
    precision: 38,
    scale: 2,
  })
  averageSpeed!: number | null;

  @Column("number", {
    name: "AVERAGE_HEARTRATE",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  averageHeartrate!: number | null;

  @Column("number", { name: "ATHLETE_ID", precision: 38, scale: 0 })
  athleteId!: number;

  @Column("number", { name: "ACTIVITY_ID", precision: 38, scale: 0 })
  activityId!: number;
}
