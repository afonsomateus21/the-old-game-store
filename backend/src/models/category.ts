import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity("tb_category")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  slug!: string;

  @Column()
  active!: boolean;

  @OneToMany(() => Product, product => product.category)
  products!: Product[];
}