import { Column, Entity, Index } from "typeorm";

@Index("PK_SPLITS_COMPOS", ["activityId", "split"], { unique: true })
@Entity("SPLITS")
export class Splits {
  @Column("number", { primary: true, name: "SPLIT", precision: 38, scale: 0 })
  split!: number;

  @Column("number", {
    name: "PACE_ZONE",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  paceZone!: number | null;

  @Column("number", {
    name: "MOVING_TIME",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  movingTime!: number | null;

  @Column("number", {
    name: "ELEVATION_DIFFERENCE",
    nullable: true,
    precision: 38,
    scale: 1,
  })
  elevationDifference!: number | null;

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
    scale: 12,
  })
  averageHeartrate!: number | null;

  @Column("number", {
    name: "AVERAGE_GRADE_ADJUSTED_SPEED",
    nullable: true,
    precision: 38,
    scale: 2,
  })
  averageGradeAdjustedSpeed!: number | null;

  @Column("number", {
    primary: true,
    name: "ACTIVITY_ID",
    precision: 38,
    scale: 0,
  })
  activityId!: number;
}
