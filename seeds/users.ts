import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      name: 'admin',
      email: 'admin@admin.id',
      username: 'admin1',
      password: 'inipwadmin123',
      user_type: 'admin',
    },
    {
      name: 'nanda',
      email: 'nanda@gmail.com',
      username: 'hellonanda',
      password: 'hellonanda',
    },
    {
      name: 'kurnia',
      email: 'nanda2@gmail.com',
      username: 'galaxy',
      password: 'newsmartband',
    },
  ]);
};
