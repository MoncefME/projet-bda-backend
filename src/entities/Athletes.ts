import { Column, Entity, Index } from "typeorm";

@Index("PK_ATHLTES", ["id"], { unique: true })
@Entity("ATHLETES")
export class Athletes {
  @Column("varchar2", { name: "USERNAME", length: 26 })
  username!: string;

  @Column("varchar2", { name: "LASTNAME", nullable: true, length: 26 })
  lastname!: string | null;

  @Column("number", { primary: true, name: "ID", precision: 38, scale: 0 })
  id!: number;

  @Column("varchar2", { name: "FIRSTNAME", nullable: true, length: 26 })
  firstname!: string | null;
}
