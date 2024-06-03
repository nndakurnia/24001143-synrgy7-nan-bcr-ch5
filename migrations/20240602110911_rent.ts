import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('rent', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable(); // unsigned: memastikan nilai tidak negatif
    table.integer('car_id').unsigned().notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.enum('status', ['pending', 'confirmed', 'finished', 'cancelled']).notNullable().defaultTo('pending');
    table.integer('rental_cost').unsigned().notNullable();
    table.boolean('payment_status').notNullable().defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();

    // gajadi, taruh di model
    // onDelete('CASCADE') memastikan bahwa jika mobil dihapus, semua penyewaan terkait juga dihapus
    // table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    // table.foreign('car_id').references('id').inTable('cars').onDelete('CASCADE');
  });
};


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('rent');
};
