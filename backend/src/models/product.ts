import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";

@Entity("tb_product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column("numeric", {
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  price!: number;

  @Column()
  amount!: number;

  @Column()
  description!: string;

  @Column()
  active!: boolean;

  @ManyToOne(() => Category, category => category.products, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "category_id" })
  category!: Category | null;
}