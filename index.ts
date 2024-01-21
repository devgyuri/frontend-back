import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "gyuri",
  password: "memo2231",
  database: "nodedb",
  entities: [Board],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("DB접속에 성공했습니다.");
  })
  .catch((error) => {
    console.log("DB접속에 실패했습니다.");
    console.log(error);
  });
