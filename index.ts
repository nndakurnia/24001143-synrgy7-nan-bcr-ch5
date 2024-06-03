import express, { Express, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import { CarModel } from "./models/car.model";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const knexInstance = knex({
  client: "pg",
  connection: {
    user: process.env.USER_POSTGRE,
    password: process.env.PASSWORD,
    port: Number(process.env.PORT_POSTGRE),
    host: "127.0.0.1",
    database: process.env.DATABASE_NAME
  }
});

Model.knex(knexInstance);

app.get("/", (_, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/cars", async (_, res: Response) => {
  // menampilkan kolom title dan body saja
  // const articles = await ArticlesModel.query().select('title', 'body');
  const cars = await CarModel.query()

  res.json({ data: cars });
});

// app.get("/comments", async (_, res: Response) => {
//   const comments = await CommentsModel.query().withGraphFetched('articles');

//   res.json({ data: comments });
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
