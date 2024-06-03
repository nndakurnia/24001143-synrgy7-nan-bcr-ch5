import type { Knex } from "knex";
const dotenv = require("dotenv");
dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: process.env.USER_POSTGRE,
      password: process.env.PASSWORD,
      port: Number(process.env.PORT_POSTGRE),
      host: "127.0.0.1",
      database: process.env.DATABASE_NAME
    }
  }
};

module.exports = config;
