import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('rent').del();

  // Inserts seed entries
  await knex('rent').insert([
    {
      user_id: 2,
      car_id: 7,
      start_date: new Date('2024-06-02'),
      end_date: new Date('2024-06-03'),
      status: 'confirmed',
      rental_cost: 900000,
      payment_status: true,
    },
    {
      user_id: 2,
      car_id: 5,
      start_date: new Date('2024-06-02'),
      end_date: new Date('2024-06-04'),
      status: 'cancelled',
      rental_cost: 400000,
      payment_status: true,
    },
    {
      user_id: 3,
      car_id: 6,
      start_date: new Date('2024-06-06'),
      end_date: new Date('2024-06-08'),
      status: 'pending',
      rental_cost: 1800000,
      payment_status: false,
    }
  ]);
};
