import express, { Express } from "express";
import knex from "knex";
import { Model } from "objection";
import router from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const knexInstance = knex({
  client: "pg",
  connection: {
    user: process.env.USER_POSTGRE as string,
    password: process.env.PASSWORD as string,
    port: Number(process.env.PORT_POSTGRE),
    host: process.env.HOST as string,
    database: process.env.DATABASE_NAME as string,
  }
});

Model.knex(knexInstance);

app.use("/api", router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
