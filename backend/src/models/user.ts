import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  is_admin!: boolean;

  @Column()
  cpf_cnpj!: string;
}