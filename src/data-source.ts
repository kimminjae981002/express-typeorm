import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

// 데이터베이스 연결해주는 파일
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
