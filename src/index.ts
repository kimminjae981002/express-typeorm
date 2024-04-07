import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = express();

const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("running");
});

AppDataSource.initialize()
  .then(() => {
    console.log("성공");
  })
  .catch((err) => {
    console.error(err);
  });
// database 연결

app.post("/users", async (req, res) => {
  const user = await AppDataSource.getRepository(User).create(req.body);
  // database에서 User 엔티티에 req.body내용을 생성하겠다.
  const results = await AppDataSource.getRepository(User).save(user);
  // database에서 User 엔티티에 user 내용을 저장하겠다.

  return res.send(results);
});

app.get("/users", async (req, res) => {
  const user = await AppDataSource.getRepository(User).find();

  return res.send(user);
});

app.get("/users/:id", async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });

  return res.send(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });

  AppDataSource.getRepository(User).merge(user, req.body);
  // 새로운 내용으로 merge를 해준다.
  await AppDataSource.getRepository(User).save(user);
  // 새로운 내용을 저장해준다.

  return res.send(user);
});

app.delete("/users/:id", async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });

  await AppDataSource.getRepository(User).delete(user);
  // 삭제.

  return res.send("삭제 성공");
});

app.listen(port, () => {
  console.log("open server");
});
