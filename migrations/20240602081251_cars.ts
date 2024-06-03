import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('plate', 20).notNullable();
    table.string('name', 50).notNullable();
    table.string('image').notNullable();
    table.integer('rent_cost').unsigned().notNullable(); // unsigned: memastikan nilai tidak negatif
    table.integer('capacity').unsigned().notNullable();
    table.text('description');
    table.string('transmission');
    table.string('type').notNullable();
    table.integer('year').unsigned();
    table.timestamp('available_at').notNullable().defaultTo(knex.fn.now());
    table.boolean('is_available').notNullable().defaultTo('true');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars');
};
