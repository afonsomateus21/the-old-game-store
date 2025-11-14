import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Category } from "../models/category";

export const Database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "db_user",
  password: "admin",
  database: "the_old_game_store",
  entities: [
    User,
    Category,
  ],
})