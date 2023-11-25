import { DATABASE_DB, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, HOST } from "./env";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { UsersEmployee } from "src/entity/users.entity";

export const typeormConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DB,
  entities: [UsersEmployee],
  synchronize: true,
  cache: false
}
