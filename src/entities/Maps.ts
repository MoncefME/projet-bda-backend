import { Column, Entity, Index } from "typeorm";

@Index("PK_MAPS", ["id"], { unique: true })
@Entity("MAPS")
export class Maps {
  @Column("varchar2", {
    name: "SUMMARY_POLYLINE",
    nullable: true,
    length: 2048,
  })
  summaryPolyline!: string | null;

  @Column("varchar2", { name: "POLYLINE", nullable: true, length: 4000 })
  polyline!: string | null;

  @Column("number", { primary: true, name: "ID", precision: 38, scale: 0 })
  id!: number;
}
