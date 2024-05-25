import { Column, Entity, Index } from "typeorm";

@Index("PK_BESTEFFORTS", ["id"], { unique: true })
@Entity("BESTEFFORTS")
export class Bestefforts {
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

  @Column("varchar2", { name: "PR_RANK", nullable: true, length: 26 })
  prRank!: string | null;

  @Column("varchar2", { name: "NAME", nullable: true, length: 26 })
  name!: string | null;

  @Column("number", {
    name: "MOVING_TIME",
    nullable: true,
    precision: 38,
    scale: 0,
  })
  movingTime!: number | null;

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
    scale: 0,
  })
  distance!: number | null;

  @Column("number", { name: "ATHLETE_ID", precision: 38, scale: 0 })
  athleteId!: number;

  @Column("number", { name: "ACTIVITY_ID", precision: 38, scale: 0 })
  activityId!: number;
}
