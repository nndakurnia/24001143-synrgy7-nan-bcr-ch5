import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: process.env.USER_POSTGRE as string,
      password: process.env.PASSWORD as string,
      port: Number(process.env.PORT_POSTGRE),
      host: process.env.HOST as string,
      database: process.env.DATABASE_NAME as string,
    }
  }
};

export default config;
